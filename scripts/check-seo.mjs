import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const sitemap = await fs.readFile(path.join(dist, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]));
assert(urls.length > 0, 'Sitemap is empty');
assert.equal(new Set(urls.map(String)).size, urls.length, 'Duplicate sitemap URLs');
assert(!sitemap.includes('<lastmod>'), 'Do not claim a new modification date on every build');
const origin = urls[0].origin;
const routes = new Set([...urls.map((url) => url.pathname), '/register', '/en/register', '/login', '/en/login', '/404', '/en/404']);
const browser = await chromium.launch();
const page = await browser.newPage();
const titles = new Set();

try {
  for (const route of routes) {
    const html = await fs.readFile(path.join(dist, route.slice(1), 'index.html'), 'utf8');
    // Parse the actual generated HTML without executing scripts or contacting analytics.
    const data = await page.evaluate((source) => {
      const doc = new DOMParser().parseFromString(source, 'text/html');
      return {
        title: doc.title,
        description: doc.querySelector('meta[name="description"]')?.content,
        robots: doc.querySelector('meta[name="robots"]')?.content,
        canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        headings: [...doc.querySelectorAll('h1')].map((el) => el.textContent),
        lang: doc.documentElement.lang,
        links: [...doc.querySelectorAll('a[href]')].map((el) => el.getAttribute('href')),
        alternates: [...doc.querySelectorAll('link[hreflang]')].map((el) => el.getAttribute('href')),
        schemas: [...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap((el) => JSON.parse(el.textContent)),
        images: [...doc.querySelectorAll('img')].map((el) => ({ src: el.getAttribute('src'), alt: el.getAttribute('alt') })),
      };
    }, html);
    const noindex = /\/(register|login|404)$/.test(route);
    assert(data.title && data.description, `${route}: missing title or description`);
    assert(!titles.has(data.title), `${route}: duplicate title`);
    titles.add(data.title);
    assert.equal(data.headings.length, 1, `${route}: expected one visible-content H1`);
    assert.equal(data.canonical, new URL(route, origin).href, `${route}: wrong canonical`);
    assert.equal(data.lang, /^\/en(?:\/|$)/.test(route) ? 'en' : 'ar', `${route}: wrong language`);
    assert.equal(data.robots.startsWith('noindex'), noindex, `${route}: wrong indexing policy`);
    for (const href of [...data.links, ...data.alternates]) {
      const url = new URL(href, new URL(route, origin));
      if (url.origin !== origin) continue;
      const target = url.pathname.replace(/\/$/, '') || '/';
      assert(routes.has(target), `${route}: broken internal link ${href}`);
    }
    for (const schema of data.schemas) {
      if (schema['@type'] === 'BreadcrumbList') {
        for (const item of schema.itemListElement) {
          assert(routes.has(new URL(item.item).pathname), `${route}: broken breadcrumb ${item.item}`);
        }
      }
      if (schema['@type'] === 'Organization') {
        assert(!schema.legalName && !schema.foundingDate && !schema.numberOfEmployees, `${route}: unverified company claims`);
      }
    }
    for (const image of data.images) {
      assert(image.alt !== null, `${route}: image missing alt text`);
      if (image.src?.startsWith('/')) await fs.access(path.join(dist, image.src.slice(1)));
    }
  }
  for (const file of ['llms.txt', 'llms-full.txt']) {
    const text = await fs.readFile(path.join(dist, file), 'utf8');
    assert(text.includes(`${origin}/en/pricing`), `${file}: missing English pricing`);
    for (const match of text.matchAll(/\]\((https?:\/\/[^)]+)\)/g)) {
      const url = new URL(match[1]);
      if (url.origin === origin) await fs.access(path.join(dist, url.pathname.slice(1)));
    }
  }
  const full = await fs.readFile(path.join(dist, 'llms-full.txt'), 'utf8');
  assert(full.includes('## Frequently Asked Questions'), 'Missing FAQ text for retrieval');
  assert(!urls.some((url) => /\/(register|login|404)$/.test(url.pathname)), 'Private/error route in sitemap');
  assert(sitemap.includes('xhtml:link'), 'Missing sitemap language alternates');
  console.log(`SEO audit passed: ${routes.size} prerendered pages; metadata, HTML content, links, images, schemas, sitemap, and AI summaries.`);
} finally {
  await browser.close();
}
