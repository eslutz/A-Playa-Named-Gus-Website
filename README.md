# A Playa Named Gus Website

Static public website for A Playa Named Gus at `https://gus.ericslutz.dev`.

The site is built with [Eleventy](https://www.11ty.dev/) from Nunjucks templates in `src/`,
so the shared header, footer, and metadata live in a single layout
(`src/_includes/layouts/base.njk`). The output is plain HTML and CSS with no runtime
JavaScript.

The visual theme follows the app docs' Winter Chill palette:
`#0B2E33`, `#B8E3E9`, `#4F7C82`, and `#93B1B5`, set in
[Mona Sans](https://github.com/github/mona-sans). The website mark in
`src/assets/gus-mark.svg` is a placeholder until the app icon direction is finalized in
the main app repository.

## Routes

- `/` - Marketing URL
- `/support` - App Store support URL
- `/privacy` - App Store privacy policy URL
- `/accessibility` - Accessibility disclosure URL
- `/age-suitability` - App Review age-suitability context

## Support Intake

GitHub Issues are the primary support route. Email fallback is
`support@ericslutz.dev`; mail links include the subject `GUS SUPPORT`.

## Local Preview

```sh
npm install
npm start
```

Then open `http://localhost:8080`. Changes hot-reload.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site with
Eleventy and deploys `_site/` to GitHub Pages. The custom domain `gus.ericslutz.dev` is
configured in the repository's Pages settings (`src/CNAME` is included in the build
output).
