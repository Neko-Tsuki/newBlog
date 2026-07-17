# Neko-Tsuki / 尘尘落落格 — Development Workflow

## Project Context
- **Repository**: Astro blog themed as `Firefly`, based on upstream `CuteLeaf/Firefly`
- **Deployment**: Cloudflare Workers (Assets) — auto-deploy on push to `master`
- **Package manager**: pnpm (enforced via `only-allow`)
- **Formatter + Linter**: Biome (tabs, double quotes)
- **TypeScript**: Astro + Svelte islands

---

## Commit Convention (Conventional Commits)

| Type | When to Use | Example |
|------|-------------|--------|
| `feat:` | New feature for user or codebase | `feat: enable dynamic module with navbar menu and sample entries` |
| `fix:` | Bug fix | `fix: remove Waline CDN CSS, use local waline-custom.css only` |
| `chore:` | Maintenance, cleanup, deps, sync | `chore: sync upstream Firefly v6.14.2 and fix build issues` |
| `Delete` | Removing files/dirs | `Delete docs directory` |

**Rules:**
- Messages are English-only, lowercase after prefix, no period at end
- No emoji, no markdown formatting in commit message
- Keep message under 72 chars, use body for details if needed
- Single-commit per logical change (no "fix fix fix" chains)
- Prefixed messages only (never raw messages)

---

## Development Cycle

### 1. Understand → Plan
- Read current file state before editing
- Use `task` agents for research across multiple files
- Verify file existence pre-edit with `Test-Path`

### 2. Edit → Verify → Commit
- Edit files directly (no temp copies)
- After each change: `pnpm build` (full build including icons + LQIP + pagefind)
- Only commit if build passes; if build fails, fix first, then commit
- Stage exactly what changed (`git add -A`)
- Push immediately after commit

### 3. Upstream Sync Pattern
1. `git fetch firefly master` (local `C:\Users\TY-Han\Documents\Firefly`)
2. Check `git log --oneline HEAD..firefly/master` for new commits
3. Copy framework directories: `src/components`, `src/layouts`, `src/plugins`, `src/utils`, `src/types`, `src/pages`, `src/i18n`, `src/styles`, `src/config`, root config files
4. Always backup custom config (`src/config/*`) before sync
5. Always restore user values after overwrite
6. Fix JSX HTML comments inside ternary expressions: `<!-- ... -->` → `{/* ... */}`
7. Remove upstream files that were deleted upstream (`git diff --name-only --diff-filter=A HEAD..firefly/master`)
8. Build and push

### 4. Config Management
- All site settings live in `src/config/*.ts`
- Always preserve these user values during sync:
  - `siteConfig.ts`: `title`, `subtitle`, `site_url`, `description`, `themeColor`, `siteStartDate`, `pages.*`, `favicon`
  - `profileConfig.ts`: `avatar`, `name`, `bio`, `links`
  - `friendsConfig.ts`: all friend links
  - `commentConfig.ts`: `type: "waline"`, `waline.serverURL`
  - `nickName` type: ensure `hideOnNonPostPage` is `true`
  - `backgroundWallpaper.ts`: custom wallpaper paths, credit info
  - `navBarConfig.ts`: custom nav structure
  - All other configs: restore user values on sync

---

## Code Organization

```
src/
├── components/     # UI components (PascalCase.astro / PascalCase.svelte)
│   ├── comment/    # Comment system integrations (Waline, Giscus, Twikoo, etc.)
│   ├── common/     # Shared UI elements (ButtonTag, CoverImage, Pagination, etc.)
│   ├── controls/   # Settings/control panels (ArchivePanel, DisplaySettings, Search)
│   ├── features/   # Feature components (BackgroundPlayer, MusicManager, FancyboxManager)
│   ├── layout/     # Layout components (Navbar, PostCard, PostPage, Footer, etc.)
│   ├── misc/       # Miscellaneous (License, RecommendedPost)
│   ├── pages/      # Page-specific components (bangumi/Card, dynamic/*, gallery/AlbumCard)
│   └── widget/     # Sidebar widgets (Calendar, Profile, Tags, Dynamic, etc.)
├── config/         # Configuration files (camelCaseConfig.ts)
├── content/        # Content collections (posts/, spec/, dynamic/)
├── i18n/           # Internationalization
├── layouts/        # Page layouts (Layout.astro, MainGridLayout.astro)
├── pages/          # Route pages
├── plugins/        # Markdown/HTML processing plugins
├── styles/         # CSS styles
├── types/          # TypeScript type definitions (aligned with config/)
└── utils/          # Utility functions (kebab-case.ts)
```

---

## Testing & Verification

| Check | Command | When |
|-------|---------|------|
| Build | `pnpm build` | After every change — runs icons gen + LQIP + Astro build + font subset + Pagefind |
| Type-check | `pnpm type-check` | After config/type changes (known pre-existing errors in `src/utils/*` with `--isolatedDeclarations`) |
| Lint | `pnpm lint` | Before final commit (Biome auto-fix) |
| Check | `pnpm check` | After Astro config changes |

**Build must pass before any commit.** Error patterns to watch for:
- `CompilerError: Unexpected token` → HTML comment `<!-- -->` inside JSX expression `{...}`
- `Unable to load the "local" icon set` → bare icon name without set prefix (e.g., `github` → `simple-icons:github`)
- `Cannot use assets with a binding in an assets-only Worker` → old binding leftover in `wrangler.jsonc`

---

## Key Files to Never Overwrite (Upstream Sync Protection)

| Path | Reason |
|------|--------|
| `src/content/posts/*` | User's blog posts |
| `src/content/spec/about.mdx`, `friends.mdx`, `guestbook.md` | Custom pages |
| `src/assets/images/*` | Avatar, wallpapers, favicon (original), navbar logo |
| `public/assets/css/waline-custom.css` | Deep Waline theming |
| `public/assets/css/twikoo-custom.css` | Custom Twikoo styling |
| `public/favicon/*` | Site favicon files |
| `public/pio/*` | Live2D/Spine models |
| `public/gallery/*` | User's gallery albums |
| `public/assets/images/sponsor/*` | Payment QR codes |
| `src/styles/twikoo.css` | Custom style overrides |
| `src/styles/fancybox-custom.css` | Custom lightbox styles |
| `.gitignore` | Custom ignores |
| `AGENTS.md` | Repo-specific guidelines |

---

## Known Fixes to Re-apply After Sync

1. **JSX HTML comments** in `src/pages/anime.astro`, `src/layouts/MainGridLayout.astro`, `src/components/layout/NavMenuPanel.astro`: change `<!-- comment -->` to `{/* comment */}` when inside `{...}`
2. **`sidebarToc`**: use `hideOnNonPostPage: true` instead of `showOnNonPostPage: false`
3. **Waline CSS**: CDN base CSS (`waline.css`) loads FIRST, then local custom override (`waline-custom.css`). Custom CSS is NOT a replacement — it's an override layer that depends on CDN's layout styles.
4. **Profile icons**: bare icon names need set prefix (e.g., `github` → `simple-icons:github`)
5. **`wrangler.jsonc`**: must stay minimal for Workers Assets mode (no `assets.binding`, no `images`, no `kv_namespaces`)
6. **`.gitignore`**: keep `opencode.json`, `.opencode/`, `dev_*.log`, `dev_*.txt`
7. **CMS**: Workers Assets mode CANNOT use bindings (KV, Images, etc.). Only **Pages CMS** (`.pages.yml`) works with Workers Assets. Decap/Sveltia/Keystatic CMS require Cloudflare Worker runtime (not compatible).
