# A Playa Named Gus Website

Static public website for A Playa Named Gus at <https://gus.ericslutz.dev>.

The site is built with [Eleventy](https://www.11ty.dev/) from Nunjucks templates in `src/`. Shared page chrome, navigation, footer links, and metadata live in `src/_includes/layouts/base.njk`. The output is plain HTML and CSS with no runtime JavaScript.

## Site Structure

- `src/index.njk` - home page.
- `src/_includes/layouts/base.njk` - shared layout, metadata, header, and footer.
- `src/styles.css` - site styling.
- `src/assets/gus-mark.svg` - website mark placeholder until the app icon direction is finalized.
- `src/assets/fonts/MonaSans.woff2` - Mona Sans web font.
- `src/CNAME` - GitHub Pages custom domain.
- `src/apple-app-site-association` and `src/.well-known/apple-app-site-association` - extensionless Apple association files.
- `src/robots.txt`, `src/sitemap.xml`, and `src/manifest.webmanifest` - search and app metadata.
- `.github/workflows/deploy.yml` - GitHub Pages deployment workflow.
- `test/` - rendered output checks.

## Routes

- `/` - product overview.
- `/support/` - App Store support URL.
- `/privacy/` - App Store privacy policy URL.
- `/accessibility/` - accessibility disclosure URL.
- `/age-suitability/` - App Review age-suitability context.

## Support Intake

GitHub Issues are the primary support route. Email is secondary.

## Local Development

```sh
npm install
npm run start
```

Then open the local URL printed by Eleventy. Changes hot-reload.

## Validation

```sh
npm test
```

The test command builds the site and verifies shared navigation, footer links, and Apple association file output.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site with Eleventy and deploys `_site/` to GitHub Pages. The custom domain `gus.ericslutz.dev` is configured in GitHub Pages and emitted through `src/CNAME`.
