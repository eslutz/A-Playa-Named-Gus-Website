# AGENTS.md

This file applies to the entire A Playa Named Gus Website repository.

## Purpose

This repository is the Eleventy source for the public A Playa Named Gus website at <https://gus.ericslutz.dev>.

## Shared Website Pattern

- Keep this site aligned with the PumpSync and Blockiverse VR website repositories.
- Use Eleventy with Nunjucks templates from `src/` and plain generated HTML/CSS in `_site/`.
- Keep shared page chrome, metadata, navigation, and footer behavior in `src/_includes/layouts/base.njk`.
- Keep site styling in the existing stylesheet path for this repo.
- Use the shared house typeface [Mona Sans](https://github.com/github/mona-sans) for body copy. Self-host it from `src/assets/fonts/` and declare it with `@font-face` plus a `preload` link; never load fonts from a CDN. It is SIL OFL 1.1 with a Reserved Font Name, so ship it unmodified and keep `src/assets/fonts/OFL.txt` beside it. Always keep a system-font fallback stack after the family name so text renders before the woff2 arrives. Declare only the axes the file actually has — weight and width, no slant.
- Keep public routes slash-normalized in links and canonical URLs.
- Do not add runtime JavaScript unless a concrete user-facing requirement needs it.
- Do not add visible App Store, TestFlight, or download links unless a real public URL exists.
- Do not publish literal support email addresses in README or AGENTS docs; state that email is secondary.
- Do not manually hard-wrap prose sentences in Markdown. Keep each sentence on one line and let the browser or editor wrap text.

## README Pattern

Keep `README.md` in this shared section order: title and public URL, Eleventy overview, `Site Structure`, `Routes`, `Support Intake`, `Local Development`, `Validation`, and `Deployment`.

## Local Development

Use `npm install` once, then `npm run start`. Open the local URL printed by Eleventy. Changes hot-reload.

## Validation

Run `npm test` before committing changes that affect source, routes, layout, metadata, or documentation.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, builds the site, and deploys `_site/` to GitHub Pages. The custom domain is emitted through `src/CNAME`.

## Repository-Specific Facts

- Public URL: <https://gus.ericslutz.dev>
- Custom domain file: `src/CNAME`
- Stylesheet: `src/styles.css`
- Font: `src/assets/fonts/MonaSans.woff2` with `src/assets/fonts/OFL.txt`
- Deployment workflow: `.github/workflows/deploy.yml`
- Validation command: `npm test`
- Required routes: `/`, `/support/`, `/privacy/`, `/accessibility/`, `/age-suitability/`
- Apple association files: `src/apple-app-site-association` and `src/.well-known/apple-app-site-association`
