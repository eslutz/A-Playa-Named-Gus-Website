import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routes = [
  "index.html",
  "support/index.html",
  "privacy/index.html",
  "accessibility/index.html",
  "age-suitability/index.html",
];

test("Mona Sans is self-hosted, licensed, and preloaded on every route", async () => {
  // The house typeface has been silently dropped from a sibling site before,
  // by a cleanup that removed a font name nothing had recorded as intentional.
  // This test is the guard against the same thing happening here.
  for (const route of routes) {
    const html = await readFile(`_site/${route}`, "utf8");
    assert.match(
      html,
      /<link rel="preload" href="\/assets\/fonts\/MonaSans\.woff2" as="font" type="font\/woff2" crossorigin>/,
      `${route} should preload MonaSans.woff2`,
    );
  }

  const css = await readFile("_site/styles.css", "utf8");
  assert.match(css, /@font-face\s*\{[^}]*font-family: "Mona Sans"/, "Mona Sans should be declared");
  assert.match(css, /font-display: swap/, "the webfont should not block first paint");
  assert.match(css, /font-family: "Mona Sans", ui-sans-serif/, "the system fallback stack should follow the family name");

  // The file has weight and width axes but no slant axis, so declaring a
  // font-style range would describe a face that does not exist.
  assert.match(css, /@font-face[^}]*font-stretch: 75% 125%/, "the width axis should be declared");
  assert.doesNotMatch(css, /@font-face[^}]*font-style:/, "no font-style range: the file has no slant axis");

  // Self-hosted, not a CDN: keeps the site free of third-party requests.
  assert.doesNotMatch(css, /url\(\s*["']?https?:/, "fonts must be self-hosted");

  const font = await readFile("_site/assets/fonts/MonaSans.woff2");
  assert.ok(font.length > 0, "MonaSans.woff2 should be published");

  // SIL OFL 1.1 requires the notice to travel with any redistribution.
  const license = await readFile("_site/assets/fonts/OFL.txt", "utf8");
  assert.match(license, /Reserved Font Name "Mona Sans"/);
});
