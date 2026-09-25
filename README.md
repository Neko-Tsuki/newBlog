# 尘尘落落格

> 在代码的世界里修行，在幻想的境界里生活。

个人博客站点，基于 [Firefly](https://github.com/CuteLeaf/Firefly) 主题构建。

- 线上地址：<https://blog.shika-mori.top>

## 技术栈

- **Astro 7** + **Svelte 5**
- Tailwind CSS v4
- Pagefind（站内搜索）
- pnpm（包管理，需 Node.js >= 22）

## 本地开发

```bash
pnpm install
pnpm dev      # http://localhost:4321
```

其他常用命令：

```bash
pnpm build    # 构建到 dist/
pnpm preview  # 本地预览构建产物
pnpm check    # Astro 诊断
```

## 构建与部署

```bash
pnpm build
```

产物输出到 `dist/`，是纯静态站点，可部署到任意静态托管平台。

## 说明

本仓库是**个人博客**，不是 Firefly 主题的开发分支。
主题本身的问题请前往上游仓库 <https://github.com/CuteLeaf/Firefly>。

本站的定制内容（文章、图片、漫展日程、样式覆盖等）及上游同步时的注意事项，
记录在 [`.ai/workflow.md`](.ai/workflow.md)。

## 许可

主题代码遵循上游 Firefly 的许可协议；本站的原创文章与图片版权归作者所有。
