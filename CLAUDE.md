# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm install          # install Eleventy (one-time)
npm start            # local dev server at http://localhost:8080 with hot reload
npm run build        # production build to _site/
npm test             # production build plus static navigation/footer assertions
```

## Deployment

Push to `main`. GitHub Actions (`.github/workflows/deploy.yml`) builds with Eleventy and deploys `_site/` to GitHub Pages via `actions/deploy-pages`. The Pages source must be set to **GitHub Actions** in repository Settings → Pages.

> **First-time setup**: Go to the repo Settings → Pages → Source → select **GitHub Actions**, then push to trigger the first deploy.

`CNAME` in `src/` pins the custom domain to `gus.ericslutz.dev`.

## Architecture

Eleventy (11ty) SSG with Nunjucks templates. Source lives in `src/`, built output goes to `_site/` (gitignored). GitHub Actions deploys `_site/` as a plain HTML site — no runtime JS, no framework.

**Single layout** — `src/_includes/layouts/base.njk` is the only template. It renders the shared `<head>`, header, footer, and `{{ content | safe }}` slot. Every page front matter must include:

```yaml
layout: layouts/base.njk
title: "Page Title - A Playa Named Gus"
description: "Page description for meta and OG tags."
canonical: "https://gus.ericslutz.dev/path"  # omit on 404
navCurrent: "support"  # matches one of: home | support | privacy | accessibility | age-suitability
```

The `navCurrent` value drives `aria-current="page"` on the matching header link when that page is in the header. Home page uses `navCurrent: "home"` which sets it on the brand link instead. Accessibility and age-suitability pages remain routable policy pages, but they are footer-only and do not have a current-state header link.

**Routing** follows a directory convention: each route is a folder with an `index.njk` (`/support` → `src/support/index.njk`). Exception: `src/404.njk` uses `permalink: /404.html`.

## Design tokens

CSS custom properties in `src/styles.css` inside `@layer tokens`. Dark mode `:root` overrides are colocated in the same layer.

| Token | Light | Dark |
|---|---|---|
| `--brand-base` | `#0b2e33` | (same) |
| `--ice` | `#b8e3e9` | (same) |
| `--teal-mid` | `#4f7c82` | (same) |
| `--mist` | `#93b1b5` | (same) |
| `--ink` | `#102326` | `#eef8f9` |
| `--muted` | `#53676b` | `#a6b9bd` |
| `--paper` | `#ffffff` | `#061a1e` |

Spacing scale: `--space-xs` (7px) · `--space-sm` (14px) · `--space-md` (22px) · `--space-lg` (32px) · `--space-xl` (48px) · `--space-2xl` (72px)

## CSS layer structure (`src/styles.css`)

```
@font-face               Mona Sans variable font (src/assets/fonts/MonaSans.woff2)
@layer tokens            :root color + spacing tokens; dark mode :root override colocated here
@layer reset             *, html, body, a, focus styles, prefers-reduced-motion
@layer layout            site-header, nav, hero, sections, footer-groups
@layer components        buttons, device mockup, feature/callout/content grids, faq, side-panel
(unlayered)              Responsive media queries: 820px, 821–1100px, 520px
(unlayered)              Dark mode component overrides
```

Unlayered rules (responsive + dark component overrides) take precedence over all `@layer` rules.

## Responsive breakpoints

- `max-width: 820px` — stacks hero, collapses nav, footer goes to 2-column grid
- `max-width: 520px` — footer collapses to single column, tighter padding, font-size 16px
- `min-width: 821px and max-width: 1100px` — intermediate hero/icon sizing

Max content width is `1120px` on all layout containers.

## Key CSS patterns

- `.button` / `.button.primary` / `.button.secondary` — the three CTA styles
- `.content-grid` — two-column layout (main + `.side-panel` aside) on inner pages
- `.footer-groups` — 4-column footer grid at desktop, 2×2 at ≤820px, single column at ≤520px
- `aria-current="page"` on header links styles the active page indicator when the current page has a local header link

## Font

Mona Sans variable font (weight 200–900, width + optical size axes). Hosted locally at `src/assets/fonts/MonaSans.woff2`. Hero headings use `font-variation-settings: "wdth" 110` for a slightly wider display cut.
