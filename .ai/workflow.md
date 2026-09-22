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
4. **Never copy `.github/`** — CI/CD workflows are permanently excluded from sync
5. Always backup custom config (`src/config/*`) before sync
6. Always restore user values after overwrite
7. Fix JSX HTML comments inside ternary expressions: `<!-- ... -->` → `{/* ... */}`
8. Remove upstream files that were deleted upstream (`git diff --name-only --diff-filter=A HEAD..firefly/master`)
9. Build and push

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
│   ├── comic/      # 漫展日程页面组件 (PageHeader, FilterBar, SectionTitle, EventCard, EventCardGrid)
│   ├── controls/   # Settings/control panels (ArchivePanel, DisplaySettings, Search)
│   ├── features/   # Feature components (BackgroundPlayer, MusicManager, FancyboxManager)
│   ├── layout/     # Layout components (Navbar, PostCard, PostPage, Footer, etc.)
│   ├── misc/       # Miscellaneous (License, RecommendedPost)
│   ├── pages/      # Page-specific components (bangumi/Card, dynamic/*, gallery/AlbumCard)
│   └── widget/     # Sidebar widgets (Calendar, Profile, Tags, Dynamic, RecentComicEvent, ScheduleWidget, etc.)
├── config/         # Configuration files (camelCaseConfig.ts)
├── content/        # Content collections (posts/, spec/, dynamic/, diary/)
├── data/           # Data sources (comicEvents.ts 漫展, diary.ts 日记)
├── i18n/           # Internationalization
├── layouts/        # Page layouts (Layout.astro, MainGridLayout.astro)
├── pages/          # Route pages
├── plugins/        # Markdown/HTML processing plugins
├── styles/         # CSS styles
│   └── pages/      # 各列表页共用样式 (common.css — 提供 .page-heading / .page-icon)
├── types/          # TypeScript type definitions (aligned with config/)
└── utils/          # Utility functions (kebab-case.ts)
```

---

## Custom Features (not in upstream Firefly)

| Feature | Entry | Data / Notes |
|---------|-------|--------------|
| 漫展日程 Comic Events | `src/pages/comic-events.astro` → `/comic-events/` | 数据在 `src/data/comicEvents.ts`；侧边栏 `RecentComicEvent`。更新条目见 `.claude/skills/update-comic-events/SKILL.md` |
| 时间进度 Schedule | 侧边栏 `ScheduleWidget.astro` | 四条进度条 + 节假日倒计时；节假日表在组件内，需每年补充 |
| 动态 Dynamic | `src/pages/dynamic/` | 数据源必须为本地模式 `apiUrl: "/api/dynamic.json"`, `memos.enable: false` |
| 日记 Diary | `src/pages/diary.astro` → `/diary/` | 内容为 `src/content/diary/*.md` |
| Firefly-hyde widgets | 侧边栏 | TimeGreeting / Schedule / RelationshipTimer / QuoteOfTheDay / AiSummary / WelcomeToast |

**旧版结构 → 新版结构（无需确认，直接转换）**

同步时若发现 newBlog 仍是旧版目录/样式结构而 Firefly 已是新版：先检测新版类名/路径是否与现有代码冲突（`dynamic-page-header` 这类带命名空间前缀的**不算**冲突）→ 不冲突直接转换 → 有冲突则先处理成新结构再覆盖。已转换：`src/styles/pages/common.css`（`src/components/comic/PageHeader.astro` 依赖它，**缺失会导致构建报 `Failed to resolve import`**）。

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
| `src/content/dynamic/*` | User's dynamic posts |
| `src/assets/images/*` | Avatar, wallpapers, favicon (original), navbar logo |
| `public/assets/css/waline-custom.css` | Deep Waline theming |
| `public/assets/css/twikoo-custom.css` | Custom Twikoo styling |
| `public/favicon/*` | Site favicon files |
| `public/pio/*` | Live2D/Spine models |
| `public/gallery/*` | User's gallery albums |
| `public/assets/images/sponsor/*` | Payment QR codes |
| `src/styles/twikoo.css` | Custom style overrides |
| `src/styles/fancybox-custom.css` | Custom lightbox styles |
| `src/data/comicEvents.ts` | 漫展数据（用户维护的条目） |
| `src/components/comic/*` | 漫展日程页面组件 |
| `src/components/widget/RecentComicEvent.astro` | 侧边栏「最近漫展」 |
| `src/components/widget/ScheduleWidget.astro` | 侧边栏「时间进度」（节假日表需每年补充） |
| `public/assets/images/comic-events/*` | 漫展封面图 |
| `src/styles/pages/common.css` | 各列表页共用样式，`comic/PageHeader.astro` 依赖它 |
| `.gitignore` | Custom ignores |
| `AGENTS.md` | Repo-specific guidelines |
| `.github/workflows/*` | Local CI/CD workflows — never sync from upstream |

---

## Known Fixes to Re-apply After Sync

1. **JSX HTML comments** in `src/pages/anime.astro`, `src/layouts/MainGridLayout.astro`, `src/components/layout/NavMenuPanel.astro`: change `<!-- comment -->` to `{/* comment */}` when inside `{...}`
2. **`sidebarToc`**: use `hideOnNonPostPage: true` instead of `showOnNonPostPage: false`
3. **Waline CSS**: CDN base CSS (`waline.css`) loads FIRST, then local custom override (`waline-custom.css`). Custom CSS is NOT a replacement — it's an override layer that depends on CDN's layout styles.
4. **Profile icons**: bare icon names need set prefix (e.g., `github` → `simple-icons:github`)
5. **`wrangler.jsonc`**: must stay minimal for Workers Assets mode (no `assets.binding`, no `images`, no `kv_namespaces`)
6. **`.gitignore`**: keep `opencode.json`, `.opencode/`, `dev_*.log`, `dev_*.txt`
7. **CMS**: Sveltia CMS at `public/admin/` (static HTML + YAML config). Workers Assets compatible. No bindings needed.
