#!/usr/bin/env bash
set -euo pipefail

ROOT="$(pwd)"
TMP="$(mktemp -d)"
ASSEMBLED="$TMP/assembled"
MAIN_WORKTREE="$TMP/main"
trap 'git worktree remove --force "$MAIN_WORKTREE" >/dev/null 2>&1 || true; rm -rf "$TMP"' EXIT

mkdir -p "$ASSEMBLED"

git clone --depth 1 https://github.com/pbakaus/impeccable.git "$TMP/core"
git clone --depth 1 https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git "$TMP/uiux"

if [[ ! -d "$TMP/core/skill" ]]; then
  echo "Expected upstream skill directory was not found." >&2
  exit 1
fi

cp -a "$TMP/core/skill/." "$ASSEMBLED/"

ASSEMBLED="$ASSEMBLED" python3 - <<'PY'
import os
from pathlib import Path
root = Path(os.environ['ASSEMBLED'])
replacements = [
    ('IMPECCABLE', 'ASTERFRAME'),
    ('Impeccable', 'Asterframe'),
    ('impeccable', 'asterframe'),
]
for path in root.rglob('*'):
    if not path.is_file() or '.git' in path.parts:
        continue
    try:
        text = path.read_text(encoding='utf-8')
    except (UnicodeDecodeError, OSError):
        continue
    updated = text
    for old, new in replacements:
        updated = updated.replace(old, new)
    if updated != text:
        path.write_text(updated, encoding='utf-8')
PY

UIUX_DIR=""
while IFS= read -r candidate; do
  if [[ -d "$candidate/data" && -d "$candidate/scripts" ]]; then
    UIUX_DIR="$candidate"
    break
  fi
done < <(find "$TMP/uiux" -type d -name ui-ux-pro-max -print)

if [[ -z "$UIUX_DIR" ]]; then
  echo "Unable to locate the UI/UX data and scripts." >&2
  exit 1
fi

mkdir -p "$ASSEMBLED/tools/uiux"
cp -a "$UIUX_DIR/data" "$ASSEMBLED/tools/uiux/"
cp -a "$UIUX_DIR/scripts" "$ASSEMBLED/tools/uiux/"

# Reconstruct the historical overlay. Two base64 characters were lost at the
# boundary before the final chunk, so recover them by XZ checksum and tar
# structure rather than accepting an unverified archive.
TMP="$TMP" python3 - <<'PY'
import base64
import io
import itertools
import lzma
import os
import re
import tarfile
from pathlib import Path

root = Path('.bootstrap')
out = Path(os.environ['TMP'])
parts = sorted(root.glob('overlay.part-*'))
if not parts:
    raise SystemExit('No overlay chunks were found.')

texts = [re.sub(rb'\s+', b'', path.read_bytes()) for path in parts]
alphabet = b'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
joined = b''.join(texts)


def valid_tar_xz(encoded: bytes):
    try:
        raw = base64.b64decode(encoded, validate=True)
        payload = lzma.decompress(raw)
        with tarfile.open(fileobj=io.BytesIO(payload), mode='r:') as archive:
            names = [name.lstrip('./') for name in archive.getnames()]
        required = (
            'SKILL.md' in names
            and any(name.startswith('reference/') for name in names)
            and any(name.startswith('scripts/') for name in names)
        )
        return raw if required else None
    except (ValueError, lzma.LZMAError, tarfile.TarError):
        return None

# First accept an intact stream if possible.
padded = joined + b'=' * ((-len(joined)) % 4)
raw = valid_tar_xz(padded)
if raw is not None:
    (out / 'overlay-recovered.tar.xz').write_bytes(raw)
    print('Overlay was intact after padding normalization.')
    raise SystemExit(0)

# Diagnostics identify the damaged boundary as the join before the final part.
prefix = b''.join(texts[:-1])
suffix = texts[-1]
for left, right in itertools.product(alphabet, repeat=2):
    candidate = prefix + bytes((left, right)) + suffix
    raw = valid_tar_xz(candidate)
    if raw is not None:
        (out / 'overlay-recovered.tar.xz').write_bytes(raw)
        print(f'Recovered missing base64 characters: {chr(left)}{chr(right)}')
        raise SystemExit(0)

raise SystemExit('Unable to recover the archived Asterframe overlay.')
PY

OVERLAY="$TMP/overlay-recovered.tar.xz"
xz -t "$OVERLAY"
TEST_DIR="$TMP/overlay-test"
mkdir -p "$TEST_DIR"
tar -xJf "$OVERLAY" -C "$TEST_DIR"
[[ -f "$TEST_DIR/SKILL.md" ]]
[[ -d "$TEST_DIR/reference" ]]
[[ -d "$TEST_DIR/scripts" ]]

tar -xJf "$OVERLAY" -C "$ASSEMBLED"

# Preserve repository branding and the banner-enabled README already on main.
git fetch origin main
mkdir -p "$ASSEMBLED/assets"
for path in README.md assets/banner.svg assets/icon.svg assets/README.md; do
  if git cat-file -e "origin/main:$path" 2>/dev/null; then
    mkdir -p "$ASSEMBLED/$(dirname "$path")"
    git show "origin/main:$path" > "$ASSEMBLED/$path"
  fi
done

find "$ASSEMBLED" -type d -name __pycache__ -prune -exec rm -rf {} +
find "$ASSEMBLED" -type f -name '*.pyc' -delete

(
  cd "$ASSEMBLED"
  npm run validate
)

git worktree add --detach "$MAIN_WORKTREE" origin/main
rsync -a --delete --exclude='.git/' "$ASSEMBLED/" "$MAIN_WORKTREE/"

cd "$MAIN_WORKTREE"
git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git add -A
if git diff --cached --quiet; then
  echo "Asterframe source tree is already current."
  exit 0
fi

git commit -m "Restore complete Asterframe source tree"
git push origin HEAD:main
