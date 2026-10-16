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

**2026-10-17 起用 `git merge upstream/master`，不再整目录覆盖。** 详细流程与踩坑见 `.ai/update.md`。
要点：

1. `git tag -f pre-sync-$(date +%F) HEAD` 留回退点，工作区必须干净
2. `git fetch upstream master`，然后**用上次同步到的上游版本当基线**看真实 delta
   （提交数 ≠ 工作量：2026-10-17 那次 280 个提交其实只有 113 个文件的真实 delta）
3. `git merge upstream/master --no-ff`，提交保留两个父提交，别 squash
4. 解冲突要**换掉错的 merge base**（base 取上游上次同步到的版本，用 `git merge-file`），
   否则上百个「同步历史噪音」冲突
5. **必须回头核对被自动合并的文件**：判据是「上游没改过的文件，结果必须逐字节等于本地」，
   否则会出现重复配置键 / 少括号 / 新字段插错层级这类静默损坏
6. 删掉上游带回来的仓库文档与示例内容（`.github/`、`docs/`、示例文章、示例项目、示例相册）
7. **`pnpm install` + `pnpm check` + `pnpm type-check` + `pnpm build` 全绿**才提交
8. 受保护清单逐项 diff 检查 + 漫展/日历倒计时模块的功能性回归

已废弃的旧做法（留在 git 历史里）：`_backup/` 备份 → `rsync` 覆盖框架目录 → 恢复定制内容。
它会**静默丢掉不在保护清单上的本地改动**——`Calendar.astro` 的构建期内联优化就这么被冲掉过一次。

### 4. Config Management
- All site settings live in `src/config/*.ts`
- Always preserve these user values during sync:
  - `siteConfig.ts`: `title`, `subtitle`, `site_url`, `description`, `themeColor`, `siteStartDate`, `timezone`, `pages.*`, `favicon`
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
| 漫展日程 Comic Events | `src/pages/comic-events.astro` → `/comic-events/` | 数据在 `src/data/comicEvents.ts`（只放条目），派生逻辑在 `src/utils/comic-utils.ts`；侧边栏 `RecentComicEvent`。分区/徽标按**访客本地时间**在客户端重算（静态产物烤的是构建那天）。更新条目见 `.claude/skills/update-comic-events/SKILL.md` |
| 时间进度 Schedule | 侧边栏 `Widget/ScheduleWidget.astro` | 四条进度条 + 节假日倒计时；节假日表在组件内，需每年补充。**它替换了上游已删除的 `Schedule.astro`**，componentMap 里映到 `schedule` 键 |
| 日历 Calendar | 侧边栏 `Widget/Calendar.astro`（上游文件） | 走运行时 `fetch("/api/allPostMeta.json")`（`src/pages/api/allPostMeta.json.ts` 必须存在）；本地曾有构建期内联优化被上游同步冲掉 |
| 动态 Dynamic | `src/pages/dynamic/` | 数据源必须为本地模式 `apiUrl: "/api/dynamic.json"`, `memos.enable: false` |
| 日记 Diary | `src/pages/diary.astro` → `/diary/` | 内容为 `src/content/diary/*.md` |
| Firefly-hyde widgets | 侧边栏 | TimeGreeting / ScheduleWidget / RelationshipTimer / QuoteOfTheDay / AiSummary / WelcomeToast；注意 `widget/` 与 `widgets/` 是两个目录 |

**侧边栏组件是「三处联动」**：加/改组件要同时动 `src/config/sidebarConfig.ts`（条目）、`src/types/sidebarConfig.ts`（类型联合）、`src/components/layout/SideBar.astro`（componentMap，type 字符串 → 组件的唯一绑定点）。漏一处就是构建失败或组件不显示，同步后要专门确认这四个条目还在：`timeGreeting` / `schedule` / `calendar` / `recentComicEvent`。

**旧版结构 → 新版结构（无需确认，直接转换）**

同步时若发现 newBlog 仍是旧版目录/样式结构而 Firefly 已是新版：先检测新版类名/路径是否与现有代码冲突（`dynamic-page-header` 这类带命名空间前缀的**不算**冲突）→ 不冲突直接转换 → 有冲突则先处理成新结构再合。已转换：`src/styles/pages/`（上游 6.16.8 也拆到了这个目录；`src/components/comic/PageHeader.astro` 依赖 `common.css`，**缺失会导致构建报 `Failed to resolve import`**）。

---

## Testing & Verification

| Check | Command | When |
|-------|---------|------|
| Build | `pnpm build` | After every change — runs icons gen + LQIP + Astro build + font subset + Pagefind |
| Type-check | `pnpm type-check` | After config/type changes — 期望**无输出**（2026-10-17 起已全绿） |
| Check | `pnpm check` | After Astro/content config changes — 期望 0 errors / 0 warnings / 0 hints |
| Lint | `pnpm lint` | Before final commit (Biome auto-fix) |

**Build must pass before any commit.** Error patterns to watch for:
- `CompilerError: Unexpected token` → HTML comment `<!-- -->` inside JSX expression `{...}`
- `Unable to load the "local" icon set` → bare icon name without set prefix (e.g., `github` → `simple-icons:github`)
- `Cannot use assets with a binding in an assets-only Worker` → old binding leftover in `wrangler.jsonc`
- `ts(1117): An object literal cannot have multiple properties with the same name` → 同步/合并把配置块塞重复了

### 功能性回归（静态检查看不出来的部分）

改布局、CSS 令牌、侧边栏注册或做上游同步之后，光靠 `check`/`build` 不够。跑构建产物里**真实的客户端脚本**，
把时钟拨到与构建日不同的时间，确认「按访客时间重算」的逻辑仍然生效。至少覆盖：

- `/comic-events/`：分区归属随访客时间变化、状态徽标、筛选徽标数字、筛选链路（含 `swup:contentReplaced` 后）
- 侧边栏「时间进度」：四条进度条被客户端重算（不是构建期数值）、最近节假日已填充
- 侧边栏「日历」：真的请求 `/api/allPostMeta.json` 并渲染出格子
- 侧边栏四个定制组件都在且 `enable: true`

**只测首屏会漏掉 swup 相关 bug**——那几个脚本都有 `DOMContentLoaded` 兜底，必须再走一遍站内切页。

### 测试产物用完即删（保持工作区干净）

Testing is a means, not a deliverable — **验证跑完就把为验证而生的一切删掉**：

- 临时测试脚本、探针文件、合成用例、备份副本（`*.bak`）一律**不进仓库**。需要就放仓库外（如 `/tmp`），验证完连临时目录一起删除。
- 确实要在 `dist/` 里造探针文件来触发构建脚本（如 `minify-inline-scripts.ts`）时，验证后立即 `rm -rf`，并确认 `git status` 干净。
- 仓库里不留 `*.test.*` / `probe-*` / `dist-raw|dist-old|dist-new` 这类验证残留；也不为它们加不需要的终端 log 输出。

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
| `src/data/comicEvents.ts` | 漫展数据源（用户维护的条目，只放数据） |
| `src/utils/comic-utils.ts` | 漫展日程的派生逻辑（状态推导 / 校验补齐 / 统计筛选） |
| `src/components/comic/*` | 漫展日程页面组件 |
| `src/components/widget/RecentComicEvent.astro` | 侧边栏「最近漫展」 |
| `src/components/widget/ScheduleWidget.astro` | 侧边栏「时间进度」（节假日表需每年补充） |
| `public/assets/images/comic-events/*` | 漫展封面图 |
| `src/styles/pages/common.css` | 各列表页共用样式，`comic/PageHeader.astro` 依赖它 |
| `.gitignore` | Custom ignores |
| `README.md`, `README.en.md` | 已改写为博客自己的说明；上游那两份是主题说明书（徽章/Fork 引导全指向 CuteLeaf/Firefly） |
| `AGENTS.md` | Repo-specific guidelines |
| `.ai/` | 本目录：流程与定制清单，上游没有 |
| `.github/workflows/*` | Local CI/CD workflows — never sync from upstream |

---

## Known Fixes (fallback reference)

2026-10-17 起同步改用 `git merge`，下面这些多半会被自动合好；**构建报错时按症状来查**，
完整版（含症状对照表）在 `.ai/update.md`。

1. **JSX HTML comments** in `src/pages/anime.astro`, `src/layouts/MainGridLayout.astro`, `src/components/layout/NavMenuPanel.astro`: change `<!-- comment -->` to `{/* comment */}` when inside `{...}`
2. **`sidebarToc`**: use `hideOnNonPostPage: true` instead of `showOnNonPostPage: false`
3. **Waline CSS**: CDN base CSS (`waline.css`) loads FIRST, then local custom override (`waline-custom.css`). Custom CSS is NOT a replacement — it's an override layer that depends on CDN's layout styles.
4. **Profile icons**: bare icon names need set prefix (e.g., `github` → `simple-icons:github`)
5. **`wrangler.jsonc`**: must stay minimal for Workers Assets mode (no `assets.binding`, no `images`, no `kv_namespaces`)
6. **`.gitignore`**: keep `opencode.json`, `.opencode/`, `dev_*.log`, `dev_*.txt`
7. **CMS**: Sveltia CMS at `public/admin/` (static HTML + YAML config). Workers Assets compatible. No bindings needed.
8. **`src/styles/pages/common.css`**: must exist — `comic/PageHeader.astro` imports it, missing it breaks the build
9. **`astro.config.mjs`**: astro-icon `include` needs `"svg-spinners": ["*"]`
