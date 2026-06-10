# A Playa Named Gus Website

Static public website for A Playa Named Gus at `https://gus.ericslutz.dev`.

The site is intentionally plain HTML and CSS so GitHub Pages can host it without a build
pipeline, runtime dependency updates, or cloud app infrastructure.

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
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Deployment

GitHub Pages serves from the `main` branch root. `CNAME` pins the custom domain to
`gus.ericslutz.dev`.
