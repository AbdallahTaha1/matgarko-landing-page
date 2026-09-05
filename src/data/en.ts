import type { BlogArticle } from "./blog";

export type EnglishPageSection = {
  title: string;
  text: string;
  items?: string[];
};

export type EnglishPageContent = {
  kicker: string;
  title: string;
  lead: string;
  primaryCta?: string;
  secondaryCta?: string;
  sections: EnglishPageSection[];
};

export type EnglishIndustryContent = {
  slug: string;
  label: string;
  title: string;
  lead: string;
  proof: string;
  features: EnglishPageSection[];
};

export type EnglishComparisonContent = {
  slug: string;
  competitor: string;
  title: string;
  lead: string;
  verdict: string;
  rows: Array<{
    factor: string;
    matgarko: string;
    competitor: string;
  }>;
  bestFor: string[];
  watchouts: string[];
};

export type EnglishSeoEntry = {
  title: string;
  description: string;
  keywords: string[];
  type?: "website" | "article";
  noindex?: boolean;
};

export const englishFaqs = [
  {
    question: "Can I build the store myself?",
    answer:
      "Yes. Matgarko is made for merchants who want to launch without a developer. You choose the store name, add products, configure payment and shipping, then start receiving orders.",
  },
  {
    question: "Is Matgarko only for Egypt?",
    answer:
      "Matgarko is especially practical for Egypt and Arabic-speaking merchants because pricing is in EGP and the product is built around local selling workflows. English pages explain the platform for regional teams and international researchers.",
  },
  {
    question: "Do I need coding or hosting?",
    answer:
      "No. You do not need to buy hosting, install plugins, or manage servers. Matgarko gives you the storefront, dashboard, product tools, order management, and setup flow in one platform.",
  },
  {
    question: "Can I start before paying monthly?",
    answer:
      "Yes. The free plan lets you start with no monthly fee and pay a 2% commission on completed orders. Paid plans lower or remove the commission as your store grows.",
  },
  {
    question: "Does Matgarko support payment and shipping workflows?",
    answer:
      "You can prepare the payment and shipping settings that fit your business, including cash on delivery and local delivery pricing. Gateway fees, if any, are charged by the payment provider separately.",
  },
  {
    question: "Can I use my own domain?",
    answer:
      "You can start with a Matgarko store link, then connect a custom domain when your plan and store setup are ready for it.",
  },
];

export const englishSimplePages: Record<string, EnglishPageContent> = {
  solutions: {
    kicker: "Solutions",
    title: "Everything a small ecommerce team needs to run the store",
    lead:
      "Matgarko brings the storefront, product catalog, orders, customers, offers, and operating settings into one merchant-friendly platform.",
    primaryCta: "Start free",
    secondaryCta: "View integrations",
    sections: [
      {
        title: "Launch the storefront",
        text:
          "Create a branded store that works on mobile and desktop. Add categories, product pages, policies, and contact details without waiting for a custom development cycle.",
        items: ["Mobile-ready storefront", "Category and product pages", "Editable brand details"],
      },
      {
        title: "Manage products and stock",
        text:
          "Keep product names, images, prices, quantities, and descriptions organized so your team can sell with fewer manual mistakes.",
        items: ["Product catalog", "Inventory visibility", "Price and offer controls"],
      },
      {
        title: "Handle orders clearly",
        text:
          "Move from messages and spreadsheets to a structured order flow. Track customer details, delivery status, and order history from the dashboard.",
        items: ["Order tracking", "Customer records", "Operational notes"],
      },
      {
        title: "Grow without rebuilding",
        text:
          "Start with the essentials, then add templates, custom domain work, integrations, and lower-commission plans as your business grows.",
        items: ["Plans for different stages", "Custom domain path", "Support for growing catalogs"],
      },
    ],
  },
  integrations: {
    kicker: "Payment and shipping",
    title: "Prepare the workflows your customers expect in Egypt and MENA",
    lead:
      "Matgarko focuses on practical ecommerce operations: cash on delivery, payment setup, shipping zones, delivery fees, and store settings that are easy to manage.",
    primaryCta: "Create your store",
    secondaryCta: "Compare plans",
    sections: [
      {
        title: "Payment options",
        text:
          "Offer payment methods that match your audience. For many Egyptian stores, cash on delivery remains essential while digital payment options can be added as the business matures.",
        items: ["Cash on delivery", "Payment provider setup", "Clear checkout expectations"],
      },
      {
        title: "Shipping zones and fees",
        text:
          "Define delivery areas, shipping prices, and rules so customers know what to expect before placing the order.",
        items: ["Delivery zones", "Shipping prices", "Operational notes for fulfillment"],
      },
      {
        title: "Marketing and analytics readiness",
        text:
          "Use clean product pages, campaign-ready links, and clear store content so your ads, social posts, and search visibility point to a reliable buying experience.",
        items: ["Campaign-friendly URLs", "Product landing pages", "Conversion-focused copy"],
      },
      {
        title: "Local support context",
        text:
          "The platform is built for merchants who operate in Arabic-first markets and need practical setup help, not a generic global tool that assumes a technical team.",
      },
    ],
  },
  themes: {
    kicker: "Store themes",
    title: "Start from a storefront layout that already fits your business category",
    lead:
      "Use ready-made store structures for product-led businesses, then adjust colors, content, products, and page sections around your brand.",
    primaryCta: "Start with a template",
    secondaryCta: "Explore store types",
    sections: [
      {
        title: "Designed for fast decisions",
        text:
          "Templates should help shoppers understand the product, price, delivery promise, and next step without friction.",
        items: ["Clear product grids", "Mobile-first sections", "Prominent contact and order actions"],
      },
      {
        title: "Useful for real categories",
        text:
          "Restaurants, clothing stores, electronics sellers, beauty brands, and furniture businesses each need different product details and buying cues.",
        items: ["Food menus", "Size and color choices", "Specifications and product details"],
      },
      {
        title: "Brand controls",
        text:
          "Adjust the storefront around your own business name, logo, colors, catalog, and content so the store feels owned by your brand.",
      },
    ],
  },
  "getting-started": {
    kicker: "Getting started",
    title: "From store idea to first order in a clear launch path",
    lead:
      "Use this practical sequence to prepare your store, publish products, and avoid the common mistakes that slow down new ecommerce projects.",
    primaryCta: "Start your store",
    secondaryCta: "Read the launch guide",
    sections: [
      {
        title: "1. Define what you sell",
        text:
          "Start with a focused product list, clear pricing, and a simple promise. A tight first catalog is easier to manage and market than hundreds of untested products.",
        items: ["Choose the first product group", "Prepare prices and stock", "Write customer-friendly descriptions"],
      },
      {
        title: "2. Build the store structure",
        text:
          "Create the store, add categories, upload product images, set the brand basics, and write the checkout information customers need before ordering.",
      },
      {
        title: "3. Configure operations",
        text:
          "Set delivery areas, shipping fees, payment expectations, contact channels, and order handling rules before you start sending traffic.",
      },
      {
        title: "4. Launch and improve",
        text:
          "Publish, test the order flow, share the store link, then improve based on real customer questions and actual order data.",
      },
    ],
  },
  about: {
    kicker: "About Matgarko",
    title: "A practical ecommerce platform for merchants who want to sell online sooner",
    lead:
      "Matgarko exists to make ecommerce more accessible for Arabic-speaking merchants, especially businesses that cannot afford months of custom development before testing demand.",
    primaryCta: "Start free",
    secondaryCta: "Contact us",
    sections: [
      {
        title: "Why we exist",
        text:
          "Many small businesses already sell through social channels, but orders, product details, payments, and delivery conversations quickly become difficult to manage. Matgarko gives them a more structured store without a heavy technical burden.",
      },
      {
        title: "Who we serve",
        text:
          "We focus on merchants, founders, restaurants, product brands, and small teams that need a clear store, practical pricing, Arabic-first workflows, and a path to grow.",
      },
      {
        title: "How we think",
        text:
          "Good ecommerce software should reduce operational stress. The store should be clear for customers, manageable for the seller, and affordable enough to test before scaling.",
      },
    ],
  },
  contact: {
    kicker: "Contact",
    title: "Talk to Matgarko before you launch or migrate your store",
    lead:
      "Ask about pricing, setup, store categories, migration from another platform, or the best way to start selling online with a simple first catalog.",
    primaryCta: "Message on WhatsApp",
    secondaryCta: "Email support",
    sections: [
      {
        title: "WhatsApp",
        text:
          "Use WhatsApp for fast questions about creating a store, choosing a plan, or understanding whether Matgarko fits your business.",
        items: ["+20 108 031 2538", "Best for setup and plan questions"],
      },
      {
        title: "Email",
        text:
          "Send details about your store, products, current platform, or launch timeline if you need a more complete reply.",
        items: ["matgarko.help@gmail.com"],
      },
      {
        title: "Location context",
        text:
          "Matgarko is built with Egyptian and Arabic-commerce workflows in mind, with English content available for regional teams and partners.",
      },
    ],
  },
  terms: {
    kicker: "Terms",
    title: "Terms and conditions for using Matgarko",
    lead:
      "This English page summarizes the meaning of the Arabic terms in clear language for English readers. The service is provided for merchants who create and operate their own online stores.",
    sections: [
      {
        title: "Use of the platform",
        text:
          "Merchants are responsible for the products, prices, descriptions, policies, customer communication, delivery commitments, and legal compliance of their own stores.",
      },
      {
        title: "Plans, commissions, and payments",
        text:
          "Plan prices and commissions are shown on the pricing page. Third-party payment providers or delivery companies may charge separate fees outside Matgarko subscription or commission fees.",
      },
      {
        title: "Store content",
        text:
          "Users must not publish illegal, misleading, harmful, or infringing content. Matgarko may restrict access to stores that misuse the service or violate platform rules.",
      },
      {
        title: "Service changes",
        text:
          "Features, pricing, and availability may change as the product develops. We aim to keep merchants informed about important changes that affect their stores.",
      },
    ],
  },
  privacy: {
    kicker: "Privacy",
    title: "How Matgarko handles account and store data",
    lead:
      "This English page explains the privacy approach in plain language. Matgarko uses account, store, and operational data to provide and improve the ecommerce service.",
    sections: [
      {
        title: "Data we process",
        text:
          "We may process account information, store details, contact information, product data, order-related information, support messages, and technical usage data needed to operate the platform.",
      },
      {
        title: "How data is used",
        text:
          "Data is used to create accounts, operate stores, support merchants, maintain security, improve features, and communicate important service information.",
      },
      {
        title: "Third-party services",
        text:
          "Payment, analytics, hosting, communication, or delivery-related providers may process limited data where needed to provide their part of the service.",
      },
      {
        title: "Contact",
        text:
          "For privacy questions, contact Matgarko at matgarko.help@gmail.com.",
      },
    ],
  },
};

export const englishIndustries: Record<string, EnglishIndustryContent> = {
  restaurants: {
    slug: "restaurants",
    label: "Restaurants",
    title: "Online store builder for restaurants, food brands, and delivery menus",
    lead:
      "Create a store where customers can browse menu items, understand delivery options, and place orders without your team relying only on chat messages.",
    proof:
      "Useful for restaurants, cloud kitchens, bakeries, meal prep brands, and packaged food sellers in Egypt and Arabic-speaking markets.",
    features: [
      {
        title: "Menu-ready product pages",
        text:
          "Show categories, prices, product descriptions, images, and add-on details in a structured storefront that is easier to browse than social posts.",
      },
      {
        title: "Delivery expectations",
        text:
          "Make delivery zones, fees, timing, and contact details clear before customers place orders.",
      },
      {
        title: "Repeat orders",
        text:
          "A store link gives returning customers a faster path to order again, especially when paired with WhatsApp and social campaigns.",
      },
    ],
  },
  clothing: {
    slug: "clothing",
    label: "Clothing",
    title: "Launch a fashion ecommerce store with sizes, colors, and mobile-first product pages",
    lead:
      "Matgarko helps clothing sellers present collections clearly, organize variants, and give customers a smoother path from discovery to order.",
    proof:
      "Useful for local fashion brands, boutiques, modest wear, sportswear, handmade apparel, and Instagram-first clothing sellers.",
    features: [
      {
        title: "Collection structure",
        text:
          "Organize items by category, style, season, or campaign so shoppers do not need to scroll through old posts to find what is available.",
      },
      {
        title: "Variant clarity",
        text:
          "Use product descriptions to explain sizes, colors, fabric notes, care instructions, and delivery expectations.",
      },
      {
        title: "Cleaner conversion",
        text:
          "Send ad traffic and social followers to a storefront built for browsing and buying, not a long chat thread.",
      },
    ],
  },
  electronics: {
    slug: "electronics",
    label: "Electronics",
    title: "Create an electronics store with clear specs, pricing, and order handling",
    lead:
      "Electronics shoppers need details. Matgarko gives sellers a structured way to present specs, prices, stock, warranty notes, and delivery information.",
    proof:
      "Useful for accessories, gadgets, mobile accessories, small electronics, computer parts, and specialty tech sellers.",
    features: [
      {
        title: "Specification-led product pages",
        text:
          "Explain models, compatibility, warranty notes, included accessories, and product differences in a format customers can compare.",
      },
      {
        title: "Stock and price control",
        text:
          "Keep active products and prices easier to update as supply and exchange-sensitive costs change.",
      },
      {
        title: "Trust-building information",
        text:
          "Add clear delivery, return, and contact details so customers feel safer ordering higher-consideration products.",
      },
    ],
  },
  cosmetics: {
    slug: "cosmetics",
    label: "Cosmetics",
    title: "Build an online cosmetics and beauty store with content that helps shoppers choose",
    lead:
      "Beauty buyers need product benefits, usage notes, ingredients, shades, and trust signals. Matgarko helps you organize that information in a real storefront.",
    proof:
      "Useful for skincare, makeup, fragrance, hair care, personal care, and boutique beauty brands.",
    features: [
      {
        title: "Benefit-focused pages",
        text:
          "Move beyond product names by explaining use cases, skin or hair concerns, shade notes, and bundle recommendations.",
      },
      {
        title: "Campaign-ready categories",
        text:
          "Create collections for best sellers, routines, offers, seasonal launches, and influencer campaigns.",
      },
      {
        title: "Simple order path",
        text:
          "Give customers a clear place to choose products and submit orders after seeing content on social channels.",
      },
    ],
  },
  furniture: {
    slug: "furniture",
    label: "Furniture",
    title: "Open a furniture and home decor store with product details customers can inspect",
    lead:
      "Furniture shoppers need measurements, materials, colors, delivery details, and enough trust to make a considered purchase. Matgarko helps you present those details clearly.",
    proof:
      "Useful for furniture workshops, decor brands, home accessories, lighting, bedding, and made-to-order sellers.",
    features: [
      {
        title: "Detailed product information",
        text:
          "List dimensions, materials, colors, care notes, delivery expectations, and customization options in a structured page.",
      },
      {
        title: "Category browsing",
        text:
          "Help customers explore by room, style, product type, or collection instead of relying only on social media albums.",
      },
      {
        title: "Order qualification",
        text:
          "Use clear store content to reduce repeated questions before a customer contacts you about delivery or custom work.",
      },
    ],
  },
};

export const englishComparisons: Record<string, EnglishComparisonContent> = {
  easyorders: {
    slug: "easyorders",
    competitor: "EasyOrders",
    title: "Matgarko vs EasyOrders for merchants in Egypt and MENA",
    lead:
      "Both platforms help merchants sell online, but Matgarko is positioned as an Arabic-first store builder with simple EGP pricing and a low-risk path for new merchants.",
    verdict:
      "Choose Matgarko if you want a simple storefront, clear local pricing, and a launch path focused on small teams that are moving from social selling to structured ecommerce.",
    rows: [
      { factor: "Best fit", matgarko: "New and growing merchants that want an Arabic-first store.", competitor: "Merchants who already prefer the EasyOrders workflow." },
      { factor: "Pricing context", matgarko: "Starts free with commission, then EGP monthly plans.", competitor: "Review current EasyOrders pricing before deciding." },
      { factor: "Setup style", matgarko: "No-code setup with storefront, products, orders, and local workflows.", competitor: "Platform-specific setup and feature set." },
      { factor: "Market focus", matgarko: "Egypt and Arabic-speaking commerce workflows.", competitor: "Egypt-focused ecommerce operations." },
    ],
    bestFor: ["Early stores", "Arabic-first teams", "Merchants testing demand", "Businesses that want EGP cost planning"],
    watchouts: ["Compare the exact features you use today", "Check current payment and shipping requirements before migration"],
  },
  shopify: {
    slug: "shopify",
    competitor: "Shopify",
    title: "Shopify alternative for Egypt and MENA merchants",
    lead:
      "Shopify is a powerful global ecommerce platform. Matgarko is a simpler local-first alternative for merchants who want Arabic-first operations and EGP pricing without a heavy technical setup.",
    verdict:
      "Choose Matgarko when local affordability, Arabic workflows, and a quick no-code launch matter more than Shopify's global app ecosystem.",
    rows: [
      { factor: "Pricing", matgarko: "EGP plans starting from free.", competitor: "Global subscription pricing that may be affected by exchange rates." },
      { factor: "Technical complexity", matgarko: "Built for merchants without a technical team.", competitor: "Powerful, but often depends on themes, apps, and setup decisions." },
      { factor: "Local workflow", matgarko: "Focused on Egypt and Arabic-commerce habits.", competitor: "Global defaults that may need localization work." },
      { factor: "Best use", matgarko: "Fast local launch and lower initial risk.", competitor: "Advanced global stores with app-heavy needs." },
    ],
    bestFor: ["Egyptian sellers", "Small teams", "Arabic-first catalogs", "Stores that want EGP pricing"],
    watchouts: ["Shopify may be better for complex international expansion", "Compare app requirements before choosing"],
  },
  salla: {
    slug: "salla",
    competitor: "Salla",
    title: "Salla alternative for merchants outside the Gulf and in Egypt",
    lead:
      "Salla is well known in the Gulf. Matgarko focuses on Egyptian and Arabic-speaking merchants who need practical local pricing and a simpler path to launch.",
    verdict:
      "Choose Matgarko if your business is built around Egypt-first workflows and you want software priced and positioned for that market.",
    rows: [
      { factor: "Regional focus", matgarko: "Egypt-first with MENA-facing English content.", competitor: "Strong Gulf-market positioning." },
      { factor: "Pricing context", matgarko: "EGP pricing and free start option.", competitor: "Review plan currency and local fit for your market." },
      { factor: "Audience", matgarko: "Arabic-speaking merchants moving online.", competitor: "Gulf merchants and regional sellers." },
      { factor: "Launch path", matgarko: "Simple no-code setup for early and growing stores.", competitor: "Feature set depends on current Salla plans and availability." },
    ],
    bestFor: ["Egypt-based stores", "Arabic-first operators", "Merchants who want EGP planning", "Teams comparing Gulf platforms"],
    watchouts: ["Salla may fit Gulf-focused selling better", "Confirm payment and logistics fit for your country"],
  },
  woocommerce: {
    slug: "woocommerce",
    competitor: "WooCommerce",
    title: "WooCommerce alternative without hosting, plugins, or developer maintenance",
    lead:
      "WooCommerce can be flexible, but it requires WordPress hosting, plugin choices, maintenance, and technical decisions. Matgarko gives merchants a hosted ecommerce path with less setup burden.",
    verdict:
      "Choose Matgarko if you want to launch and operate the store without managing WordPress, hosting, security updates, and plugin conflicts.",
    rows: [
      { factor: "Setup", matgarko: "Hosted no-code ecommerce platform.", competitor: "WordPress plus WooCommerce setup." },
      { factor: "Maintenance", matgarko: "Platform-managed software path.", competitor: "Hosting, updates, plugins, backups, and security need attention." },
      { factor: "Flexibility", matgarko: "Focused merchant workflows.", competitor: "Very flexible if you have technical support." },
      { factor: "Best use", matgarko: "Merchants who want simplicity.", competitor: "Teams comfortable managing WordPress infrastructure." },
    ],
    bestFor: ["Non-technical merchants", "Fast launches", "Small teams", "Stores avoiding plugin maintenance"],
    watchouts: ["WooCommerce may be better for custom WordPress builds", "Advanced custom features may require a developer either way"],
  },
};

export const englishBlogArticles: BlogArticle[] = [
  {
    slug: "how-to-create-online-store-egypt",
    title: "How to create an online store in Egypt in 2026",
    description:
      "A practical step-by-step guide for launching an ecommerce store in Egypt: product choice, platform setup, payment, shipping, and first-order readiness.",
    category: "Launch guide",
    readingTime: "8 min read",
    publishDate: "2026-06-26",
    content: [
      {
        type: "p",
        text:
          "Creating an online store in Egypt is no longer only for companies with a developer budget. The important part is not just publishing a website; it is preparing a store that customers can understand, order from, and trust.",
      },
      {
        type: "h2",
        text: "1. Start with a focused catalog",
      },
      {
        type: "p",
        text:
          "Choose a small first catalog that you can price, photograph, describe, and deliver well. A tight catalog makes launch faster and gives you cleaner feedback from customers.",
      },
      {
        type: "ul",
        items: ["Pick your first product group", "Prepare prices and stock", "Write simple product descriptions", "Confirm delivery feasibility"],
      },
      {
        type: "h2",
        text: "2. Choose a store platform that fits local operations",
      },
      {
        type: "p",
        text:
          "For Egypt, look for EGP pricing, Arabic-ready content, cash-on-delivery support, local shipping setup, and a dashboard that your team can use without technical training.",
      },
      {
        type: "h2",
        text: "3. Build the storefront before running ads",
      },
      {
        type: "p",
        text:
          "Add your store name, logo, categories, product photos, prices, return notes, contact details, and checkout expectations before you send traffic from Facebook, Instagram, TikTok, or Google.",
      },
      {
        type: "h2",
        text: "4. Prepare payment and delivery",
      },
      {
        type: "p",
        text:
          "Cash on delivery is still important for many Egyptian shoppers. If you offer digital payments, make sure gateway fees and settlement timing are clear in your margin planning.",
      },
      {
        type: "h2",
        text: "5. Test the first order flow",
      },
      {
        type: "ol",
        items: ["Open the store link on mobile", "Place a test order", "Check the order notification", "Confirm customer contact details", "Review delivery and payment instructions"],
      },
      {
        type: "callout",
        text:
          "Start simple. Your first goal is not a perfect store; it is a store that can receive real orders and teach you what customers ask before buying.",
      },
    ],
  },
  {
    slug: "cost-of-online-store-egypt-2026",
    title: "Cost of creating an online store in Egypt in 2026",
    description:
      "Understand the real cost of ecommerce in Egypt, including platform fees, commissions, domain cost, payment gateway fees, shipping, and hidden operating work.",
    category: "Pricing",
    readingTime: "6 min read",
    publishDate: "2026-06-26",
    content: [
      {
        type: "p",
        text:
          "The cost of an online store is more than the monthly platform price. You also need to think about commissions, payment provider fees, delivery cost, product photography, returns, and the time your team spends managing orders.",
      },
      {
        type: "h2",
        text: "Common ecommerce cost models",
      },
      {
        type: "ul",
        items: ["Free plan with commission", "Monthly subscription", "Subscription plus lower commission", "Custom development and hosting"],
      },
      {
        type: "h2",
        text: "Typical costs to plan for",
      },
      {
        type: "p",
        text:
          "A new store may pay 0 EGP monthly on a commission plan, then move to 499 EGP or 1,499 EGP monthly as volume grows. Other costs can include a custom domain, product photos, payment gateway fees, ads, shipping, and returns.",
      },
      {
        type: "h2",
        text: "When does a paid plan make sense?",
      },
      {
        type: "p",
        text:
          "If your commission cost on the free plan becomes higher than the monthly plan plus its lower commission, upgrading is usually financially smarter.",
      },
      {
        type: "callout",
        text:
          "Do the math monthly. A free plan is excellent for testing, but a paid plan can protect your margin once order volume becomes predictable.",
      },
    ],
  },
  {
    slug: "best-ecommerce-platform-egypt",
    title: "Best ecommerce platform for Egypt: what merchants should compare",
    description:
      "A practical comparison framework for Egyptian merchants choosing between local ecommerce platforms, Shopify, WooCommerce, and social selling.",
    category: "Comparison",
    readingTime: "7 min read",
    publishDate: "2026-06-26",
    content: [
      {
        type: "p",
        text:
          "The best ecommerce platform for Egypt is not always the one with the longest feature list. It is the one that matches your payment habits, delivery reality, team skills, budget, and customer language.",
      },
      {
        type: "h2",
        text: "What to compare first",
      },
      {
        type: "ul",
        items: ["EGP pricing and exchange-rate exposure", "Cash-on-delivery support", "Shipping zone setup", "Arabic storefront and support", "Ease of use for non-technical teams"],
      },
      {
        type: "h2",
        text: "Global platforms vs local platforms",
      },
      {
        type: "p",
        text:
          "Global platforms can be powerful, especially for international stores. Local-first platforms can be easier for early Egyptian merchants because pricing, support, and store setup are closer to the market's real operating habits.",
      },
      {
        type: "h2",
        text: "The simple decision",
      },
      {
        type: "p",
        text:
          "If you need a complex international ecosystem, compare Shopify and WooCommerce carefully. If you need a quick, affordable, Arabic-first launch, Matgarko is built for that starting point.",
      },
    ],
  },
  {
    slug: "free-online-store-pros-cons",
    title: "Free online store builders: benefits, limits, and when to upgrade",
    description:
      "Learn when a free ecommerce plan is useful, what limits to expect, and how to decide when commission becomes more expensive than a paid plan.",
    category: "Beginner guide",
    readingTime: "5 min read",
    publishDate: "2026-06-26",
    content: [
      {
        type: "p",
        text:
          "A free online store is a good way to start, but free does not always mean zero cost. Many free plans charge commission, limit advanced features, or keep you on a platform-branded setup until you upgrade.",
      },
      {
        type: "h2",
        text: "Why free plans are useful",
      },
      {
        type: "ul",
        items: ["You can test demand before paying monthly", "You learn the dashboard", "You validate product photos and descriptions", "You avoid early fixed costs"],
      },
      {
        type: "h2",
        text: "The limits to watch",
      },
      {
        type: "ul",
        items: ["Commission can grow with sales", "Some features may require a paid plan", "Custom domain setup may be limited", "Operational work still takes time"],
      },
      {
        type: "h2",
        text: "When to upgrade",
      },
      {
        type: "p",
        text:
          "Upgrade when the paid plan gives you lower total cost, better margin control, or features that directly improve your conversion and operations.",
      },
    ],
  },
];

export const englishSeoPages: Record<string, EnglishSeoEntry> = {
  "/en": {
    title: "Ecommerce platform for MENA merchants | Matgarko",
    description:
      "Create an online store for Egypt and MENA with Matgarko. Launch without coding, manage products and orders, prepare payment and shipping workflows, and start free in EGP.",
    keywords: ["ecommerce platform MENA", "online store builder Middle East", "create online store Egypt", "Arabic ecommerce platform", "Matgarko"],
  },
  "/en/solutions": {
    title: "Ecommerce store management solutions | Matgarko",
    description:
      "Manage storefronts, products, orders, customers, offers, payment setup, and shipping workflows in one Arabic-first ecommerce platform.",
    keywords: ["ecommerce store management", "online store dashboard", "product and order management", "Arabic ecommerce software"],
  },
  "/en/integrations": {
    title: "Payment and shipping setup for ecommerce | Matgarko",
    description:
      "Prepare cash on delivery, payment workflows, shipping zones, delivery fees, and operational settings for ecommerce stores in Egypt and MENA.",
    keywords: ["ecommerce payment Egypt", "cash on delivery ecommerce", "shipping setup online store", "MENA ecommerce logistics"],
  },
  "/en/themes": {
    title: "Online store templates for MENA businesses | Matgarko",
    description:
      "Start from mobile-ready ecommerce templates for restaurants, clothing, electronics, cosmetics, furniture, and other product businesses.",
    keywords: ["online store templates", "ecommerce themes MENA", "mobile store template", "Arabic online store design"],
  },
  "/en/getting-started": {
    title: "How to start an online store with Matgarko",
    description:
      "A clear launch path for creating your store, adding products, setting delivery and payment details, and publishing your first ecommerce catalog.",
    keywords: ["start online store", "ecommerce launch checklist", "create online store Egypt", "Matgarko guide"],
  },
  "/en/pricing": {
    title: "Online store pricing in Egypt | Matgarko plans",
    description:
      "Start free with 2% commission, or choose EGP plans: Growth at 499 EGP + 0.5% or Pro at 1,499 EGP with zero commission.",
    keywords: ["online store pricing Egypt", "ecommerce platform pricing", "free online store Egypt", "EGP ecommerce plans"],
  },
  "/en/about": {
    title: "About Matgarko | Arabic-first ecommerce platform",
    description:
      "Matgarko helps merchants in Egypt and Arabic-speaking markets launch online stores faster without custom development or heavy technical setup.",
    keywords: ["about Matgarko", "Arabic ecommerce platform", "Egypt ecommerce software", "MENA ecommerce SaaS"],
  },
  "/en/contact": {
    title: "Contact Matgarko | Ecommerce setup support",
    description:
      "Contact Matgarko by WhatsApp or email to ask about ecommerce pricing, store setup, migration, or launching your online store.",
    keywords: ["contact Matgarko", "ecommerce setup support", "online store support Egypt", "Matgarko WhatsApp"],
  },
  "/en/register": {
    title: "Create your Matgarko store account",
    description:
      "Start creating your Matgarko online store account and prepare your store name, link, and launch information.",
    keywords: ["register Matgarko", "create store account", "start ecommerce store"],
    noindex: true,
  },
  "/en/terms": {
    title: "Terms and conditions | Matgarko",
    description:
      "English summary of Matgarko terms covering merchant responsibility, platform use, plan fees, commissions, content, and service changes.",
    keywords: ["Matgarko terms", "ecommerce platform terms", "online store terms"],
  },
  "/en/privacy": {
    title: "Privacy policy | Matgarko",
    description:
      "English privacy summary explaining how Matgarko handles account, store, support, and operational data for the ecommerce service.",
    keywords: ["Matgarko privacy", "ecommerce privacy policy", "store data privacy"],
  },
  "/en/store/restaurants": {
    title: "Online store builder for restaurants in Egypt and MENA | Matgarko",
    description:
      "Create an online restaurant store or delivery menu with clear products, prices, delivery expectations, and order handling.",
    keywords: ["online store for restaurants", "restaurant ecommerce Egypt", "food delivery store builder", "online menu builder"],
  },
  "/en/store/clothing": {
    title: "Online clothing store builder for Egypt and MENA | Matgarko",
    description:
      "Launch a fashion ecommerce store with mobile-ready product pages, collection structure, size notes, color details, and simple order handling.",
    keywords: ["online clothing store builder", "fashion ecommerce Egypt", "sell clothes online MENA", "clothing ecommerce platform"],
  },
  "/en/store/electronics": {
    title: "Electronics ecommerce store builder | Matgarko",
    description:
      "Create an electronics store with clear specifications, pricing, product details, stock visibility, and local ecommerce workflows.",
    keywords: ["electronics ecommerce store", "sell electronics online Egypt", "gadget store builder", "tech ecommerce platform"],
  },
  "/en/store/cosmetics": {
    title: "Cosmetics and beauty online store builder | Matgarko",
    description:
      "Build an online cosmetics store with product benefits, shade notes, routines, offers, and a cleaner path from social content to orders.",
    keywords: ["cosmetics online store", "beauty ecommerce Egypt", "skincare store builder", "sell cosmetics online"],
  },
  "/en/store/furniture": {
    title: "Furniture and home decor online store builder | Matgarko",
    description:
      "Open a furniture or home decor ecommerce store with dimensions, materials, colors, delivery details, and structured product pages.",
    keywords: ["furniture ecommerce store", "home decor online store", "sell furniture online Egypt", "furniture store builder"],
  },
  "/en/blog": {
    title: "Matgarko blog | Ecommerce guides for Egypt and MENA",
    description:
      "Practical ecommerce guides about creating online stores, pricing, platform comparisons, free plans, and growth for merchants in Egypt and MENA.",
    keywords: ["ecommerce blog Egypt", "MENA ecommerce guides", "online store tips", "Matgarko blog"],
    type: "website",
  },
  "/en/blog/how-to-create-online-store-egypt": {
    title: "How to create an online store in Egypt in 2026 | Matgarko",
    description:
      "A practical step-by-step guide for launching an ecommerce store in Egypt: product choice, platform setup, payment, shipping, and first-order readiness.",
    keywords: ["how to create online store Egypt", "start ecommerce Egypt 2026", "online store launch guide", "create ecommerce store"],
    type: "article",
  },
  "/en/blog/cost-of-online-store-egypt-2026": {
    title: "Cost of creating an online store in Egypt in 2026 | Matgarko",
    description:
      "Understand ecommerce costs in Egypt, including platform fees, commissions, domain cost, payment gateway fees, shipping, and hidden operating work.",
    keywords: ["online store cost Egypt", "ecommerce pricing Egypt", "cost to start ecommerce store", "Matgarko pricing"],
    type: "article",
  },
  "/en/blog/best-ecommerce-platform-egypt": {
    title: "Best ecommerce platform for Egypt: what to compare | Matgarko",
    description:
      "A practical framework for Egyptian merchants comparing local ecommerce platforms, Shopify, WooCommerce, and social selling.",
    keywords: ["best ecommerce platform Egypt", "Shopify alternative Egypt", "WooCommerce alternative Egypt", "Arabic ecommerce platform"],
    type: "article",
  },
  "/en/blog/free-online-store-pros-cons": {
    title: "Free online store builders: benefits and limits | Matgarko",
    description:
      "Learn when a free ecommerce plan is useful, what limits to expect, and how to decide when commission becomes more expensive than a paid plan.",
    keywords: ["free online store builder", "free ecommerce store Egypt", "online store commission", "start online store free"],
    type: "article",
  },
  "/en/compare": {
    title: "Compare ecommerce platforms for Egypt and MENA | Matgarko",
    description:
      "Compare Matgarko with EasyOrders, Shopify, Salla, and WooCommerce for local pricing, setup complexity, Arabic workflows, and ecommerce operations.",
    keywords: ["compare ecommerce platforms Egypt", "Shopify alternative MENA", "EasyOrders alternative", "WooCommerce alternative Egypt"],
  },
  "/en/compare/easyorders": {
    title: "Matgarko vs EasyOrders | Ecommerce platform comparison",
    description:
      "Compare Matgarko and EasyOrders for merchants in Egypt and MENA across pricing context, setup, local workflows, and launch fit.",
    keywords: ["Matgarko vs EasyOrders", "EasyOrders alternative", "ecommerce platform Egypt comparison"],
  },
  "/en/compare/shopify": {
    title: "Shopify alternative for Egypt and MENA | Matgarko",
    description:
      "Compare Matgarko and Shopify for merchants who need Arabic-first workflows, EGP pricing, and a simpler local ecommerce launch path.",
    keywords: ["Shopify alternative Egypt", "Shopify alternative MENA", "Matgarko vs Shopify", "Arabic Shopify alternative"],
  },
  "/en/compare/salla": {
    title: "Salla alternative for Egypt-focused merchants | Matgarko",
    description:
      "Compare Matgarko and Salla for merchants who need Egypt-first workflows, EGP pricing, and practical Arabic ecommerce setup.",
    keywords: ["Salla alternative Egypt", "Matgarko vs Salla", "ecommerce platform Gulf Egypt", "Arabic ecommerce platform"],
  },
  "/en/compare/woocommerce": {
    title: "WooCommerce alternative without hosting or plugins | Matgarko",
    description:
      "Compare Matgarko and WooCommerce for merchants who want hosted no-code ecommerce instead of WordPress hosting, plugin maintenance, and developer setup.",
    keywords: ["WooCommerce alternative Egypt", "Matgarko vs WooCommerce", "hosted ecommerce platform", "no-code ecommerce Egypt"],
  },
};

export const englishOrderedPaths = [
  "/en",
  "/en/solutions",
  "/en/themes",
  "/en/integrations",
  "/en/getting-started",
  "/en/pricing",
  "/en/about",
  "/en/contact",
  "/en/register",
  "/en/terms",
  "/en/privacy",
  "/en/store/restaurants",
  "/en/store/clothing",
  "/en/store/electronics",
  "/en/store/cosmetics",
  "/en/store/furniture",
  "/en/blog",
  "/en/blog/how-to-create-online-store-egypt",
  "/en/blog/cost-of-online-store-egypt-2026",
  "/en/blog/best-ecommerce-platform-egypt",
  "/en/blog/free-online-store-pros-cons",
  "/en/compare",
  "/en/compare/easyorders",
  "/en/compare/shopify",
  "/en/compare/salla",
  "/en/compare/woocommerce",
];
