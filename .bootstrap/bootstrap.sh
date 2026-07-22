#!/usr/bin/env bash
set -euo pipefail

ROOT="$(pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

git clone --depth 1 https://github.com/pbakaus/impeccable.git "$TMP/core"
git clone --depth 1 https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git "$TMP/uiux"

if [[ ! -d "$TMP/core/skill" ]]; then
  echo "Expected upstream skill directory was not found." >&2
  exit 1
fi

cp -a "$TMP/core/skill/." "$ROOT/"
python3 - <<'PY'
from pathlib import Path
root = Path('.')
replacements = [
    ('IMPECCABLE', 'ASTERFRAME'),
    ('Impeccable', 'Asterframe'),
    ('impeccable', 'asterframe'),
]
for path in root.rglob('*'):
    if not path.is_file() or '.git' in path.parts or '.bootstrap' in path.parts:
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

mkdir -p tools/uiux
cp -a "$UIUX_DIR/data" tools/uiux/
cp -a "$UIUX_DIR/scripts" tools/uiux/

cat .bootstrap/overlay.part-* | base64 --decode > "$TMP/overlay.tar.xz"
tar -xJf "$TMP/overlay.tar.xz" -C "$ROOT"

rm -rf .bootstrap
rm -f .github/workflows/bootstrap.yml

find . -type d -name __pycache__ -prune -exec rm -rf {} +
find . -type f -name '*.pyc' -delete

npm run validate

git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git add -A
if git diff --cached --quiet; then
  echo "Asterframe source tree is already current."
  exit 0
fi
git commit -m "Publish Asterframe source"
git push origin HEAD:main
