# Personal Software Engineer Portfolio

A compact Astro portfolio prepared for a software engineer. The public site contains four primary sections: About, Projects, Writing, and Resume. Content is Markdown-driven, responsive, theme-aware, and safe to deploy at either a root domain or a subpath.

## Requirements

- Node.js 22.12.0 or newer
- npm

## Start locally

```bash
npm install
npm run dev
```

The default local URL is `http://localhost:4321`.

## Add your information

1. Replace the neutral identity values in `src/config/site.ts` and `src/content/bio.md`.
2. Add GitHub, LinkedIn, and email entries in `src/config/social.ts`.
3. Add project Markdown files under `src/content/projects/`.
4. Add technical writing under `src/content/writing/`.
5. Place your Resume at `public/resume.pdf`. The Resume page detects it automatically during the next build.

Project frontmatter supports:

```yaml
---
title: "Project name"
description: "What the project does and why it matters."
date: "2026-01-15"
tags:
  - "TypeScript"
repository_url: "https://github.com/you/project"
live_url: "https://project.example.com"
image: "images/project.png"
---
```

Writing frontmatter supports:

```yaml
---
title: "Article title"
date: "2026-01-15"
description: "A concise summary."
tags:
  - "Architecture"
image: "images/article.png"
---
```

## Deployment configuration

Copy `.env.example` to `.env` and update the values when the public URL is known:

```dotenv
SITE_URL=https://example.com
BASE_PATH=/
```

For a project page such as `username.github.io/my-portfolio`, use `BASE_PATH=/my-portfolio`.

## Commands

- `npm run dev` starts the development server.
- `npm run build` creates the static production build.
- `npm run preview` previews the production build.
- `node --test test/*.test.mjs` runs portfolio regression tests.

## Design and accessibility

The visual system is documented in `PRODUCT.md` and `DESIGN.md`. New UI must use the existing theme tokens, keep all component styling in `src/styles/global.css`, support keyboard focus and reduced motion, and meet WCAG AA contrast.

## Attribution

This project began from the MIT-licensed [Academic Portfolio Astro](https://github.com/rubzip/academic-portfolio-astro) template. The original license is retained in `LICENSE`.
