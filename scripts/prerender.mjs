import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const templatePath = path.join(distDir, "index.html");

/** Maps each image under src/assets (as the server render writes it) to its hashed file in dist/assets. */
async function builtAssetPaths() {
  const entries = await fs.readdir(path.join(distDir, "assets"));
  const sources = await fs.readdir(path.join(rootDir, "src", "assets"));
  return sources.flatMap((source) => {
    const { name, ext } = path.parse(source);
    const built = entries.find((entry) => entry.startsWith(`${name}-`) && entry.endsWith(ext) && /^-[\w-]{8}$/.test(entry.slice(name.length, -ext.length)));
    return built ? [[`/src/assets/${source}`, `/assets/${built}`]] : [];
  });
}

const vite = await createServer({
  root: rootDir,
  appType: "custom",
  server: { middlewareMode: true },
  logLevel: "error",
});

try {
  const template = await fs.readFile(templatePath, "utf8");
  const { llmsFullTxt, llmsTxt, prerenderRoutes, render, sitemapXml } = await vite.ssrLoadModule("/src/prerender.tsx");
  const builtAssets = await builtAssetPaths();

  await Promise.all(
    prerenderRoutes.map(async (route) => {
      const { html, head, lang, dir } = render(route);
      const output = template
        .replace(/<html\s+lang="[^"]+"\s+dir="[^"]+">/, `<html lang="${lang}" dir="${dir}">`)
        .replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/, head)
        .replace('<div id="root"></div>', `<div id="root"${route.endsWith("/404") ? ' data-error-page="true"' : ""}>${html}</div>`);
      const finalOutput = builtAssets.reduce((page, [from, to]) => page.replaceAll(from, to), output);

      const routeDir = route === "/" ? distDir : path.join(distDir, route.replace(/^\//, ""));
      await fs.mkdir(routeDir, { recursive: true });
      await fs.writeFile(path.join(routeDir, "index.html"), finalOutput);

      if (route !== "/") {
        await fs.writeFile(path.join(distDir, `${route.replace(/^\//, "")}.html`), finalOutput);
      }

      console.log(`prerendered ${route}`);
    }),
  );

  await fs.writeFile(path.join(distDir, "sitemap.xml"), sitemapXml());
  console.log("generated sitemap.xml");
  await fs.writeFile(path.join(distDir, "llms.txt"), llmsTxt());
  console.log("generated llms.txt");
  await fs.writeFile(path.join(distDir, "llms-full.txt"), llmsFullTxt());
  console.log("generated llms-full.txt");
} finally {
  await vite.close();
}
