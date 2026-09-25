# Chenchen Luoluo Ge

> Cultivating in the world of code, living in the realm of fantasy.

A personal blog built on the [Firefly](https://github.com/CuteLeaf/Firefly) theme.

- Live site: <https://blog.shika-mori.top>

## Tech Stack

- **Astro 7** + **Svelte 5**
- Tailwind CSS v4
- Pagefind (site search)
- pnpm (requires Node.js >= 22)

## Local Development

```bash
pnpm install
pnpm dev      # http://localhost:4321
```

Other commands:

```bash
pnpm build    # build into dist/
pnpm preview  # preview the production build
pnpm check    # Astro diagnostics
```

## Build & Deploy

```bash
pnpm build
```

The output goes to `dist/` — a purely static site, deployable to any static host.

## Notes

This repository is a **personal blog**, not a development branch of the Firefly theme.
For issues with the theme itself, please go to the upstream repository
<https://github.com/CuteLeaf/Firefly>.

Content specific to this site (posts, images, comic event schedule, style overrides)
and notes for upstream syncs are documented in [`.ai/workflow.md`](.ai/workflow.md).

## License

The theme code follows the upstream Firefly license; original posts and images on this
site are copyright their author.
