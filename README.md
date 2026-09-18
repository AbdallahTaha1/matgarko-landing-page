# Matgarko Landing Page

Landing page for **Matgarko | متجركو**, an Arabic ecommerce SaaS product for merchants in Egypt who want to create an online store quickly and affordably.

## Product Overview

Matgarko helps merchants start selling online without hiring a software company or waiting months for custom development. The site explains the product, pricing, setup steps, contact channels, privacy policy, and terms.

Core product message:

- Mobile-first, Arabic-first, built for solo merchants: launch and run an online store from a phone without technical experience.
- متجركو — اعمل متجرك وادِر شغلك كله من موبايلك.
- The native mobile app is coming soon to Google Play; do not add download links or a guaranteed release date until it is publicly available. Shared positioning and availability text lives in `src/data/positioning.ts`.
- Start free and pay only when you sell.
- Manage products, orders, customers, payment, and shipping from one dashboard.
- Designed for Arabic-speaking merchants and the Egyptian market, with a full English site under `/en`.

## Pricing

Pricing lives in one place, `src/data/pricing.ts`, and feeds the pricing pages, the home page preview, structured data, and the AI context files.

| Plan   | Monthly fee | Commission per completed order |
| ------ | ----------- | ------------------------------ |
| Free   | 0 EGP       | 2%                             |
| Growth | 499 EGP     | 0.5%                           |
| Pro    | 1,499 EGP   | 0%                             |

## Main Pages

- `/` - Home page
- `/solutions` - Product solutions and store management features
- `/getting-started` - Steps to create and prepare a store
- `/pricing` - Monthly pricing plans
- `/about` - About Matgarko
- `/contact` - WhatsApp, email, phone, and Facebook contact options
- `/integrations` - Integrations and app store information
- `/terms` - Terms and conditions
- `/privacy` - Privacy policy

## Contact Information

- WhatsApp / phone: `+20 108 031 2538`
- Email: `matgarko.help@gmail.com`
- Facebook: `https://www.facebook.com/matgarko2/`
- Signup: `https://matgarko.com/register` (English: `/en/register`)

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React icons

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Signup and analytics

The bilingual registration form stays on the landing domain through email verification and store provisioning. It calls `VITE_SIGNUP_API_URL` (default `https://signup.matgarko.com/api/signup/v1`) in the background. The merchant opens their store dashboard after setup. Deploy the backend API and catalog migration before publishing this frontend; see [the setup guide](docs/signup-and-analytics.md).

Tracking requires consent. GA4 uses `VITE_GA_MEASUREMENT_ID` for page visits, signup steps, and the completed `sign_up` event. Optional direct Google Ads tracking uses `VITE_GOOGLE_ADS_ID` and `VITE_GOOGLE_ADS_SIGNUP_LABEL`. Meta Pixel independently uses `VITE_META_PIXEL_ID` for route `PageView` events and `CompleteRegistration` after a verified store is ready. Meta automatic event configuration is disabled; no contact details are supplied for advanced matching. Values are public build-time configuration; rebuild after changes. Do not add duplicate Google or Meta tags to `index.html`, GTM, or another integration. See [measurement setup](docs/signup-and-analytics.md) for consent, verification, and limitations.

First and latest attributed sources are retained for up to 90 days after consent and sent with registration. The optional “How did you hear about us?” answer is stored separately. Declining analytics or leaving that question unanswered does not block signup. Registered-store sources appear in the main application's host dashboard; visit totals and traffic sources appear in GA4.

## Assets

Regenerate the social share image from `src/assets/logo.png` and the favicon/PWA icons from `src/assets/app-icon.png` (add `--icons-only` to regenerate only icons):

```bash
node scripts/generate-assets.mjs
```

## Deployment Notes

Deploy to Cloudflare Pages with the React (Vite) preset, production branch `main`, build command `npm run build`, output directory `dist`, and an empty root directory.

The build prerenders every public Arabic and English route to HTML. Serve those files directly so search crawlers can read the content without executing JavaScript. Cloudflare Pages automatically uses the generated `404.html` and `en/404.html` files to return localized HTTP 404 responses for unknown paths. No `_redirects` rules are needed for these responses; Cloudflare Pages does not support status 404 in that file. Do not restore a blanket `/* /index.html 200` rewrite: it turns nonexistent URLs into soft 404s.

## Search and AI discovery

Run `npm run build` followed by `npm run check:seo`. The audit checks the generated HTML, metadata, internal and breadcrumb links, image files, language alternates, sitemap, and AI summaries. It uses the installed Playwright Chromium browser; install it with `npx playwright install chromium` if needed. Run `npx playwright test` for browser navigation checks.

- Arabic and English pages have canonical URLs, reciprocal language alternates, and prerendered content. The sitemap contains only indexable pages and language alternates. It intentionally omits modification dates until genuine per-page update dates are maintained.
- FAQs, pricing, and guide text feed the HTML and the generated `llms.txt` / `llms-full.txt` files. These text files are supplementary references, not a requirement or guarantee for AI search inclusion.
- The wildcard rule in `robots.txt` permits public search crawlers, including AI search crawlers. Registration and error pages use `noindex` metadata. Crawlers must be able to fetch a page to see that directive.
- Keep structured data consistent with the visible content. Do not add ratings, legal company names, staffing numbers, or other company claims without evidence. Maintain comparison articles when competitors change their offerings.

After deployment:

1. Verify the domain in Google Search Console and Bing Webmaster Tools and submit `https://matgarko.com/sitemap.xml`.
2. Inspect the home, pricing, and a guide page in both languages. Confirm real URLs return 200, unknown URLs return 404, and the CDN does not challenge search crawlers. A local build cannot verify production firewall rules or indexing.
3. Optionally run `npm run submit:indexnow` after the updated pages and public verification key are live. Submission requests discovery; it does not guarantee indexing.
4. In GA4, inspect Traffic acquisition by Session source / medium to measure referrals, including AI services when they supply a referrer. This measures visits from answers, not every AI mention or recommendation. Connect Search Console for organic-search reporting.

Search and AI systems decide when to index, cite, and recommend a product. Clear, accurate content and accessible pages improve eligibility; they cannot guarantee recommendations.

References: [Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features), [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), and [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots).
