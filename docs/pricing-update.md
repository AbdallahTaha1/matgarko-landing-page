# Pricing update — 2026-11-10

Starter goes from 2 to 3 EGP per order; nothing else changes (fake orders flagged by the shield
and then canceled, and orders the merchant records by hand, stay free; Pro 2,000 EGP; stores
outside Egypt $0.05). Pro is now cheaper than Starter from the 667th order a month. At 3 EGP
Matgarko is no longer cheaper per order than EasyOrders ($0.04, about 2.24 EGP), so the site
stops saying so: the EasyOrders comparison now leads with free fake orders and Pro at about a
third of their $100 plan.

---

# Pricing update — 2026-11-07

No more percentage. Starter: 0 EGP/month + a flat 2 EGP per order, whatever the order's value.
Pro: 2,000 EGP/month (was 1,499), no per-order fee; Pro is cheaper than Starter above 1,000
orders a month (2,000 ÷ 2), and both cost the same at exactly 1,000. Stores outside Egypt are
billed in US dollars: Starter $0.05 per order (was 1% capped at $0.10), Pro $35/month (was $29);
the marketing site does not show dollar prices.

Every order placed in the store is billed, including ones later canceled or returned, except:
(a) fake orders, meaning orders the fake-order shield flagged when they were placed (duplicate, or
many orders from the same number) and that were then canceled, and (b) orders the merchant records
by hand from WhatsApp/phone with «طلب جديد». Headline: «2 ج.م على الطلب، والطلبات الوهمية ببلاش».

`src/data/pricing.ts` now models plans as `monthly` + `perOrderFee`; `monthlyCost` is
monthly + orders × fee, and `AVERAGE_ORDER_VALUE`, the commission cap and its helpers are gone.
The pricing page lost the cap bar chart (replaced by a "what is billed and what is free" section
with fixed examples), and the calculator only asks for monthly orders. Comparisons now quote
EasyOrders at $0.04 per order (≈2.24 EGP at 56 EGP/USD) on every order including canceled and fake
ones, and $100/month (≈5,600 EGP) for their high-volume plan. The share image (og-image.png) was
regenerated with the new line.

---

# Pricing update — 2026-10-23

Two plans only. Starter: 0 EGP/month, 1% of each completed order capped at 5 EGP (the cap is
reached at a 500 EGP order). Pro: 1,499 EGP/month, 0% commission. Growth (499 EGP + 0.5%, capped at
2.5 EGP) is removed from every page, comparison, FAQ, structured-data offer and AI context file.
For 700 EGP orders Pro becomes cheaper than Starter at 300 orders a month.

The pricing page was redesigned: two plan cards with the same two rows (monthly fee, commission),
a bar chart showing the per-order cap, a cost calculator with sliders for monthly orders and
average order value, a short examples table, FAQ and CTA. Numbers come from `src/data/pricing.ts`.
The backend change (retired Growth enum value kept for existing stores, Starter defaults 1% / 5 EGP,
Compose pinning) is described in the main application's `docs/platform-admin-and-billing.md`.
Deploy the backend terms and this landing change together.

---

# Pricing update — 2026-10-05

## Agreed prices

| Plan | Monthly fee | Completed-order commission |
| --- | ---: | --- |
| البداية / Starter | 0 EGP | 2%, capped at 10 EGP per order |
| نمو / Growth | 499 EGP | 0.5%, capped at 2.5 EGP per order |
| احترافي / Pro | 1,499 EGP | 0% |

Starter has no expiring trial. Commission is calculated once per whole order on merchandise
after discounts, excluding shipping and tax. The cap is not a monthly cap. Monthly examples
assume identical order values; the real invoice sums each order's fee individually.

All plans expose the same implemented store tools: product, inventory and order management,
coupons and discounts, shipping areas/rates, cash on delivery and WhatsApp support. Placeholder
product limits, unlimited allowances, plan-specific custom domains, advanced reports and
priority support were removed from pricing cards. Growth and Pro retain all Starter tools.

The launch-stage reduction on 2026-10-05 lowers the Starter cap to 10 EGP and the Growth
cap to 2.5 EGP, preserving the one-quarter ratio. Monthly fees and commission percentages
stay unchanged. Both caps are reached at an order value of 500 EGP. For orders worth
700 EGP each, Growth becomes cheaper at 67 orders; Growth and Pro tie at 400 orders,
and Pro becomes cheaper at 401 orders.

The related Shopify cost example also distinguishes manual cash-on-delivery from external
payment gateways, using the official pricing and manual-payment documentation reviewed on
2026-10-05: https://www.shopify.com/pricing and
https://help.shopify.com/en/manual/payments/manual-payments.

## Original implementation scope (2026-09-28)

- Landing: Arabic/English pricing cards, order examples, monthly comparison, FAQ, SEO/AI text,
  home preview and related comparison/article copy. EasyOrders numbers were checked against
  https://www.easyorders.eg/pricing/ (4 cents/order or USD 100/month) on 2026-09-28.
- Main application: per-order cap calculation; completed-order billing by first completion
  month; protection against charging legacy invoiced orders again; cap snapshot on invoices;
  API, admin, invoice email and legacy invoice pages.
- Mobile: optional cap display in the current plan and historical invoice details, with
  backward-compatible JSON parsing.

## Release requirement

Apply main-app catalog migration `20260928120000_AddInvoiceCommissionCap` before serving its
updated API. Verify the configured caps are 10 / 2.5 / 0 EGP. Old invoices keep their original
amounts and null cap. Refunds after invoicing require operator review. Coordinate backend,
admin, landing deployment and mobile release. Publishing the landing site does not deploy
the billing calculation, migration or mobile application; those require a separate rollout.

## Original implementation validation (2026-09-28)

- Landing build, ESLint and SEO audit of 58 prerendered routes passed.
- 14 landing/browser/pricing checks passed; Arabic and English mobile layouts were inspected.
- Main application: 31 billing/API/migration checks and 31 invoice-math/calendar checks passed.
- Admin production build passed.
- Mobile: 10 billing tests and focused static analysis passed.
- At the local validation checkpoint, no live invoices or database migrations were changed.

## Cap reduction validation (2026-10-05)

- Production build, ESLint and the SEO audit of 58 prerendered routes passed.
- All 14 pricing and landing checks passed, including both languages on mobile, fractional
  commission display, per-order caps and the updated upgrade thresholds.
- Generated pricing pages and AI summaries contain the new caps without the old limits.

## Landing publication scope

The requested publication covers the landing site only, through its Cloudflare Pages
production branch (`main`). Backend, admin and mobile changes remain outside this release.

Other work present in the sibling repositories was preserved.
