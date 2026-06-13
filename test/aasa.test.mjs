import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const expectedAasa = {
  applinks: {
    details: [
      {
        appIDs: ["QS3GC3CT43.dev.ericslutz.gus"],
        components: [
          {
            "/": "/item/*",
            comment: "Open a Jellyfin item detail surface in Gus.",
          },
          {
            "/": "/play/*",
            comment: "Start playback for a Jellyfin item in Gus.",
          },
        ],
      },
    ],
  },
};

async function readJson(path) {
  const body = await readFile(path, "utf8");
  return JSON.parse(body);
}

test("publishes the Apple App Site Association file at both Apple-supported paths", async () => {
  const wellKnownAasa = await readJson("_site/.well-known/apple-app-site-association");
  const rootAasa = await readJson("_site/apple-app-site-association");

  assert.deepEqual(wellKnownAasa, expectedAasa);
  assert.deepEqual(rootAasa, expectedAasa);
});
