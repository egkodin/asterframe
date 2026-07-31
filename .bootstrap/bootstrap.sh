#!/usr/bin/env bash
set -euo pipefail

ROOT="$(pwd)"
TMP="$(mktemp -d)"
ASSEMBLED="$TMP/assembled"
MAIN_WORKTREE="$TMP/main"
trap 'git worktree remove --force "$MAIN_WORKTREE" >/dev/null 2>&1 || true; rm -rf "$TMP"' EXIT

mkdir -p "$ASSEMBLED"

decode_parts() {
  local part
  for part in "$@"; do
    base64 --decode "$part"
  done
}

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

# The archived chunks were base64-encoded independently. Decode each file
# separately, then concatenate the decoded binary streams.
if compgen -G '.bootstrap/part-*' > /dev/null; then
  decode_parts .bootstrap/part-* > "$TMP/base-overlay.tar.xz"
  tar -xJf "$TMP/base-overlay.tar.xz" -C "$ASSEMBLED"
fi

decode_parts .bootstrap/overlay.part-* > "$TMP/overlay.tar.xz"
tar -xJf "$TMP/overlay.tar.xz" -C "$ASSEMBLED"

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
