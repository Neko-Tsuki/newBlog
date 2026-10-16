# Upstream Sync Workflow — Firefly → newBlog

## 拓扑

| remote | 地址 | 用途 |
|---|---|---|
| `origin` | `git@github.com:Neko-Tsuki/newBlog.git` | 个人博客，推送目标 |
| `upstream` | `https://github.com/CuteLeaf/Firefly.git` | 上游主题，只读 |

- 分支：`master`。部署：Cloudflare Workers (Assets)，**push 到 `master` 自动部署**。
- 包管理：pnpm（`only-allow` 强制）。格式化/检查：Biome（tab 缩进 + 双引号）。
- 环境：Node ≥ 22.23、pnpm 11。仓库就在 `~/文档/newBlog`，没有本地 Firefly 克隆，也不需要建。

---

## 同步方式：git merge（2026-10-17 起）

2026-10-17 的 `46d35dda` 是一次**真正的 `git merge upstream/master`**（上游 v6.16.8，280 个提交），
从这天起两边**恢复共享历史**。

在此之前长期双向分叉：本地领先 129、上游领先 280，共同祖先停在 **v6.13.7**。原因是 2026-07 ~ 2026-09
的 12 次同步都走「复制上游文件 → 提交成自己的 commit」，git 里没有同步记录，于是上游的新改动
以本地 commit 的形式存在。

**所以：现在的同步就是 `git merge upstream/master`。** 本文档 2026-10-17 之前描述的
「`_backup/` 备份 → rsync/`cp` 覆盖框架目录 → 恢复定制内容 → 重套修正」流程**已废弃**，
它的问题是会**静默丢掉不在保护清单上的本地改动**——已经发生过一次：
`Calendar.astro` 的构建期内联优化（`39daff91`）被 `236c0325` 整文件覆盖回运行时 fetch。

---

## 同步流程

### 0. 前提

```bash
git -C ~/文档/newBlog status --short     # 工作区必须干净；有改动先提交或 stash
```

### 1. 留回退点

```bash
git tag -f pre-sync-$(date +%F) HEAD
```

出问题可以 `git merge --abort`（未提交时）或 `git reset --hard pre-sync-<日期>`。

### 2. 拉上游，先看**真实** delta

```bash
git fetch upstream master
git rev-list --count HEAD..upstream/master          # 上游领先多少
git rev-list --count upstream/master..HEAD          # 本地领先多少
```

**别被提交数吓到。** 提交数不等于工作量。先找到**上次同步到的上游版本**——本地
`package.json` 里的 `version` 就是它：

```bash
git show HEAD:package.json | grep '"version"'
git log --oneline upstream/master --grep="版本号至 <上面的版本>"
git diff --stat <那个上游提交> upstream/master      # 这才是这次真正要搬的量
```

例：2026-10-17 那次本地是 6.16.7、上游 6.16.8，`HEAD..upstream/master` 有 280 个提交，
但真实 delta 只有 **113 个文件**。

### 3. Merge

```bash
git merge upstream/master --no-ff --no-commit
git status --porcelain | grep -E '^(UU|DU|UD|AA|AU|UA|DD)' | awk '{print $1}' | sort | uniq -c
```

冲突类型速查：`UU` 双方改 / `DU` 我方删他方改 / `UD` 我方改他方删 / `AA` 双方各自新增 / `UA` 他方新增。

### 4. 解冲突：**换掉错的 merge base** ← 关键

git 用的 base 是共同祖先（v6.13.7），但本地内容其实 ≈ **上游上次同步到的版本**。
从 v6.13.7 看，两边都像大改过同一批文件，于是炸出上百个「同步历史噪音」冲突。

正解：对每个冲突文件做三方合并，base 取**上游上次同步到的版本**（第 2 步查到的那个提交）。

```bash
BASE=<上游上次同步到的提交>
git status --porcelain | grep -E '^(UU|AA|UA|DU|UD|AU|DD)' | awk '{print $2}' | while read -r f; do
  case "$f" in *.avif|*.png|*.jpg|*.jpeg|*.webp|*.ico|*.woff*|*.ttf|*.gif)   # 二进制取本地
    git checkout --ours -- "$f" && git add -- "$f"; continue ;;
  esac
  git show "$BASE:$f"           > /tmp/r-base   2>/dev/null || : > /tmp/r-base
  git show ":2:$f"              > /tmp/r-ours   2>/dev/null || : > /tmp/r-ours
  git show ":3:$f"              > /tmp/r-theirs 2>/dev/null || : > /tmp/r-theirs
  if git merge-file -p /tmp/r-ours /tmp/r-base /tmp/r-theirs > /tmp/r-out 2>/dev/null; then
    cp /tmp/r-out "$f" && git add -- "$f"
  else
    echo "需手工: $f"
  fi
done
```

`DU`（我方删、他方改）一律**保持删除**——基本都是上游的示例文章/仓库文档：

```bash
grep '^DU' /tmp/conf.txt | awk '{print $2}' | while read -r f; do git rm -q --force --ignore-unmatch "$f"; done
```

实测效果：2026-10-17 那次 **114 → 13**，剩下 13 个逐个手工（见下）。

### 5. 核对**自动合并**的文件 ← 关键

第 4 步只管冲突文件。但 git 的**自动合并同样用了错的 base**，一样会制造静默损坏：
把本地从旧版复制来的内容和上游本次改动**叠加**，于是出现**重复的配置键**、
**少一个闭合括号**、**新字段被插进错误的嵌套层级**。

2026-10-17 实际踩到的：

| 文件 | 症状 |
|---|---|
| `src/config/musicConfig.ts` | `showInSidebar` 整块重复（`pnpm check` 直接报 ts(1117)） |
| `src/config/expressiveCodeConfig.ts` | `pluginLanguageLogo` 整块重复 |
| `src/content.config.ts` | `ziyuanCollection` 少了 `});` |
| `src/types/siteConfig.ts` | 上游的 `projects: boolean` 被插进 `anime?: {...}` 内部 |

**判据：上游根本没改过的文件，合并结果必须逐字节等于本地。** 靠这条能一次揪出全部这类损坏：

```bash
git diff --cached --name-only | while read -r f; do
  git cat-file -e "HEAD:$f" 2>/dev/null || continue
  if [ -z "$(git diff "$BASE" upstream/master -- "$f" 2>/dev/null)" ]; then
    git diff --quiet HEAD -- "$f" 2>/dev/null || { git checkout HEAD -- "$f"; git add -- "$f"; echo "还原: $f"; }
  fi
done
```

再对**所有**改动文件重算一次「以 `$BASE` 为 base」的三方合并，和当前内容比对，
不一致的就是需要人工过目的（其中会包含你刻意手改的那几个）：

```bash
git diff --cached --name-only | while read -r f; do
  case "$f" in *.avif|*.png|*.jpg|*.webp|*.ico|*.lock|pnpm-lock.yaml) continue ;; esac
  git show "$BASE:$f" >/tmp/a 2>/dev/null || : >/tmp/a
  git show "HEAD:$f"  >/tmp/b 2>/dev/null || : >/tmp/b
  git show "upstream/master:$f" >/tmp/c 2>/dev/null || : >/tmp/c
  if cmp -s /tmp/a /tmp/c; then cmp -s /tmp/b "$f" || echo "MISMATCH $f"; continue; fi
  git merge-file -p /tmp/b /tmp/a /tmp/c > /tmp/o 2>/dev/null \
    && cmp -s /tmp/o "$f" || echo "REVIEW $f"
done
```

### 6. 丢掉上游的仓库文档与示例内容

上游仓库自带的这些东西不要，删掉（合并常会把它们带回来）：

```text
.github/                        — 本地 CI 独立管理，永不从上游同步
docs/                           — 上游的多语言 README 与截图
CLAUDE.md  CONTRIBUTING.md      — 上游自己的贡献文档
src/content/posts/*             — 上游示例文章（code-examples / draft / mdx-example / video / guide/ …）
src/content/spec/about.md       — 本地用自己的 about.mdx
src/content/projects/*          — 上游示例项目条目
public/gallery/**               — 上游示例相册
```

判断方法：

```bash
git diff --cached --name-status --diff-filter=A | awk '{print $2}' \
  | grep -vE "^(src/(components|layouts|plugins|utils|types|styles|i18n|config|pages|icons|assets)/|astro.config|package.json|pnpm-lock)"
```

### 7. 验证（全绿才能提交）

```bash
pnpm install        # 上游可能升了依赖（例：astro 7.2→7.3、@astrojs/mdx 7→8）
pnpm check          # 期望 0 errors / 0 warnings / 0 hints
pnpm type-check     # 期望无输出
pnpm build          # 期望 [build] Complete!
```

再跑**受保护区 diff 检查**（下面「受保护清单」那批路径），期望全部 `未改动`：

```bash
for p in public/admin src/pages/admin .github src/content/dynamic src/content/diary \
         src/data/diary.ts src/components/comic \
         src/components/widget/ScheduleWidget.astro \
         src/components/widget/RecentComicEvent.astro; do
  git diff --cached --quiet HEAD -- "$p" && echo "OK  $p" || echo "改动! $p"
done
```

**功能性回归**（合并会动布局、CSS 令牌、侧边栏注册，静态检查看不出来）：把时钟拨到与构建日不同的时间，
跑构建产物里真实的内联脚本，确认客户端重算仍然生效。至少要覆盖：

- **展会信息模块** — `/comic-events/` 分区归属随访客时间变化、状态徽标、筛选徽标数字、筛选链路
- **日历倒计时模块** — 侧边栏「时间进度」四条进度条被客户端重算、最近节假日填充；
  「日历」真的去拉 `/api/allPostMeta.json` 并渲染出格子
- 侧边栏四个定制组件（`timeGreeting` / `schedule` / `calendar` / `recentComicEvent`）都还在

### 8. 提交与推送

```bash
git add -A
git commit -m "chore: sync upstream Firefly v<X.Y.Z>"
git push origin master
```

提交信息用 Conventional Commits，**英文、全小写、无 emoji、无句号、72 字符内**，细节写进 body。
merge 提交保留两个父提交，不要 squash——下次同步就靠这条历史。

---

## 受保护清单（合并后逐项确认未改动）

这些是用户管理的自定义环境：同步时**不得覆盖、不得删除、不得迁移、不得重构、不得自动合并**。

### Admin / CMS

```text
public/admin/                — 整个 Blog Admin 系统，上游同名文件一律忽略
public/admin/config.yml      — Sveltia CMS 配置（collection 名必须唯一）
public/admin/index.html      — 静态 HTML，不经 Astro 处理，script 不得带 type="module"
```

Sveltia CMS 版本固定 `0.172.4`。上游若有 CMS 改动：跳过，只报告。

### CI

```text
.github/  .github/workflows/*
```

永久排除。**不要从上游复制、覆盖、合并、还原，本地没有时也不要创建。**

### 动态 (Dynamic)

```text
src/content/dynamic/*                    — 内容，绝不跨仓库同步
src/components/pages/dynamic/            — DynamicFeed.svelte / DynamicItem.astro /
                                           DynamicItemTemplate.astro / DynamicGallery.astro /
                                           DynamicInlineComments.astro / dynamic-gallery.ts /
                                           dynamic-inline-comments.ts
src/components/widget/Dynamic.astro
src/components/widget/DynamicSidebar.svelte
src/config/dynamicConfig.ts  src/types/dynamicConfig.ts
src/utils/dynamic-utils.ts   src/utils/memos-adapter.ts
src/styles/dynamic.css       scripts/new-dynamic.js
```

数据源**必须保持本地模式**：`apiUrl: "/api/dynamic.json"`、`memos.enable: false`。

### 日记 (Diary)

```text
src/pages/diary.astro
src/data/diary.ts                        — 绝不跨仓库同步
src/content/diary/*.md                   — 文件即条目，绝不跨仓库同步
src/components/features/diary/           — index.ts / types.ts / MomentCard.astro
src/components/atoms/                    — index.ts / FilterTabs.astro
src/utils/timeFormat.ts
public/js/filter-tabs-handler.js
```

### 漫展日程 (Comic Events)

规格文档：`文档/漫展日程页面（Comic Events）完整复现规格文档.md`，用词对齐 <https://qwq.sigrika.cc/>。

```text
src/types/comic.ts
src/data/comicEvents.ts                  — 只放条目，不写 status
src/utils/comic-utils.ts                 — 状态推导 / 校验补齐 / 统计筛选
src/components/comic/                    — PageHeader / FilterBar / SectionTitle /
                                           EventSection / EventCard / EventCardGrid
src/pages/comic-events.astro             — 路由 /comic-events/
src/components/widget/RecentComicEvent.astro   — 侧边栏「最近漫展」
src/components/widget/ScheduleWidget.astro     — 侧边栏「时间进度」
public/assets/images/comic-events/*.webp       — 封面图
```

- **分区按状态自动派生**：即将到来 / 正在进行中 / 完结撒花，空分区不渲染。
- 筛选逻辑在 `src/pages/comic-events.astro` 的 `<script>` 里（不在 EventCardGrid），
  因为要同时处理**分区**与**卡片**两级可见性。
- 页面脚本会按**访客本地时间**重算状态（分区归属、状态徽标、筛选徽标数字），
  首屏与 `swup:contentReplaced` 后各一次——静态产物烤的是构建那天的状态。
- 数据录入见 `.ai/comicUpdate.md` 与 `.claude/skills/update-comic-events/SKILL.md`。
- `SectionTitle` 的 `background: var(--page-bg)` 依赖「事件网格直接坐在页面背景上」；
  若把网格移进 `card-base` 卡片，要同步改成 `var(--card-bg)`。
- 侧边栏组件类型是 `recentComicEvent`（**单数**）。

### Firefly-hyde 定制组件

来源：[Firefly-hyde](https://cnb.cool/sin_13/Firefly-hyde)（sin_13 的 fork）。

```text
src/components/widget/AiSummary.astro          — AI 摘要（文章页，已禁用）
src/components/widget/QuoteOfTheDay.astro      — 每日一言（侧边栏，已禁用）
src/components/widgets/WelcomeToast.astro      — 欢迎弹窗（已禁用）
src/components/widgets/TimeGreeting.astro      — 时间问候（侧边栏，已启用）
src/components/widget/ScheduleWidget.astro     — 时间进度（侧边栏，已启用）
src/components/widget/RelationshipTimer.astro  — 恋爱倒计时（已禁用）
src/content/ziyuan/quote.md                    — 每日一言数据源
```

注意 `widget/` 与 `widgets/` 是**两个目录**，别混。`ScheduleWidget.astro` 是**替换**上游旧
`Schedule.astro` 的存在（上游 6.16.8 已无该文件），`SideBar.astro` 的 componentMap 里映到 `schedule` 键。

更新方式（上游仓库不管这些，只能从 Firefly-hyde 手动搬）：

```bash
git clone --depth 1 https://cnb.cool/sin_13/Firefly-hyde.git /tmp/firefly-hyde
# 看 src/components/widget/ 与 src/components/widgets/ 有没有想要的改动，手动搬
# 日记相关的还要看 src/pages/diary.astro、src/data/diary.ts、src/components/features/diary/
rm -rf /tmp/firefly-hyde
```

### 侧边栏注册（三处联动，最容易漏）

改/加侧边栏组件要同时动三个地方，漏一个就是构建失败或组件不显示：

```text
src/config/sidebarConfig.ts      — rightComponents 里的条目（type / enable / position / 页面显隐）
src/types/sidebarConfig.ts       — WidgetComponentType 联合类型 + specificConfig
src/components/layout/SideBar.astro — componentMap：type 字符串 → 组件 的唯一绑定点
```

合并后要确认这四个条目还在且 `enable: true`：`timeGreeting` / `schedule` / `calendar` / `recentComicEvent`。

### 其他不得被覆盖

```text
src/content/posts/*                — 你的文章
src/content/spec/about.mdx  friends.mdx  guestbook.md
src/assets/images/*                — 头像 / 壁纸 / favicon 原图 / navbar logo
public/assets/css/waline-custom.css  twikoo-custom.css
public/favicon/*  public/pio/*  public/gallery/*  public/assets/images/sponsor/*
src/styles/twikoo.css  fancybox-custom.css
src/styles/pages/common.css        — comic/PageHeader.astro 依赖它的 .page-heading / .page-icon
src/config/*                       — 用户取值（见下）
.gitignore  README.md  README.en.md  AGENTS.md  .ai/
```

`src/config/*` 里**必须保留的用户取值**：

- `siteConfig.ts`：`title` / `subtitle` / `site_url` / `description` / `themeColor` / `siteStartDate` /
  `timezone` / `pages.*` / `favicon`
- `profileConfig.ts`：`avatar` / `name` / `bio` / `links`
- `friendsConfig.ts`：全部友链
- `commentConfig.ts`：`type: "waline"` / `waline.serverURL`
- `backgroundWallpaper.ts`：壁纸路径与 credit
- `navBarConfig.ts`：自定义导航结构
- `sidebarConfig.ts`：四个定制组件条目
- `expressiveCodeConfig.ts` / `musicConfig.ts`：本地取值

### 设计令牌（容易被上游覆盖）

```text
src/styles/variables.styl   — 暗色 :root.dark 下的 --deep-text 覆盖（本地新增）
                              --on-primary（本地新增）
src/styles/main.css         — .card-base / .lqip-placeholder / 壁纸模式的卡片背景
```

`--deep-text` 的暗色覆盖丢了，漫展卡片标题、关于页标题在暗色下会变成深字压暗底、几乎看不见。

---

## 已知修正项（merge 后一般不需要，出问题再查）

merge 方式下这些多半会被自动合好；如果构建报错，按症状查：

| 症状 | 修法 |
|---|---|
| `CompilerError: Unexpected token` | `{...}` 表达式里的 HTML 注释要写成 `{/* … */}`。重点看 `src/pages/anime.astro`、`src/layouts/MainGridLayout.astro`、`src/components/layout/NavMenuPanel.astro` |
| `Unable to load the "local" icon set` | 裸图标名要加 set 前缀（`github` → `simple-icons:github`，`rss` → `fa7-solid:rss`） |
| `Cannot use assets with a binding in an assets-only Worker` | `wrangler.jsonc` 要保持 Workers Assets 最小配置：`name` / `compatibility_date: "2025-01-01"` / `compatibility_flags: ["nodejs_compat"]` / `assets.directory: "./dist"`；别加 KV / Images / D1 / assets binding |
| `Failed to resolve import "@/styles/pages/common.css"` | `src/styles/pages/common.css` 被删了，恢复它 |
| 目录滚动条 / TOC 行为不对 | `sidebarToc` 用 `hideOnNonPostPage: true`，不是 `showOnNonPostPage: false` |
| Waline 样式崩 | `src/components/comment/Waline.astro` 里 CDN `waline.css` 必须**先**加载、`waline-custom.css` **后**加载。自定义 CSS 是覆盖层，**不是**替代品，不能删 CDN 那条 |
| 页面头样式不对 | `astro.config.mjs` 的 astro-icon `include` 里要有 `"svg-spinners": ["*"]` |

另外：`Calendar.astro` 历史上被上游同步冲掉过一次构建期内联优化（现在走运行时
`fetch("/api/allPostMeta.json")`）。如果发现日历每次都要请求这个接口且想改回内联，属于**有意决策**，改完记在这里。

### 旧版结构 → 新版结构（无需确认，直接转换）

若上游已是新版目录/样式结构而本地还是旧的：先检测新版类名/路径是否与本地冲突
（`dynamic-page-header` 这类**带命名空间前缀**的名字**不算**冲突，要用精确类名判断）→
不冲突就直接转 → 有冲突先处理成新结构再合。

已完成的转换：`src/styles/pages/`（上游 6.16.8 也拆到了这个目录）。

---

## Rules

- **构建必须通过才能提交。** 只有 `pnpm build` 出 `[build] Complete!` 才 commit。
- **受保护清单逐项确认**（见上），有意外改动就停下来查，别硬提交。
- **不制造验证残留**：临时脚本、探针文件、合成用例、`*.bak` 一律放仓库外（`/tmp`），
  验证完连临时目录一起删。确实要在 `dist/` 造探针时，验证后立即 `rm -rf`，并确认 `git status` 干净。
- 不用 `sudo` 改系统配置，不动用户的 shell 配置。
- 优先相对路径。

### Auto-Upload Rule

任何操作（同步、加功能、改配置、更新内容、修 bug、重构等）完成后**必须 commit 并 push 到
`origin master`**，除非用户明确说「先别推 / 保持本地 / 不要提交」。

例外时只报告「改动仅在本地」，并明确指出未推送。

### 同步后检查清单

- [ ] 工作区干净时才开始；已打 `pre-sync-<日期>` tag
- [ ] 查过**真实 delta**（用上次同步的上游版本当基线），不是被提交数吓到
- [ ] merge 用 `--no-ff`，提交保留两个父提交
- [ ] 冲突用**正确的 base** 解（`git merge-file`，base = 上游上次同步到的版本）
- [ ] **核对过自动合并的文件**（上游没改过的文件必须逐字节等于本地）
- [ ] 上游的仓库文档与示例内容已删除（`.github/`、`docs/`、示例文章、示例项目、示例相册）
- [ ] `pnpm install` / `pnpm check` / `pnpm type-check` / `pnpm build` 全绿
- [ ] 受保护清单逐项 diff 检查通过
- [ ] 漫展模块 + 日历倒计时模块做过功能性回归（含切页后）
- [ ] 侧边栏四个定制组件都在且启用
- [ ] 验证残留已清理，`git status` 只剩本次同步的改动
- [ ] 已 commit 并 push 到 `origin master`
