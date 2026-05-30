# Matgarko Landing Page

Landing page for **Matgarko | متجركو**, an Arabic ecommerce SaaS product for merchants in Egypt who want to create an online store quickly and affordably.

## Product Overview

Matgarko helps merchants start selling online without hiring a software company or waiting months for custom development. The site explains the product, pricing, setup steps, contact channels, privacy policy, and terms.

Core product message:

- Create an online store in minutes.
- Start from an affordable monthly price.
- Try the platform with a limited-time free month.
- Manage products, orders, customers, payment, and shipping from one dashboard.
- Designed for Arabic-speaking merchants and the Egyptian market.

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
- Signup: `https://signup.matgarko.com/signup`

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

## Deployment Notes

The production build is generated in `dist/`.

The app is a single-page React site, so production hosting should route unknown paths back to `index.html`. An example nginx config is included in `nginx.conf`.
