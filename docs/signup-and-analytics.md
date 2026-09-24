# Registration and measurement setup

## Deploy in order

1. Deploy the changes in the main ASP.NET project together with catalog migration `20260914123516_AddSignupAcquisition`. Its `docs/landing-signup.md` describes configuration and verification. The migration has not been applied by the local implementation work.
2. Confirm `https://signup.matgarko.com/api/signup/v1/config` returns JSON. The backend permits CORS from `https://matgarko.com` and `https://www.matgarko.com` by default. Its `LandingSignup:AllowedOrigins` setting overrides this list; include each origin you actually use. For local testing, explicitly allow your local frontend origin on a development backend.
3. Set `VITE_SIGNUP_API_URL`, `VITE_GA_MEASUREMENT_ID`, and optional Ads settings in Cloudflare Pages build variables. Build with `npm run build`; deploy `dist`. Do not embed private API keys or backend credentials in Vite variables.
4. Verify real email delivery and provisioning in your staging environment, then perform an authorized live signup smoke test after deployment. Automated tests use simulated mail and mocked browser requests; they do not create production accounts.

## What is collected

Once status is `ready`, the registration page validates the tenant dashboard URL and remembers only the public store URL in `matgarko-last-store`. It keeps the success view visible for at least 1.5 seconds and waits for each configured Google signup event's `event_callback` before automatically opening the dashboard. The primary dashboard link also waits for those callbacks. A 4-second fallback allows navigation if the tag is blocked or never calls back; declined consent and unavailable tracking do not add a wait. These callbacks indicate tag processing, not confirmed receipt in a Google account. A conversion is retained for reload deduplication only after its callback; a fallback timeout alone never marks it sent. Verification, provisioning, unavailable states, and invalid URLs never trigger this redirect. The dashboard still requires the merchant's normal email/password login; the signup handle is not an authentication credential. See [Google's callback reference](https://developers.google.com/tag-platform/gtagjs/reference/parameters).

`/login` and `/en/login` are prerendered, non-indexable store-access pages linked from the header (including the closed mobile menu), hero, registration form, and footer. The remembered store offers dashboard access, the public customer URL, copy, and removal of the browser shortcut. Storage is local to that browser and landing origin, with no passwords, contact details, or signup handles retained in the shortcut. Merchants without a saved link can enter their Matgarko address or find the link in their existing store-ready email; WhatsApp support is available when they cannot find it. There is no email-based store lookup endpoint in the current signup API.

Email and mobile availability checks use debounced JSON POST requests to `/check-email` and `/check-phone`; contact details are not placed in URLs. They do not send verification messages or create registrations. Deploy these backend endpoints before publishing the corresponding form update. The final registration still revalidates availability.

The mobile field offers 22 Arab countries with calling codes. Local numbers, pasted international numbers, and Arabic/Persian digits are parsed using `libphonenumber-js`; the selected country must match and the number must be in a mobile range. The API receives one E.164 value including the country code. Changing the country invalidates any previous availability result for a different number. Deploy the backend international-phone validation before publishing this form update. Number validation does not verify ownership; signup verification remains by email.

- After opt-in, GA4 receives one manually emitted `page_view` per route change, with marketing query parameters only and a referrer stripped of its path/query on the initial visit.
- The browser retains the first recorded source and latest attributed non-direct source for up to 90 days. It recognizes UTM fields, Google click IDs, and external referrer hosts. An internal navigation before consent retains the landing campaign in memory for the first measured pageview.
- `signup_start`, `signup_details_submitted`, and `signup_email_verified` measure progress. `sign_up` is emitted only after the backend reports that the verified store is active. It includes `method: email`, a non-secret transaction ID, and `first_source` / `last_source`.
- Optional direct Ads `conversion` uses the same non-secret transaction ID. Each destination is deduplicated in the current browser, including reloads, using local storage. Clearing storage, another browser, ad blockers, or leaving before provisioning completes can affect counts. This is browser measurement, not an authoritative registration ledger.
- Passwords, verification codes, signup handles, emails, phone numbers, and the optional survey answer are not included in our analytics event payloads. Do not place personal information in campaign names or UTM values.
- The optional survey lists Google, Facebook/Instagram, TikTok, YouTube, a friend, WhatsApp, an AI tool, and another source. It can be answered without tracking consent and is kept separately from detected attribution.
- The protected host dashboard shows registered-store source summaries for the current store list. GA4 Traffic acquisition shows visits/sessions by source and medium; User acquisition shows first-user acquisition. Missing consent/referrers means source data may be unavailable. These counts will not necessarily match.

## Google Analytics and Google Ads

1. Use the GA4 web stream for the main domain. In Admin → Data streams → web stream → Enhanced measurement → Page views → advanced settings, disable **Page changes based on browser history events** because this site sends its own route pageviews. Avoid installing duplicate tags through GTM or another integration. [Google's manual SPA tracking guidance](https://developers.google.com/analytics/devguides/collection/ga4/measure-spa-gtm).
2. Check visits in Realtime after consenting. Complete signup on the deployed site to generate `sign_up`; an empty events list before any event arrives is expected. Mark `sign_up` as a key event. Keep intermediate form events out of the primary registration goal.
3. Link GA4 to Google Ads, enable Ads auto-tagging, and choose one primary registration conversion method:
   - **GA4 import:** create a Google Ads conversion from `sign_up`. Leave the direct Ads variables empty.
   - **Direct Ads tag:** create a website signup conversion using code, retrieve its conversion ID and label from tag setup, and set `VITE_GOOGLE_ADS_ID=AW-...` and `VITE_GOOGLE_ADS_SIGNUP_LABEL=...`. Rebuild the landing. Do not also use the imported GA event as a primary goal for the same signup.
4. Imported Analytics conversion data can take up to 24 hours to appear in Google Ads. [Google's import instructions](https://support.google.com/google-ads/answer/2375435?hl=en).
5. Optionally register `first_source` and `last_source` as event-scoped custom dimensions for signup analysis. Standard acquisition reports already provide session source, medium, and campaign. Add explicit UTM values to links you control, such as social posts and WhatsApp campaigns. Google Ads auto-tagging supplies Google click IDs.

## Meta Pixel

- Production configuration uses Pixel ID `1988477075326444`, obtained from the Meta setup flow for `https://matgarko.com/` in the campaign's advertising account. The public ID is set as `VITE_META_PIXEL_ID`; no access token belongs in frontend configuration.
- The script loads only after analytics/advertising consent. Route changes send one explicit `PageView`. Withdrawal revokes Meta consent and stops our events; an in-flight script cannot send our events after withdrawal.
- `CompleteRegistration` is sent only when the backend reports a verified, provisioned store as `ready`, never for opening the form, submitting details, or requesting an email. Its non-secret conversion ID is used as `eventID` and for browser-local deduplication scoped to this Pixel ID. A reload does not send it again in the same browser/storage. This is browser measurement, not a server registration ledger.
- Meta works without Google Analytics or Google Ads. Automatic event configuration is disabled, and we do not pass contact details or enable advanced matching. Do not enable automatic form tracking or install a second copy through another tool.
- Meta itself reads page URLs, referrers, browser/connection information and cookie identifiers. To avoid exposing query-string secrets, this integration suppresses Meta when the current URL or document referrer contains a fragment or query keys outside the marketing allowlist (UTMs, Google click IDs and `fbclid`). Campaign parameters must never contain personal data. Such visits, declined consent, ad blockers, cleared storage, other browsers and leaving before completion can affect measurement.
- Events wait until the Pixel script loads. Script failures do not mark a signup as sent; initialization can retry on later navigation. The local tests intercept Meta and Google scripts and cannot create advertising conversions.

After deployment, open Events Manager for this exact Pixel ID, use **Test Events**, visit the site, and consent. Verify `PageView` and then `CompleteRegistration` from an authorized real registration. Declining consent must send neither event. Confirm the live deployment contains the expected Pixel ID; build-environment variables can override `.env.production`.

Adding the Pixel does not change a traffic campaign into a registration campaign. Once a real completed registration is verified, use that event when configuring a website-conversion campaign. Budget, audience, and objective changes are separate from installing measurement.

## Local verification

Run `npm run lint`, `npm run build`, `npm run check:seo`, and `npx playwright test`. Playwright starts an isolated development server on port 5175 with test analytics IDs. The public preview on port 4173 calls the configured API, so it requires a deployed API and an allowed origin for a real signup.
