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

# Reconstruct the historical overlay defensively. The old publication process
# used multiple chunking strategies over time, so generate both plausible
# candidates and select the one that is a valid XZ-compressed tar archive.
TMP="$TMP" python3 - <<'PY'
import base64
import os
import re
from pathlib import Path

root = Path('.bootstrap')
out = Path(os.environ['TMP'])
parts = sorted(root.glob('overlay.part-*'))
if not parts:
    raise SystemExit('No overlay chunks were found.')

texts = [re.sub(rb'\s+', b'', path.read_bytes()) for path in parts]


def padded(data: bytes) -> bytes:
    return data + b'=' * ((-len(data)) % 4)

candidates = {}
try:
    candidates['joined-text'] = base64.b64decode(padded(b''.join(texts)), validate=False)
except Exception as exc:
    print(f'joined-text decode failed: {exc}')

try:
    candidates['decoded-parts'] = b''.join(
        base64.b64decode(padded(text), validate=False) for text in texts
    )
except Exception as exc:
    print(f'decoded-parts decode failed: {exc}')

for name, data in candidates.items():
    path = out / f'overlay-{name}.tar.xz'
    path.write_bytes(data)
    print(f'candidate {name}: {len(data)} bytes')

for index, text in enumerate(texts):
    non_base64 = re.sub(rb'[A-Za-z0-9+/=]', b'', text)
    print(
        f'chunk {index:03d}: chars={len(text)} mod4={len(text) % 4} '
        f'padding={text.count(b"=")} invalid={len(non_base64)}'
    )
PY

OVERLAY=""
for candidate in "$TMP"/overlay-*.tar.xz; do
  [[ -f "$candidate" ]] || continue
  TEST_DIR="$TMP/test-$(basename "$candidate" .tar.xz)"
  mkdir -p "$TEST_DIR"
  if xz -t "$candidate" >/dev/null 2>&1 \
    && tar -xJf "$candidate" -C "$TEST_DIR" >/dev/null 2>&1 \
    && [[ -f "$TEST_DIR/SKILL.md" ]] \
    && [[ -d "$TEST_DIR/reference" ]] \
    && [[ -d "$TEST_DIR/scripts" ]]; then
    OVERLAY="$candidate"
    break
  fi
done

if [[ -z "$OVERLAY" ]]; then
  echo "Unable to reconstruct a valid Asterframe overlay archive." >&2
  exit 1
fi

echo "Using overlay candidate: $(basename "$OVERLAY")"
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
