# Upstream Sync Workflow — Firefly → newBlog (Protected Custom Environment)

## Prerequisites

* Upstream remote `firefly` → `C:\Users\TY-Han\Documents\Firefly` (local fork)
* Real upstream: `CuteLeaf/Firefly` on GitHub (via `real-upstream` remote in Firefly repo)
* Your fork: `Neko-Tsuki/Firefly` on GitHub (via `origin` in Firefly repo)

---

## Protected Areas (DO NOT MODIFY)

The following files and directories are user-managed custom environments.

When synchronizing upstream Firefly changes:

* DO NOT overwrite
* DO NOT delete
* DO NOT migrate
* DO NOT refactor
* DO NOT automatically merge

these areas.

---

### Blog Admin System

Protected:

```
src/pages/admin/
public/admin/
admin/
```

Rules:

* The existing Blog `/admin/` page must remain unchanged.
* Any upstream file with the same path must be ignored.
* Any upstream modification related to admin pages must only be reported.
* Never replace the current admin implementation.

---

### Decap CMS

Protected:

```
.decap.yml
admin/config.yml
public/admin/*
src/pages/admin/*
CMS related scripts
CMS authentication configuration
```

Rules:

* Do not remove Decap CMS.
* Do not migrate Decap CMS.
* Do not replace Decap CMS with another CMS.
* Do not modify CMS authentication flow.
* Do not update CMS plugins automatically.
* Do not change CMS-related configuration.

If upstream contains CMS-related changes:

* Skip those changes.
* Report the differences only.
* Keep the current local configuration.

---

### GitHub Actions / CI Workflows

Protected:

```
.github/
.github/workflows/*
```

Rules:

* The entire `.github/` directory is permanently excluded from upstream sync.
* Never copy, overwrite, merge, or restore `.github/` from upstream.
* Never create `.github/` if it does not exist locally.
* Upstream CI workflow changes must be ignored entirely.
* Local CI configuration is managed independently.

---

## Step 1: Fetch Upstream

```powershell
# In Firefly repo
cd C:\Users\TY-Han\Documents\Firefly
git fetch real-upstream master

# Check new commits
git log --oneline origin/master..real-upstream/master

# If new commits exist, merge
git merge real-upstream/master --no-edit
git push origin master
```

If there are no new commits (`origin/master` == `real-upstream/master`), skip to Step 5.

---

## Step 2: Fetch into newBlog

```powershell
# In newBlog repo
cd C:\Users\TY-Han\Documents\newBlog
git fetch firefly master

# Check what's new
git log --oneline HEAD..firefly/master
git log --oneline HEAD..firefly/master --no-merges
```

---

## Step 3: Backup Custom Content

Always backup before copying upstream files.

```powershell
mkdir -Force _backup/config
mkdir -Force _backup/content/posts
mkdir -Force _backup/content/spec
mkdir -Force _backup/styles
mkdir -Force _backup/public
mkdir -Force _backup/admin
mkdir -Force _backup/cms
```

Backup normal custom content:

```powershell
Copy-Item -Recurse -Force src/config/* _backup/config/
Copy-Item -Recurse -Force src/content/posts/* _backup/content/posts/
Copy-Item -Recurse -Force src/content/spec/* _backup/content/spec/
Copy-Item -Force src/styles/twikoo.css _backup/styles/
Copy-Item -Force src/styles/fancybox-custom.css _backup/styles/
Copy-Item -Recurse -Force src/assets/images/* _backup/
Copy-Item -Recurse -Force public/assets/css/* _backup/public/
Copy-Item -Force src/i18n/languages/zh_CN.ts _backup/
```

Backup protected Admin and CMS:

```powershell
Copy-Item -Recurse -Force src/pages/admin/* _backup/admin/pages/
Copy-Item -Recurse -Force public/admin/* _backup/admin/public/

Copy-Item -Force .decap.yml _backup/cms/ -ErrorAction SilentlyContinue
Copy-Item -Recurse -Force admin/* _backup/cms/admin/ -ErrorAction SilentlyContinue
```

---

## Step 4: Copy Framework Files

Copy upstream framework files.

Protected areas must be excluded.

```powershell
cp -Recurse -Force ../Firefly/src/components/* src/components/
cp -Recurse -Force ../Firefly/src/layouts/* src/layouts/
cp -Recurse -Force ../Firefly/src/plugins/* src/plugins/
cp -Recurse -Force ../Firefly/src/utils/* src/utils/
cp -Recurse -Force ../Firefly/src/types/* src/types/
cp -Recurse -Force ../Firefly/src/styles/* src/styles/
cp -Recurse -Force ../Firefly/src/i18n/* src/i18n/
cp -Recurse -Force ../Firefly/src/config/* src/config/
```

---

### Copy Pages Except Admin

Do NOT copy:

```
src/pages/admin/
.github/
```

Use:

```powershell
Get-ChildItem ../Firefly/src/pages |
Where-Object {$_.Name -ne "admin"} |
Copy-Item -Destination src/pages -Recurse -Force
```

---

Continue copying:

```powershell
cp -Recurse -Force ../Firefly/src/content/* src/content/
cp -Recurse -Force ../Firefly/public/* public/
cp -Force ../Firefly/package.json .
cp -Force ../Firefly/astro.config.mjs .
cp -Force ../Firefly/tsconfig.json .
cp -Force ../Firefly/src/content.config.ts src/
cp -Force ../Firefly/src/env.d.ts src/
```

---

Protected files check:

```powershell
git diff -- src/pages/admin
git diff -- public/admin
git diff -- .decap.yml
git diff -- .github
```

Expected:

```
No changes
```

If changes exist:

Stop synchronization and restore protected files.

## Step 5: Restore Custom Content

### Restore blog posts and spec pages

```powershell
# Remove upstream example posts
@(
"code-examples.md",
"draft.md",
"encrypted-demo.md",
"firefly-layout-system.md",
"firefly.md",
"katex-math-example.md",
"markdown-extended.md",
"markdown-mermaid.md",
"markdown-plantuml.md",
"markdown-tutorial.md",
"mdx-example.mdx",
"video.md"
) | % { Remove-Item -Force "src/content/posts/$_" -ErrorAction SilentlyContinue }

Remove-Item -Recurse -Force "src/content/posts/guide" -ErrorAction SilentlyContinue

# Remove upstream spec pages
Remove-Item -Force "src/content/spec/about.md" -ErrorAction SilentlyContinue

# Remove upstream dynamic content
Remove-Item -Recurse -Force "src/content/dynamic" -ErrorAction SilentlyContinue

# Restore user content
Copy-Item -Recurse -Force _backup/content/posts/* src/content/posts/
Copy-Item -Recurse -Force _backup/content/spec/* src/content/spec/
```

---

### Restore config files (user values must be preserved)

```powershell
Copy-Item -Recurse -Force _backup/config/* src/config/
```

Then manually re-merge ONLY if upstream has NEW structural fields:

* new keys
* renamed keys
* type changes
* required configuration changes

Check:

```powershell
git diff HEAD -- src/config/*.ts
```

Only merge structural changes.

User-defined values must remain unchanged.

---

### Restore styles, images, public assets

```powershell
Copy-Item -Force _backup/styles/twikoo.css src/styles/
Copy-Item -Force _backup/styles/fancybox-custom.css src/styles/

Copy-Item -Recurse -Force _backup/images/* src/assets/images/

Copy-Item -Recurse -Force _backup/public/* public/assets/css/

Copy-Item -Force _backup/zh_CN.ts src/i18n/languages/zh_CN.ts
```

---

### Restore Protected Admin and CMS

Admin pages must always be restored after synchronization.

```powershell
# Restore Blog Admin
Copy-Item -Recurse -Force _backup/admin/pages/* src/pages/admin/

Copy-Item -Recurse -Force _backup/admin/public/* public/admin/
```

Restore Decap CMS:

```powershell
# Restore Decap CMS configuration
Copy-Item -Force _backup/cms/.decap.yml . -ErrorAction SilentlyContinue

Copy-Item -Recurse -Force _backup/cms/admin/* admin/ -ErrorAction SilentlyContinue
```

After restore:

Verify:

```powershell
git diff -- src/pages/admin
git diff -- public/admin
git diff -- .decap.yml
git diff -- .github
```

Expected:

```text
No changes
```

---

# Step 6: Post-Sync Fixes

## 6a. Remove files upstream deleted

```powershell
git diff --name-only --diff-filter=A HEAD..firefly/master
```

Delete files that no longer exist upstream:

```text
FontManager.astro → replaced by FontSetup.astro

ArchivePanel.svelte → replaced by ArchivePanel.astro

[...slug].png.ts → renamed to [...slug].ts

mermaid-render-script.js → replaced by diagram-panzoom-script.js
```

Do NOT remove:

```text
.decap.yml
admin/*
src/pages/admin/*
public/admin/*
```

These are protected user files.

---

## 6b. Fix JSX HTML comments inside ternaries

Search:

```text
{/* comment */}
```

in `.astro` files.

Patterns:

Inside `{...}` expressions:

```html
<!-- text -->
```

should become:

```astro
{/* text */}
```

Affected files (check each sync):

```text
src/pages/anime.astro

src/layouts/MainGridLayout.astro

src/components/layout/NavMenuPanel.astro
```

---

## 6c. Fix icon prefixes

Check for bare icon names without prefixes.

Examples:

```text
nyaone
```

replace with:

```text
simple-icons:mastodon
```

or install:

```text
@iconify-json/ic
```

Other examples:

```text
github
```

→

```text
simple-icons:github
```

```text
rss
```

→

```text
fa7-solid:rss
```

---

## 6d. Fix wrangler.jsonc

Keep minimal for Workers Assets mode:

```jsonc
{
	"name": "firefly",
	"compatibility_date": "2025-01-01",
	"compatibility_flags": ["nodejs_compat"],
	"assets": {
		"directory": "./dist"
	}
}
```

Do not add bindings:

```text
KV
Images
D1
Assets binding
```

unless the deployment architecture is intentionally changed.

---

## 6e. Fix sidebarTOC config

Use:

```ts
hideOnNonPostPage: true
```

NOT:

```ts
showOnNonPostPage: false
```

---

## 6f. Waline CSS — CDN base + local override

In:

```text
src/components/comment/Waline.astro
```

Keep:

```astro
<link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
<link rel="stylesheet" href="/assets/css/waline-custom.css" />
```

Rules:

* CDN CSS loads FIRST.
* Custom CSS loads SECOND.
* Custom CSS is an override layer.

Never remove CDN CSS.

---

## 6g. CMS Protection

CMS configuration is user-managed.

DO NOT:

* remove CMS files
* migrate CMS configuration
* replace Decap CMS
* switch CMS providers
* modify authentication flow
* update CMS plugins automatically

Protected:

```text
.decap.yml

admin/

src/pages/admin/

public/admin/

CMS related scripts
```

If upstream contains CMS changes:

```text
Skip changes.

Report differences only.

Keep current local CMS configuration.
```

---

## 6h. Add svg-spinners to astro-icon config

In:

```text
astro.config.mjs
```

Add:

```ts
"svg-spinners": ["*"]
```

to icon include.

---

# Step 7: Install & Build

```powershell
pnpm install

pnpm build
```

Build must pass:

```text
[build] Complete!
```

Check errors:

```text
CompilerError: Unexpected token
→ JSX comment issue (Step 6b)

Unable to load the "local" icon set
→ icon prefix issue (Step 6c)

Cannot use assets with a binding
→ wrangler.jsonc issue (Step 6d)
```

---

## Protected Area Final Verification

Before commit:

```powershell
git diff -- src/pages/admin
git diff -- public/admin
git diff -- .decap.yml
git diff -- admin/
git diff -- .github
```

Expected:

```text
No changes
```

If changes exist:

```text
Abort commit.

Restore protected files.

Review manually.
```

---

# Step 8: Cleanup & Commit

```powershell
Remove-Item -Recurse -Force _backup

git add -A

git commit -m "chore: sync upstream Firefly v{VERSION} and fix build issues"

git push origin master
```
## Linux Environment Setup

This workflow supports Linux development environments.

Before executing any synchronization operation, detect the current operating system.

If running on Linux:

* Use Bash commands instead of PowerShell.
* Use Linux filesystem paths.
* Do not execute Windows-specific commands.
* Preserve existing user environment configuration.

---

## Supported Linux Environments

Recommended:

* Fedora
* Ubuntu
* Debian
* Arch Linux

Required tools:

```bash
git
node
pnpm
npm
rsync
```

Optional:

```bash
gh
wrangler
```

---

# Step L1: Check Environment

Run:

```bash
uname -a

which git
which node
which pnpm
```

Expected:

```text
git    -> installed
node   -> installed
pnpm   -> installed
```

If missing:

Stop workflow.

Report missing dependencies.

Do not install automatically unless user allows it.

---

# Step L2: Install Node.js Environment

Recommended:

Use Node.js LTS.

Check:

```bash
node -v

npm -v
```

Expected:

```text
Node >= 20
npm >= 10
```

If using nvm:

```bash
command -v nvm
```

Install Node:

```bash
nvm install --lts

nvm use --lts
```

---

# Step L3: Install pnpm

Check:

```bash
pnpm -v
```

If missing:

```bash
corepack enable

corepack prepare pnpm@latest --activate
```

Verify:

```bash
pnpm -v
```

---

# Step L4: Install Git Tools

Check:

```bash
git --version
```

Configure user:

```bash
git config --global user.name

git config --global user.email
```

If missing:

```bash
git config --global user.name "YOUR_NAME"

git config --global user.email "YOUR_EMAIL"
```

---

# Step L5: Install Cloudflare Wrangler

Required only for Cloudflare deployment.

Check:

```bash
wrangler --version
```

Install:

```bash
pnpm add -g wrangler
```

Login:

```bash
wrangler login
```

Do not modify Cloudflare configuration automatically.

---

# Step L6: Repository Path Configuration

Linux example:

```bash
~/Projects/
├── Firefly/
└── newBlog/
```

Configure paths:

```bash
cd ~/Projects/newBlog
```

Check upstream:

```bash
git remote -v
```

Expected:

```text
firefly   ~/Projects/Firefly
origin    GitHub repository
```

If missing:

```bash
git remote add firefly ~/Projects/Firefly
```

---

# Step L7: Linux File Permission Check

Before synchronization:

Check:

```bash
ls -la
```

Ensure current user owns project files:

```bash
sudo chown -R $USER:$USER .
```

Do NOT use:

```bash
chmod 777
```

Avoid unsafe permission changes.

---

# Step L8: Linux Backup Commands

Linux equivalent:

```bash
mkdir -p _backup/config
mkdir -p _backup/content/posts
mkdir -p _backup/content/spec
mkdir -p _backup/styles
mkdir -p _backup/public
mkdir -p _backup/admin
mkdir -p _backup/cms
```

Backup:

```bash
cp -r src/config/* _backup/config/

cp -r src/content/posts/* _backup/content/posts/

cp -r src/content/spec/* _backup/content/spec/

cp -r src/pages/admin/* _backup/admin/pages/

cp -r public/admin/* _backup/admin/public/
```

CMS:

```bash
cp .decap.yml _backup/cms/ 2>/dev/null || true

cp -r admin/* _backup/cms/admin/ 2>/dev/null || true
```

---

# Step L9: Linux Synchronization Commands

Use:

```bash
rsync -av \
--exclude="admin" \
../Firefly/src/pages/ \
src/pages/
```

The following directories are allowed:

```text
src/components/
src/layouts/
src/plugins/
src/utils/
src/types/
src/styles/
src/i18n/
src/config/
```

Example:

```bash
rsync -av ../Firefly/src/components/ src/components/

rsync -av ../Firefly/src/layouts/ src/layouts/

rsync -av ../Firefly/src/plugins/ src/plugins/
```

Never sync:

```text
src/pages/admin/
public/admin/
.decap.yml
admin/
.github/
```

---

# Step L10: Linux Build Verification

Install dependencies:

```bash
pnpm install
```

Build:

```bash
pnpm build
```

Expected:

```text
[build] Complete!
```

Check protected files:

```bash
git diff -- src/pages/admin

git diff -- public/admin

git diff -- .decap.yml

git diff -- admin/

git diff -- .github
```

Expected:

```text
No changes
```

---

# Step L11: Linux Cleanup

Remove backup:

```bash
rm -rf _backup
```

Commit:

```bash
git add -A

git commit \
-m "chore: sync upstream Firefly and fix build issues"

git push origin master
```

---

# Linux Environment Rules

When running on Linux:

* Prefer `rsync` over `cp`.
* Prefer relative paths.
* Never use `sudo` unless required.
* Never change system-wide configuration.
* Never modify user's shell configuration.
* Never overwrite protected files.
* Always verify Git diff before commit.


---

# Summary Checklist

* [ ] No new upstream commits? → Skip entire process
* [ ] Backed up custom configs, posts, spec, styles, images, public, zh_CN
* [ ] Backed up admin pages
* [ ] Protected Decap CMS configuration
* [ ] Copied framework directories from Firefly/
* [ ] Skipped `src/pages/admin/`
* [ ] Skipped `.github/` (never synced)
* [ ] Restored custom content
* [ ] Restored Admin system
* [ ] Restored CMS configuration
* [ ] Config files re-merged only for structural changes
* [ ] Removed files deleted upstream
* [ ] Fixed JSX comments
* [ ] Fixed icon prefixes
* [ ] Fixed wrangler.jsonc
* [ ] Fixed sidebarTOC config
* [ ] Fixed Waline CSS
* [ ] Preserved Decap CMS
* [ ] Added svg-spinners
* [ ] `pnpm install` succeeded
* [ ] `pnpm build` succeeded
* [ ] Protected areas have no diff
* [ ] `_backup/` removed
* [ ] Committed and pushed to origin master

