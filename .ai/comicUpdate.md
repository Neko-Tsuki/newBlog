---
name: update-comic-events
description: 更新「漫展日程」页面的活动条目。当用户提供漫展/展会信息（名称、日期、城市、场馆、票价、封面等）并要求添加、修改或删除漫展条目时使用。用户只需给出条目内容，本 skill 负责写入 src/data/comicEvents.ts、处理封面图占位、并构建验证。
---

# 更新漫展日程条目

## 用途

用户只提供活动条目（哪怕是不完整的自然语言），由本 skill 负责：
写入数据文件 → 处理封面图 → 构建验证 → 报告结果。

## 数据文件

```
src/data/comicEvents.ts          ← 只放数据，录入改这个
src/utils/comic-utils.ts         ← 派生逻辑，一般不用动
```

**`src/data/comicEvents.ts`**：导出 `rawComicEvents`（字面量数组，**不含 `status`**）与类型 `RawComicEvent`。除了活动条目，这个文件不放别的。

**`src/utils/comic-utils.ts`**：import 上面的数据再加工，导出页面用的东西：

- `comicEvents` —— 校验补齐 + 补上 `computeStatus()` 推导的 `status`
- `comicStats`（筛选栏徽标数字）、`comicCities`（城市筛选项）、`comicTags`
- `eventsByStatus()`、`daysToNearestEvent()`

这些**全部自动派生，改数据后无需手动同步**。消费者（`src/pages/comic-events.astro`、`src/components/widget/RecentComicEvent.astro`）都从 `@/utils/comic-utils` 引入。

## 字段

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | ✅ | 唯一标识，kebab-case，如 `bilibili-world-2026` |
| `title` | ✅ | 活动名称 |
| `cover` | ✅ | 封面图路径，见下方「封面图」 |
| `startDate` | ✅ | `YYYY-MM-DD`（**纯日期，不带时间与时区**） |
| `endDate` | ✅ | `YYYY-MM-DD`。单日活动与 `startDate` 相同 |
| `arriveDate` | ❌ | 赴约日期 `YYYY-MM-DD`。省略时自动回退为 `startDate` |
| `city` | ✅ | 城市，如 `杭州` / `上海`。决定城市筛选项 |
| `venue` | ✅ | 场馆名 |
| `tickets` | ✅ | `{ name, price }[]`，如 `[{ name: "普票", price: 78 }]` |
| `description` | ❌ | 描述（当前页面未渲染） |
| `tags` | ❌ | 标签数组（当前页面未渲染，但会汇总进 `comicTags`） |
| `noteUpcoming` | ❌ | 侧边栏「最近漫展」文案，**活动未结束时**（含进行中）用。支持 `{days}` 占位符，= 距开展天数 |
| `noteEnded` | ❌ | 同上，**活动结束后**用。`{days}` = 距开展已过去的天数 |

> 两条 note 按 `computeStatus()` 的结果二选一，**不是**按天数正负判断。
> 对应字段留空则回退到组件内置的通用文案（「还有 X 天！」/「已经过去 X 天了！」）。
> 注意 `{days}` 是相对 `startDate` 算的：活动进行中时它表示「距开展已过几天」，
> 所以 `noteUpcoming` 里写「还有 {days} 天」在活动进行中会读起来别扭。

**不要手写 `status`** —— 它由 `computeStatus()` 按 `startDate`/`endDate` 与当前时间自动推导，手写会随日期失真。

## 用户最少需要提供什么

只要用户给出下面这些，其余可推断或追问：

```
名称：
开展日期：      （单日只给一个即可）
赴约日期：      （不给则自动回退为开展日）
城市：
场馆：
票价：          （如「普票78 / VIP128」）
侧边栏文案：    （可选，一条专属的吐槽/感想，支持 {days} 占位符）
```

缺 `id` 时按标题生成 kebab-case（中文可音译或用日期兜底，如 `event-2026-10-01`）。
缺 `arriveDate` 时默认取 `startDate`。

## 封面图

当前全部为 **1280×720 空白占位图**，位于：

```
public/assets/images/comic-events/<id>.webp
```

- 用户**没给图** → 生成一张空白占位图放到该路径，`cover` 写 `/assets/images/comic-events/<id>.webp`。
  用仓库已有的 `sharp` 生成（脚本必须放在项目目录内，放 `/tmp` 会解析不到 sharp）：

  ```js
  import sharp from "sharp";
  await sharp({ create: { width: 1280, height: 720, channels: 3, background: { r: 212, g: 212, b: 212 } } })
    .webp({ quality: 80 })
    .toFile("public/assets/images/comic-events/<id>.webp");
  ```

- 用户**给了图** → 建议保持 **16:9**（卡片按 `aspect-ratio: 16/9` + `object-fit: cover` 裁剪，比例不符会裁掉边缘）。
  放进 `public/assets/images/comic-events/` 并让 `cover` 指向它。
- 换真图时**直接覆盖同名文件即可，无需改代码**。

## 步骤

1. 读 `src/data/comicEvents.ts`，确认当前条目与 `id` 是否重复。
2. 按上表补全字段；向用户追问缺失的必填项（一次问全，别逐条问）。
3. 把新条目追加到 `rawComicEvents` 数组末尾（**不写 `status`**）。
4. 处理封面图（见上）。
5. 校验：

   ```bash
   pnpm astro sync && pnpm check      # 0 errors
   pnpm build                          # 必须通过
   ```

6. 构建后核对产物，确认数据真的进去了：

   ```bash
   grep -oE '(本年|本月|本周|今日)还剩 [0-9]+ (天|小时)' dist/comic-events/index.html
   grep -o 'class="event-card"' dist/comic-events/index.html | wc -l   # 应等于条目总数
   grep -oE 'class="filter-badge"[^>]*>[0-9]+' dist/comic-events/index.html  # 全部/即将到来/进行中/已结束
   ```

   侧边栏「最近漫展」会自动取**距当前最近**的一场（`daysToNearestEvent()`），无需手动指定。

7. 报告：加了哪条、`id` 是什么、封面是占位图还是真图、构建结果。

## 注意事项

- **新条目会自动归入正确的分区**：页面按状态分为「即将到来」「正在进行中」「完结撒花」三个分区，由日期自动推导，不需要手动指定分区，空分区不会渲染。
- 日期是**纯日期**，`new Date("2026-08-15")` 解析为 UTC 零点。`computeStatus()` 对单日活动（`startDate === endDate`）的「进行中」窗口是零宽的，即当天会直接判为 `已结束` —— 这是既有行为，不要"顺手修"，除非用户明确要求。
- 卡片标签用「**赴约：**」，分区标题用「**正在进行中**」，与参考站点 <https://qwq.sigrika.cc/> 对齐。
- 筛选栏的「全部/即将到来/进行中/已结束」徽标数字来自 `comicStats`，自动更新。
- 侧边栏组件的自动轮播在系统开启「减少动态效果」时整体停用。
- 代码风格：Biome 强制 **tab 缩进 + 双引号**。
- `src/data/comicEvents.ts` 在 `.ai/workflow.md` 中列为**受上游同步保护**的文件，同步 Firefly 时不得被覆盖。
