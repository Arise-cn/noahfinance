#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-deploy-dev}"
REMOTE_NAME="${REMOTE_NAME:-origin}"
COMMIT_MESSAGE="${COMMIT_MESSAGE:-deploy: github pages static export}"
BASE_PATH="${BASE_PATH:-/noahfinance}"

if ! command -v git >/dev/null 2>&1; then
  echo "git is required."
  exit 1
fi

if ! command -v rsync >/dev/null 2>&1; then
  echo "rsync is required."
  exit 1
fi

cd "$ROOT_DIR"

if [ ! -d "out" ]; then
  echo "out/ not found. Run build first."
  exit 1
fi

CURRENT_BRANCH="$(git branch --show-current)"
if [ "$CURRENT_BRANCH" != "dev" ]; then
  echo "Warning: current branch is '$CURRENT_BRANCH' (recommended: dev)."
fi

if ! git show-ref --verify --quiet "refs/heads/$DEPLOY_BRANCH"; then
  echo "Local branch '$DEPLOY_BRANCH' does not exist."
  exit 1
fi

WORKTREE_DIR="$(mktemp -d)"
cleanup() {
  git worktree remove "$WORKTREE_DIR" --force >/dev/null 2>&1 || true
  rm -rf "$WORKTREE_DIR" >/dev/null 2>&1 || true
}
trap cleanup EXIT

git worktree add --force "$WORKTREE_DIR" "$DEPLOY_BRANCH" >/dev/null

rsync -a --delete --exclude ".git" "$ROOT_DIR/out/" "$WORKTREE_DIR/"
touch "$WORKTREE_DIR/.nojekyll"

# Ensure public assets inside exported JS/CSS/HTML use the project base path.
WORKTREE_DIR="$WORKTREE_DIR" BASE_PATH="$BASE_PATH" python3 - <<'PY'
from pathlib import Path
import os

root = Path(os.environ["WORKTREE_DIR"])
base = os.environ.get("BASE_PATH", "").rstrip("/")
if not base:
    raise SystemExit(0)

exts = {".html", ".js", ".css", ".txt"}
targets = ["/images/", "/font/", "/favicon.ico", "/file.svg", "/globe.svg", "/next.svg", "/vercel.svg", "/window.svg"]

def patch_content(text: str) -> str:
    out = text
    for t in targets:
        out = out.replace(f'"{t}', f'"{base}{t}')
        out = out.replace(f"'{t}", f"'{base}{t}")
        out = out.replace(f"url({t}", f"url({base}{t}")
        out = out.replace(f'url("{t}', f'url("{base}{t}')
        out = out.replace(f"url('{t}", f"url('{base}{t}")
    return out

for p in root.rglob("*"):
    if not p.is_file() or p.suffix.lower() not in exts:
        continue
    try:
        src = p.read_text(encoding="utf-8")
    except Exception:
        continue
    dst = patch_content(src)
    if dst != src:
        p.write_text(dst, encoding="utf-8")
PY

cd "$WORKTREE_DIR"
git add -A

if git diff --cached --quiet; then
  echo "No changes to deploy on $DEPLOY_BRANCH."
  exit 0
fi

git commit -m "$COMMIT_MESSAGE"
git push "$REMOTE_NAME" "$DEPLOY_BRANCH"

echo "Deployed to $REMOTE_NAME/$DEPLOY_BRANCH"
