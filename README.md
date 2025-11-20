# Firefly 项目结构概览

## 核心架构
```
├── src/                  # 核心源码目录
│   ├── components/       # UI 组件库
│   │   ├── comment/      # 评论系统组件
│   │   ├── content/      # 内容展示组件
│   │   ├── layout/       # 页面布局组件
│   │   └── widget/       # 可复用小部件
│   ├── config/           # 配置文件集合
│   ├── layouts/          # 页面模板
│   ├── pages/            # 路由页面
│   └── styles/           # 样式资源
├── public/               # 静态资源目录
├── scripts/              # 构建/工具脚本
└── docs/                 # 文档资源
```

## 目录详解
### `src/` 核心源码
- **components/** 组件化UI体系
  - `comment/`: 支持多种评论系统(Giscus/Twikoo/Waline)
  - `content/`: 内容展示组件(PostCard/Profile)
  - `layout/`: 布局骨架(Navbar/SideBar/Footer)
  - `widget/`: 功能型小部件(MusicPlayer/Live2DWidget)

- **config/** 配置中心
  ```ts
  siteConfig.ts    // 站点基础配置
  commentConfig.ts // 评论系统配置
  pioConfig.ts     // Live2D模型配置
  ```

- **layouts/** 布局模板
  - `Layout.astro` 主布局模板
  - `MainGridLayout.astro` 网格布局

- **pages/** 路由定义
  - `posts/[...slug].astro` 动态博客路由
  - `timeline.astro` 时间轴页面

### `public/` 静态资源
- **pio/** Live2D模型资源
  - `models/spine/firefly/` 火萤姬模型素材
  - `static/spine-player.min.js` 模型播放器

- **scripts/** 工具脚本
  - `new-post.js` 新建博客工具
  - `theme-manager.js` 主题管理脚本

## 技术栈
- 基于 Astro 框架
- 使用 TypeScript 配置
- CSS 预处理器 Stylus
- 支持 Svelte 组件交互
