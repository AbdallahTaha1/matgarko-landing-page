import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const templatePath = path.join(distDir, "index.html");

async function findBuiltLogoPath() {
  const assetsDir = path.join(distDir, "assets");
  const entries = await fs.readdir(assetsDir);
  const logoFile = entries.find((entry) => /^logo-.*\.png$/.test(entry));

  return logoFile ? `/assets/${logoFile}` : "/src/assets/logo.png";
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
  const builtLogoPath = await findBuiltLogoPath();

  await Promise.all(
    prerenderRoutes.map(async (route) => {
      const { html, head, lang, dir } = render(route);
      const output = template
        .replace(/<html\s+lang="[^"]+"\s+dir="[^"]+">/, `<html lang="${lang}" dir="${dir}">`)
        .replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/, head)
        .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
        .replaceAll("/src/assets/logo.png", builtLogoPath);

      const routeDir = route === "/" ? distDir : path.join(distDir, route.replace(/^\//, ""));
      await fs.mkdir(routeDir, { recursive: true });
      await fs.writeFile(path.join(routeDir, "index.html"), output);

      if (route !== "/") {
        await fs.writeFile(path.join(distDir, `${route.replace(/^\//, "")}.html`), output);
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
