# Pricing update — 2026-09-28

## Agreed prices

| Plan | Monthly fee | Completed-order commission |
| --- | ---: | --- |
| البداية / Starter | 0 EGP | 2%, capped at 20 EGP per order |
| نمو / Growth | 499 EGP | 0.5%, capped at 5 EGP per order |
| احترافي / Pro | 1,499 EGP | 0% |

Starter has no expiring trial. Commission is calculated once per whole order on merchandise
after discounts, excluding shipping and tax. The cap is not a monthly cap. Monthly examples
assume identical order values; the real invoice sums each order's fee individually.

All plans expose the same implemented store tools: product, inventory and order management,
coupons and discounts, shipping areas/rates, cash on delivery and WhatsApp support. Placeholder
product limits, unlimited allowances, plan-specific custom domains, advanced reports and
priority support were removed from pricing cards. Growth and Pro retain all Starter tools.

## Scope

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
updated API. Verify the configured caps are 20 / 5 / 0 EGP. Old invoices keep their original
amounts and null cap. Refunds after invoicing require operator review. Coordinate backend,
admin, landing deployment and mobile release. Publishing the landing site does not deploy
the billing calculation, migration or mobile application; those require a separate rollout.

## Validation

- Landing build, ESLint and SEO audit of 58 prerendered routes passed.
- 14 landing/browser/pricing checks passed; Arabic and English mobile layouts were inspected.
- Main application: 31 billing/API/migration checks and 31 invoice-math/calendar checks passed.
- Admin production build passed.
- Mobile: 10 billing tests and focused static analysis passed.
- At the local validation checkpoint, no live invoices or database migrations were changed.

## Landing publication scope

The requested publication covers the landing site only, through its Cloudflare Pages
production branch (`main`). Backend, admin and mobile changes remain outside this release.

Other work present in the sibling repositories was preserved.
