# Publishing Asterframe to GitHub

The repository is initialized on the `main` branch and already contains its first commit.

## With GitHub CLI

From the repository root:

```bash
git remote remove origin 2>/dev/null || true
gh repo create egkodin/asterframe --public --source=. --remote=origin --push
```

## With an existing empty repository

Create `egkodin/asterframe` on GitHub, then run:

```bash
git remote set-url origin https://github.com/egkodin/asterframe.git
git push -u origin main
```

## From the Git bundle

```bash
git clone asterframe.bundle asterframe
cd asterframe
git remote add origin https://github.com/egkodin/asterframe.git
git push -u origin main
```

Do not initialize the remote repository with unrelated files unless you intend to reconcile histories.
