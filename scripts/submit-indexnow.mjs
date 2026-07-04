import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const siteUrl = (process.env.SITE_URL || "https://matgarko.com").replace(/\/$/, "");
const host = new URL(siteUrl).host;
const key = process.env.INDEXNOW_KEY || "43d1ff6a773e42bb8740f69cc3a723b6";
const keyLocation = `${siteUrl}/${key}.txt`;
const sitemapPath = process.env.SITEMAP_PATH || path.join(rootDir, "dist", "sitemap.xml");

const sitemap = await fs.readFile(sitemapPath, "utf8");
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

if (urlList.length === 0) {
  throw new Error(`No URLs found in ${sitemapPath}`);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify({
    host,
    key,
    keyLocation,
    urlList,
  }),
});

if (!response.ok) {
  const body = await response.text();
  throw new Error(`IndexNow submission failed with ${response.status}: ${body}`);
}

console.log(`Submitted ${urlList.length} URLs to IndexNow for ${host}`);
