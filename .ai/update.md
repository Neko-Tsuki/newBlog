# Upstream Sync Workflow — Firefly → newBlog

## Prerequisites
- Upstream remote `firefly` → `C:\Users\TY-Han\Documents\Firefly` (local fork)
- Real upstream: `CuteLeaf/Firefly` on GitHub (via `real-upstream` remote in Firefly repo)
- Your fork: `Neko-Tsuki/Firefly` on GitHub (via `origin` in Firefly repo)

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

Always backup before copying upstream files:

```powershell
mkdir -Force _backup/config
mkdir -Force _backup/content/posts
mkdir -Force _backup/content/spec
mkdir -Force _backup/styles
mkdir -Force _backup/public

Copy-Item -Recurse -Force src/config/* _backup/config/
Copy-Item -Recurse -Force src/content/posts/* _backup/content/posts/
Copy-Item -Recurse -Force src/content/spec/* _backup/content/spec/
Copy-Item -Force src/styles/twikoo.css _backup/styles/
Copy-Item -Force src/styles/fancybox-custom.css _backup/styles/
Copy-Item -Recurse -Force src/assets/images/* _backup/
Copy-Item -Recurse -Force public/assets/css/* _backup/public/
Copy-Item -Force src/i18n/languages/zh_CN.ts _backup/
```

---

## Step 4: Copy Framework Files

```powershell
# Copy all framework directories
cp -Recurse -Force ../Firefly/src/components/* src/components/
cp -Recurse -Force ../Firefly/src/layouts/* src/layouts/
cp -Recurse -Force ../Firefly/src/plugins/* src/plugins/
cp -Recurse -Force ../Firefly/src/utils/* src/utils/
cp -Recurse -Force ../Firefly/src/types/* src/types/
cp -Recurse -Force ../Firefly/src/styles/* src/styles/
cp -Recurse -Force ../Firefly/src/pages/* src/pages/
cp -Recurse -Force ../Firefly/src/i18n/* src/i18n/
cp -Recurse -Force ../Firefly/src/config/* src/config/
cp -Recurse -Force ../Firefly/src/content/* src/content/
cp -Recurse -Force ../Firefly/public/* public/
cp -Force ../Firefly/package.json .
cp -Force ../Firefly/astro.config.mjs .
cp -Force ../Firefly/tsconfig.json .
cp -Force ../Firefly/src/content.config.ts src/
cp -Force ../Firefly/src/env.d.ts src/
```

---

## Step 5: Restore Custom Content

### Restore blog posts and spec pages
```powershell
# Remove upstream example posts
@("code-examples.md","draft.md","encrypted-demo.md","firefly-layout-system.md","firefly.md","katex-math-example.md","markdown-extended.md","markdown-mermaid.md","markdown-plantuml.md","markdown-tutorial.md","mdx-example.mdx","video.md") | % { Remove-Item -Force "src/content/posts/$_" -ErrorAction SilentlyContinue }
Remove-Item -Recurse -Force "src/content/posts/guide" -ErrorAction SilentlyContinue

# Remove upstream spec pages (user has custom .mdx versions)
Remove-Item -Force "src/content/spec/about.md" -ErrorAction SilentlyContinue

# Remove upstream dynamic content
Remove-Item -Recurse -Force "src/content/dynamic" -ErrorAction SilentlyContinue

# Restore user content
Copy-Item -Recurse -Force _backup/content/posts/* src/content/posts/
Copy-Item -Recurse -Force _backup/content/spec/* src/content/spec/
```

### Restore config files (user values must be preserved)
```powershell
Copy-Item -Recurse -Force _backup/config/* src/config/
```

Then manually re-merge ONLY if upstream has NEW structural fields (new keys, renaming, type changes). Check `git diff HEAD -- src/config/*.ts` to identify configs with both structural changes AND user values.

### Restore styles, images, public assets
```powershell
Copy-Item -Force _backup/styles/twikoo.css src/styles/
Copy-Item -Force _backup/styles/fancybox-custom.css src/styles/
Copy-Item -Recurse -Force _backup/images/* src/assets/images/
Copy-Item -Recurse -Force _backup/public/* public/assets/css/
Copy-Item -Force _backup/zh_CN.ts src/i18n/languages/zh_CN.ts
```

---

## Step 6: Post-Sync Fixes

### 6a. Remove files upstream deleted
```powershell
git diff --name-only --diff-filter=A HEAD..firefly/master
# Delete files that no longer exist upstream:
# FontManager.astro → replaced by FontSetup.astro
# ArchivePanel.svelte → replaced by ArchivePanel.astro
# [...slug].png.ts → renamed to [...slug].ts
# mermaid-render-script.js → replaced by diagram-panzoom-script.js
# .decap.yml, .pages.yml → old CMS configs, not needed
# .wrangler/ → runtime sqlite state, not tracked
```

### 6b. Fix JSX HTML comments inside ternaries
Search `{/* comment */}` in `.astro` files. Patterns to fix:
- Inside `{...}` expressions: `<!-- text -->` → `{/* text */}`

Affected files (check each sync):
- `src/pages/anime.astro`
- `src/layouts/MainGridLayout.astro`
- `src/components/layout/NavMenuPanel.astro`

### 6c. Fix icon prefixes
Check for bare icon names (no prefix like `:`):
- `nyaone` → `simple-icons:mastodon` (or install `@iconify-json/ic`)
- `github` → `simple-icons:github`
- `rss` → `fa7-solid:rss`

### 6d. Fix wrangler.jsonc
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

### 6e. Fix sidebarTOC config
`hideOnNonPostPage: true` (NOT `showOnNonPostPage: false`)

### 6f. Waline CSS — CDN base + local override (cascade order matters)
In `src/components/comment/Waline.astro`:
```astro
  <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
  <link rel="stylesheet" href="/assets/css/waline-custom.css" />
```
- CDN CSS loads FIRST (provides base layout, grid, typography)
- Custom CSS loads SECOND (overrides with `#waline` prefix for priority)
- ❌ NEVER remove CDN CSS — custom CSS is an override layer, not a replacement

### 6g. CMS — Workers Assets incompatible with binding-based CMS
- Workers Assets (static) mode does NOT support bindings (KV, Images, Assets binding)
- ❌ Decap CMS (needs OAuth → Worker runtime + KV)
- ❌ Sveltia CMS (needs Worker runtime + KV + Images)
- ✅ **Pages CMS** (`.pages.yml`) — git-based, no server, works with any static host
- ✅ To use: configure `.pages.yml` at repo root, visit https://pagescms.org

### 6h. Add svg-spinners to astro-icon config
In `astro.config.mjs`, add `"svg-spinners": ["*"]` to the icon include.

---

## Step 7: Install & Build

```powershell
pnpm install
pnpm build
```

Build must pass with `[build] Complete!`. Check for errors:
- `CompilerError: Unexpected token` → JSX comment issue (Step 6b)
- `Unable to load the "local" icon set` → bare icon name (Step 6c)
- `Cannot use assets with a binding` → wrangler.jsonc has bindings (Step 6d)

---

## Step 8: Cleanup & Commit

```powershell
Remove-Item -Recurse -Force _backup

git add -A
git commit -m "chore: sync upstream Firefly v{VERSION} and fix build issues"
git push origin master
```

---

## Summary Checklist

- [ ] No new upstream commits? → Skip entire process
- [ ] Backed up custom configs, posts, spec, styles, images, public, zh_CN
- [ ] Copied all framework directories from Firefly/
- [ ] Restored all custom content
- [ ] Config files: re-merged if upstream had structural changes
- [ ] Removed files deleted upstream
- [ ] Fixed JSX comments in ternaries
- [ ] Fixed icon prefixes
- [ ] Fixed wrangler.jsonc (no bindings)
- [ ] Fixed Waline CSS (CDN base + local override, both present)
- [ ] Fixed CMS (.pages.yml is the only option for Workers Assets)
- [ ] Added svg-spinners to astro.config.mjs
- [ ] `pnpm install` succeeded
- [ ] `pnpm build` succeeded
- [ ] `_backup/` removed
- [ ] Committed and pushed to origin master
