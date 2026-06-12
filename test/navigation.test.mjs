import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectUrl = "https://github.com/eslutz/A-Playa-Named-Gus";
const page = await readFile("_site/index.html", "utf8");

function linksFrom(block) {
  return Array.from(block.matchAll(/<a\s+[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gs), ([, href, label]) => ({
    href,
    label: label.replace(/<[^>]+>/g, "").trim(),
  }));
}

function requiredBlock(pattern, label) {
  const match = page.match(pattern);
  assert.ok(match, `${label} should render`);
  return match[1];
}

test("main navigation matches the project support link set", () => {
  const nav = requiredBlock(/<div class="nav-links">([\s\S]*?)<\/div>/, "main navigation links");

  assert.deepEqual(linksFrom(nav), [
    { href: "/privacy", label: "Privacy" },
    { href: "/support", label: "Support" },
    { href: `${projectUrl}/discussions`, label: "Discussions" },
    { href: `${projectUrl}/wiki`, label: "Wiki" },
  ]);
});

test("footer project links include the main issue tracker", () => {
  const projectLinks = requiredBlock(
    /<nav class="footer-group" aria-label="Project links">([\s\S]*?)<\/nav>/,
    "footer project links",
  );

  assert.deepEqual(linksFrom(projectLinks), [
    { href: projectUrl, label: "GitHub" },
    { href: `${projectUrl}/wiki`, label: "Wiki" },
    { href: `${projectUrl}/discussions`, label: "Discussions" },
    { href: `${projectUrl}/issues`, label: "Issues" },
  ]);
});
