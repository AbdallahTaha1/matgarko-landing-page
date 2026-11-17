# Matgarko Landing Page

Landing page for **Matgarko | متجركو**, an Arabic ecommerce SaaS product for merchants in Egypt who want to create an online store quickly and affordably.

## Product Overview

Matgarko helps merchants start selling online without hiring a software company or waiting months for custom development. The site explains the product, pricing, setup steps, contact channels, privacy policy, and terms.

Core product message:

- Mobile-first, Arabic-first, built for solo merchants: launch and run an online store from a phone without technical experience.
- متجركو — اعمل متجرك وادِر شغلك كله من موبايلك.
- `/download` and `/en/download` always link to the published [Google Play app](https://play.google.com/store/apps/details?id=com.matgarko.merchant). Direct APK availability is read from `https://downloads.matgarko.com/android/latest.json`; missing or invalid metadata never blocks the Google Play link or web-admin access. Shared marketing copy lives in `src/data/positioning.ts`, with no hardcoded release number. Deployment/runbook and app context live separately in the sibling mobile repository: `matgarko_merchant/docs/android-release-runbook.md`.
- Start free and pay only when you sell.
- Manage products, cash-on-delivery orders, and customers from one dashboard.
- Stores take cash on delivery, InstaPay or wallet transfers with a screenshot, and cards through the merchant's own Paymob or Kashier account. Merchants arrange shipping directly with their couriers; shipping-company integrations are not offered. Keep public copy focused on available features without adding unnecessary limitation notices.
- New stores get their first 20 orders free (`WELCOME_ORDERS` in `src/data/pricing.ts`); fees are then taken from a prepaid balance.
- Designed for Arabic-speaking merchants and the Egyptian market, with a full English site under `/en`.

## Pricing

Pricing lives in one place, `src/data/pricing.ts`, and feeds the pricing pages, the home page preview, structured data, and the AI context files.

| Plan    | Monthly fee | Commission per completed order |
| ------- | ----------- | ------------------------------ |
| Starter | 0 EGP       | 3 EGP per order                |
| Pro     | 2,000 EGP   | none                           |

The Growth plan was retired on 2026-10-23. The pricing page also has a cost calculator (`src/components/PricingCalculator.tsx`) that reads the same data.

Since 2026-11-07 the per-order fee is the same for every order whatever its value, and every order placed is billed except a fake one (flagged by the fake-order shield, then canceled) and orders the merchant records by hand. Stores outside Egypt pay $0.05 per order or $35 a month. All plans include the same current store tools and WhatsApp support; there are no advertised plan-specific product limits, reports or support priority. Starter has no expiring trial. Billing changes must be deployed in the main application alongside this pricing update.

## Main Pages

- `/` - Home page
- `/login` - Existing-store access, saved store link, and help finding a forgotten link (also `/en/login`)
- `/download` - Android downloads and browser dashboard access (also `/en/download`)
- `/solutions` - Product solutions and store management features
- `/getting-started` - Steps to create and prepare a store
- `/pricing` - Monthly pricing plans
- `/about` - About Matgarko
- `/contact` - WhatsApp, email, phone, and Facebook contact options
- `/integrations` - Cash on delivery and delivery prices
- `/terms` - Terms and conditions
- `/privacy` - Privacy policy

## Contact Information

- WhatsApp / phone: `+20 108 031 2538`
- Email: `support@matgarko.com`
- Facebook: `https://www.facebook.com/matgarko2/`
- Signup: `https://matgarko.com/register` (English: `/en/register`)

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React icons

## Look

The site wears the dashboard's colours: deep teal, teal-tinted greys and the orange button, in Noto Kufi Arabic. They are plain hex values in `src/index.css`, laid over Tailwind's `emerald`, `teal`, `gray` and `amber` names, so every page picks them up and no colour depends on `oklch()`. The font is served from the site itself in three fixed weights (400, 700, 800), not as a variable font and not from Google Fonts.

The home page (`src/pages/HomePage.tsx`, words in `src/data/home.ts`) runs: hero, real stores, «ما هي متجركو؟» with a fact sheet, tools, the fake-order shield, the six templates, three steps, prices, the EasyOrders table, questions, and a closing band where the visitor types the store link they want. The template pictures in `public/templates` are phone screenshots of the six demo stores, taken below the demo strip at 390 × 760 and saved 480 px wide.

## In-app browsers

Most visitors come from an ad and open the site inside the Facebook, Instagram or TikTok browser. So:

- The page is complete without scripts: the scroll reveal hides an element only after its observer is attached (`src/components/motion/Reveal.tsx`), and the fixed signup bar is added by script after load.
- The build targets older engines (`build.target` in `vite.config.ts`).
- The signup button is on the first screen of a 360 × 600 window, and nothing is wider than the screen. `tests/home-in-app-browsers.spec.ts` checks both with the three apps' user agents.
- `HOME_UPDATED` in `src/data/home.ts` is the day the home page's facts were last checked by hand; it shows in the fact sheet and in the page's structured data. Change it only when you recheck them.

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

The bilingual registration form stays on the landing domain through email verification and store provisioning. It calls `VITE_SIGNUP_API_URL` (default `https://signup.matgarko.com/api/signup/v1`) in the background. Once the store is ready, it saves the public store link in this browser and automatically opens the dashboard for normal sign-in. Returning merchants can use “Access your store” in the header, hero, registration form, or footer. Deploy the backend API and catalog migration before publishing this frontend; see [the setup guide](docs/signup-and-analytics.md).

Tracking requires consent. GA4 uses `VITE_GA_MEASUREMENT_ID` for page visits, signup steps, and the completed `sign_up` event. Optional direct Google Ads tracking uses `VITE_GOOGLE_ADS_ID` and `VITE_GOOGLE_ADS_SIGNUP_LABEL`. Meta Pixel independently uses `VITE_META_PIXEL_ID` for route `PageView` events and `CompleteRegistration` after a verified store is ready. Meta automatic event configuration is disabled; no contact details are supplied for advanced matching. Values are public build-time configuration; rebuild after changes. Do not add duplicate Google or Meta tags to `index.html`, GTM, or another integration. See [measurement setup](docs/signup-and-analytics.md) for consent, verification, and limitations.

First and latest attributed sources are retained for up to 90 days after consent and sent with registration. The optional “How did you hear about us?” answer is stored separately. Declining analytics or leaving that question unanswered does not block signup. Registered-store sources appear in the main application's host dashboard; visit totals and traffic sources appear in GA4.

## Assets

Regenerate the social share image from `src/assets/logo.png` and the favicon/PWA icons from `src/assets/app-icon.png` (add `--icons-only` to regenerate only icons):

```bash
node scripts/generate-assets.mjs
```

## Country Versions

Egypt is the main Arabic site at `/` (`ar-EG`); `/ar-eg` redirects there (`public/_redirects`). Saudi Arabia, the UAE, Kuwait, Qatar, Oman and Bahrain each have `/ar-xx`, `/ar-xx/pricing`, `/ar-xx/cod` and `/ar-xx/register` (which preselects the store country), in plain formal Arabic with dollar prices and their local-currency equivalent. Countries, currencies and the dollar prices live in `src/data/countries.ts`; the pages in `src/pages/country/`. Every version links to the others with hreflang, and `/ar-sa/compare/salla` compares Matgarko with Salla for Saudi merchants. `/answers` holds short standalone answers for search engines and AI assistants; they also feed `llms-full.txt` and FAQ structured data. Visits from AI assistants (ChatGPT, Perplexity, Gemini, Copilot, Claude and others) are recorded with medium `ai` in signup attribution.

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
