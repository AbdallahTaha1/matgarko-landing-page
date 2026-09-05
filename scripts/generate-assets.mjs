// Generates the social share image and PWA icons from the brand logo.
// Run: node scripts/generate-assets.mjs
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const logoPath = path.join(rootDir, "src", "assets", "logo.png");

const BRAND_DARK = "#0b1220";
const BRAND_GREEN = "#059669";

async function generateIcons() {
  const sizes = [
    { name: "icon-192.png", size: 192 },
    { name: "icon-512.png", size: 512 },
    { name: "apple-touch-icon.png", size: 180 },
  ];

  for (const { name, size } of sizes) {
    await sharp(logoPath)
      .resize(size, size, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .flatten({ background: "#ffffff" })
      .png()
      .toFile(path.join(publicDir, name));
    console.log(`generated ${name}`);
  }
}

async function generateOgImage() {
  const width = 1200;
  const height = 630;

  const background = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${BRAND_DARK}" />
          <stop offset="1" stop-color="#0f2a24" />
        </linearGradient>
        <radialGradient id="glow" cx="0.85" cy="0.15" r="0.6">
          <stop offset="0" stop-color="${BRAND_GREEN}" stop-opacity="0.55" />
          <stop offset="1" stop-color="${BRAND_GREEN}" stop-opacity="0" />
        </radialGradient>
        <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" fill="none" stroke="#ffffff" stroke-opacity="0.06" />
        </pattern>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bg)" />
      <rect width="${width}" height="${height}" fill="url(#grid)" />
      <rect width="${width}" height="${height}" fill="url(#glow)" />

      <!-- Phone storefront mock -->
      <rect x="820" y="90" width="270" height="520" rx="40" fill="#111827" />
      <rect x="832" y="102" width="246" height="496" rx="30" fill="#ffffff" />
      <rect x="856" y="130" width="90" height="14" rx="7" fill="#111827" />
      <rect x="856" y="152" width="60" height="9" rx="4.5" fill="#94a3b8" />
      <rect x="856" y="184" width="198" height="60" rx="14" fill="${BRAND_GREEN}" />
      <rect x="872" y="204" width="110" height="10" rx="5" fill="#ffffff" fill-opacity="0.9" />
      <rect x="856" y="262" width="93" height="112" rx="14" fill="#ecfdf5" />
      <rect x="961" y="262" width="93" height="112" rx="14" fill="#fff7ed" />
      <rect x="856" y="388" width="93" height="112" rx="14" fill="#eff6ff" />
      <rect x="961" y="388" width="93" height="112" rx="14" fill="#fdf2f8" />
      <rect x="866" y="344" width="50" height="8" rx="4" fill="#047857" />
      <rect x="971" y="344" width="50" height="8" rx="4" fill="#047857" />
      <rect x="866" y="470" width="50" height="8" rx="4" fill="#047857" />
      <rect x="971" y="470" width="50" height="8" rx="4" fill="#047857" />
      <rect x="856" y="520" width="198" height="46" rx="14" fill="#111827" />

      <!-- Floating order card -->
      <rect x="700" y="150" width="230" height="86" rx="18" fill="#ffffff" />
      <rect x="716" y="168" width="36" height="36" rx="10" fill="#d1fae5" />
      <rect x="764" y="172" width="120" height="12" rx="6" fill="#111827" />
      <rect x="764" y="192" width="80" height="9" rx="4.5" fill="#94a3b8" />
      <rect x="716" y="214" width="198" height="6" rx="3" fill="#e5e7eb" />

      <!-- Copy (Latin, rendered reliably on every build machine) -->
      <text x="80" y="200" fill="#a7f3d0" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" letter-spacing="2">MATGARKO</text>
      <text x="80" y="290" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="66" font-weight="700">Create your</text>
      <text x="80" y="370" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="66" font-weight="700">online store in Egypt</text>
      <text x="80" y="430" fill="#cbd5e1" font-family="Arial, Helvetica, sans-serif" font-size="30">Start free. Pay 2% only when you sell.</text>
      <rect x="80" y="480" width="330" height="64" rx="18" fill="${BRAND_GREEN}" />
      <text x="245" y="522" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" text-anchor="middle">matgarko.com</text>
    </svg>
  `;

  const logo = await sharp(logoPath).resize(120, 120, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();

  await sharp(Buffer.from(background))
    .composite([{ input: logo, left: 80, top: 60 }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, "og-image.png"));

  console.log("generated og-image.png");
}

await fs.mkdir(publicDir, { recursive: true });
await generateIcons();
await generateOgImage();
