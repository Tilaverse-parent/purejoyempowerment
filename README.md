# Pure Joy Empowerment Uganda — Website

**Version:** 2.0 · Production Ready  
**Tech Stack:** Static HTML5 / CSS3 / Vanilla JS + Stripe Payments  
**Deployment Targets:** Vercel (recommended) · Netlify · Any static host  

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [File Structure](#2-file-structure)
3. [Local Development](#3-local-development)
4. [Stripe Integration Guide](#4-stripe-integration-guide)
5. [Deployment — Vercel (Recommended)](#5-deployment--vercel-recommended)
6. [Deployment — Netlify](#6-deployment--netlify)
7. [Environment Variables Reference](#7-environment-variables-reference)
8. [Post-Deployment Checklist](#8-post-deployment-checklist)
9. [Customisation Guide](#9-customisation-guide)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Project Overview

This is the complete production website for **Pure Joy Empowerment Uganda (PJWEU)** — a Christian-values NGO serving orphaned and street-connected children, women, and youth across Jinja City, Jinja District, Buikwe, and Kayunga, Eastern Uganda.

### Pages Included

| File | Description |
|---|---|
| `index.html` | Full homepage with hero, programs, impact stats, news |
| `about.html` | Organisation story, mission, vision, values, leadership |
| `programs.html` | All 7 program areas with detail |
| `orphanage.html` | Children's home detail |
| `donate.html` | Full Stripe-powered donation page |
| `get-involved.html` | Volunteer, sponsor, partner, fundraise |
| `events.html` | Upcoming events calendar |
| `news.html` | News and impact stories |
| `contact.html` | Contact form and info |
| `gallery.html` | Photo gallery (placeholder) |
| `privacy.html` | Privacy policy (placeholder) |
| `terms.html` | Terms of use (placeholder) |
| `faq.html` | FAQ (placeholder) |

### Tech Stack

- **Frontend:** Pure HTML5 + CSS3 + Vanilla JavaScript (zero framework dependencies)
- **Shared components:** `js/nav.js` and `js/footer.js` injected into every page
- **Payments:** Stripe.js v3 + PaymentIntents API
- **Fonts:** Google Fonts CDN (Playfair Display + Nunito Sans)
- **Images:** Unsplash CDN (no hosting required)
- **Deployment:** Static files on Vercel or Netlify with one serverless API function

---

## 2. File Structure

```
purejoy/
├── index.html              ← Homepage
├── about.html
├── programs.html
├── orphanage.html
├── donate.html             ← Stripe donation page
├── get-involved.html
├── events.html
├── news.html
├── contact.html
├── gallery.html
├── privacy.html
├── terms.html
├── faq.html
│
├── css/
│   └── styles.css          ← Master stylesheet (all pages)
│
├── js/
│   ├── main.js             ← Shared JS (animations, forms, scroll)
│   ├── nav.js              ← Injected navigation component
│   └── footer.js           ← Injected footer component
│
├── api/
│   └── create-payment-intent.js  ← Stripe serverless function
│
├── vercel.json             ← Vercel deployment config
├── netlify.toml            ← Netlify deployment config
├── package.json            ← Node dependencies (stripe only)
└── README.md               ← This file
```

---

## 3. Local Development

### Prerequisites

- Node.js 18+
- A Stripe account (free at [stripe.com](https://stripe.com))
- A code editor (VS Code recommended)

### Step 1 — Clone / Unzip the Project

```bash
unzip purejoy-website.zip -d purejoy
cd purejoy
```

### Step 2 — Install Dependencies

```bash
npm install
```

This installs only the `stripe` package used by the API function.

### Step 3 — Run a Local Server

The site is plain static HTML — open it directly in your browser **or** use a local server to avoid CORS issues with Stripe:

```bash
# Option A — using Node serve (recommended)
npx serve . -l 3000

# Option B — using Python
python3 -m http.server 3000

# Option C — VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

Then visit **http://localhost:3000**

### Step 4 — Test the Donation Page (Demo Mode)

Without a Stripe key, the donate page runs in **demo mode** — submitting the form simulates a successful payment and shows the thank-you screen. No real charges occur.

---

## 4. Stripe Integration Guide

### Overview

The donation flow works as follows:

```
User fills form  →  Frontend calls /api/create-payment-intent  →
Server creates PaymentIntent  →  Returns clientSecret  →
Frontend calls stripe.confirmCardPayment(clientSecret)  →
Stripe processes  →  Success → thank-you screen
```

---

### Step 1 — Create a Stripe Account

1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Complete account registration and verify your email
3. For NGOs: apply for Stripe's non-profit rate (~2.2% + $0.30) at [https://stripe.com/global](https://stripe.com/global)

---

### Step 2 — Get Your API Keys

1. In Stripe Dashboard, go to **Developers → API Keys**
2. Copy:
   - **Publishable key** — starts with `pk_test_` (test) or `pk_live_` (live)
   - **Secret key** — starts with `sk_test_` (test) or `sk_live_` (live)

> **Security:** Never commit your Secret Key to Git. Use environment variables only.

---

### Step 3 — Add Your Publishable Key to donate.html

Open `donate.html` and find this line (around line 200):

```javascript
const STRIPE_PK = 'pk_test_REPLACE_WITH_YOUR_STRIPE_PUBLISHABLE_KEY';
```

Replace with your actual publishable key:

```javascript
const STRIPE_PK = 'pk_test_51AbCdEfGhIjK...';
```

---

### Step 4 — Configure the Secret Key (Server-side)

The secret key is **never** placed in HTML. It lives as an environment variable on your server:

```bash
# In your terminal / deployment settings:
STRIPE_SECRET_KEY=sk_live_51AbCdEfGhIjK...
```

See Sections 5 and 6 for how to set this in Vercel and Netlify.

---

### Step 5 — Test with Stripe Test Cards

Use these test card numbers on your local/staging site:

| Scenario | Card Number | Expiry | CVC |
|---|---|---|---|
| Successful payment | `4242 4242 4242 4242` | Any future date | Any 3 digits |
| Payment requires auth | `4000 0025 0000 3155` | Any future date | Any 3 digits |
| Card declined | `4000 0000 0000 9995` | Any future date | Any 3 digits |

---

### Step 6 — Go Live

1. In Stripe Dashboard → toggle from **Test mode** to **Live mode**
2. Copy the **live** publishable and secret keys
3. Update `STRIPE_PK` in `donate.html` with `pk_live_...`
4. Update your environment variable `STRIPE_SECRET_KEY` to `sk_live_...`
5. Redeploy

---

### Recurring Donations (Subscriptions)

The current implementation handles one-time payments via PaymentIntents.

To implement true monthly/annual recurring donations, you need Stripe Subscriptions:

```javascript
// In api/create-payment-intent.js — replace PaymentIntent with:

// 1. Create or retrieve Customer
const customer = await stripe.customers.create({
  email: donor.email,
  name: `${donor.firstName} ${donor.lastName}`,
});

// 2. Create a Price (or use one from your Stripe dashboard)
const price = await stripe.prices.create({
  unit_amount: amount,
  currency: 'usd',
  recurring: { interval: 'month' },
  product_data: { name: 'Monthly Gift — Pure Joy Uganda' },
});

// 3. Create Subscription + retrieve clientSecret
const subscription = await stripe.subscriptions.create({
  customer: customer.id,
  items: [{ price: price.id }],
  payment_behavior: 'default_incomplete',
  expand: ['latest_invoice.payment_intent'],
});

// Return the clientSecret
res.json({ clientSecret: subscription.latest_invoice.payment_intent.client_secret });
```

Or use **Stripe Payment Links** (no-code, zero backend) for recurring gifts:  
[https://dashboard.stripe.com/payment-links](https://dashboard.stripe.com/payment-links)

---

### Webhooks (Recommended for Production)

Set up a Stripe webhook to receive payment confirmation server-side:

1. In Stripe Dashboard → **Developers → Webhooks → Add Endpoint**
2. Endpoint URL: `https://yourdomain.org/api/stripe-webhook`
3. Events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.deleted`

Example webhook handler (`api/stripe-webhook.js`):

```javascript
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async function handler(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const intent = event.data.object;
      console.log(`Payment ${intent.id} succeeded: ${intent.amount} ${intent.currency}`);
      // → Send thank-you email, update your donor database, etc.
      break;
    case 'payment_intent.payment_failed':
      console.log('Payment failed:', event.data.object.id);
      break;
  }

  res.json({ received: true });
};
```

---

## 5. Deployment — Vercel (Recommended)

Vercel provides the simplest deployment with built-in serverless functions, CDN, and free HTTPS.

### Option A — Deploy via Vercel CLI

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy from the project folder
cd purejoy
vercel

# Follow prompts:
#   Project name: purejoy-empowerment-uganda
#   Framework: Other
#   Root directory: ./
#   No build command needed

# 4. Add environment variables
vercel env add STRIPE_SECRET_KEY
# Paste your sk_live_XXXX when prompted
# Select environments: Production, Preview, Development

vercel env add ALLOWED_ORIGIN
# Paste your domain e.g. https://purejoyempowerment.org

# 5. Deploy to production
vercel --prod
```

### Option B — Deploy via Vercel Dashboard (No CLI)

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Import from GitHub (push your code to a GitHub repo first):
   ```bash
   git init && git add . && git commit -m "Initial deploy"
   git remote add origin https://github.com/YOUR_ORG/purejoy-website.git
   git push -u origin main
   ```
3. In Vercel dashboard → select your repo → click **Deploy**
4. Go to **Project Settings → Environment Variables** and add:
   - `STRIPE_SECRET_KEY` = `sk_live_XXXX`
   - `ALLOWED_ORIGIN` = `https://yourdomain.org`
5. Redeploy to apply env vars

### Custom Domain on Vercel

1. In Vercel dashboard → your project → **Settings → Domains**
2. Add your domain (e.g. `purejoyempowerment.org`)
3. Follow DNS instructions (add a CNAME or A record at your domain registrar)
4. Vercel provisions free SSL automatically within minutes

---

## 6. Deployment — Netlify

### Option A — Drag and Drop (Fastest)

1. Go to [https://app.netlify.com](https://app.netlify.com) → **Add new site → Deploy manually**
2. Drag the entire `purejoy/` folder into the upload area
3. Your site is live instantly at `random-name.netlify.app`

> **Note:** Drag-and-drop does **not** include the serverless API function. You'll need GitHub + Netlify CLI for that.

### Option B — Deploy with API Function via CLI

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Copy API function to Netlify Functions folder
mkdir -p netlify/functions
cp api/create-payment-intent.js netlify/functions/create-payment-intent.js

# 4. Initialise + deploy
netlify init
netlify deploy --prod

# 5. Set environment variables
netlify env:set STRIPE_SECRET_KEY sk_live_XXXX
netlify env:set ALLOWED_ORIGIN https://purejoyempowerment.org

# 6. Redeploy
netlify deploy --prod
```

### Custom Domain on Netlify

1. In Netlify dashboard → your site → **Site configuration → Domain management**
2. Click **Add a domain** and enter your domain
3. Update your DNS records as instructed
4. SSL is provisioned automatically

---

## 7. Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `STRIPE_SECRET_KEY` | ✅ Yes | Your Stripe Secret Key (`sk_live_...` or `sk_test_...`) |
| `ALLOWED_ORIGIN` | Recommended | Your live domain URL for CORS e.g. `https://purejoyempowerment.org` |
| `STRIPE_WEBHOOK_SECRET` | Optional | Webhook signing secret from Stripe dashboard |

---

## 8. Post-Deployment Checklist

Run through this after every deployment:

### Functionality
- [ ] Homepage loads correctly with images
- [ ] All navigation links go to the correct pages
- [ ] Mobile hamburger menu opens and closes
- [ ] Scroll animations trigger correctly
- [ ] Impact counters animate on scroll

### Donation Page
- [ ] All 6 preset amounts select correctly
- [ ] Custom amount input updates impact preview and button text
- [ ] Frequency tabs (Monthly / One-Time / Annual) switch correctly
- [ ] URL params work: `/donate.html?type=child-sponsor&amount=50`
- [ ] Stripe card element renders (no console errors)
- [ ] Test payment with card `4242 4242 4242 4242` succeeds
- [ ] Thank-you screen appears after successful payment
- [ ] Receipt email is delivered (check Stripe Dashboard → Events)

### Forms
- [ ] Contact form submits and shows toast confirmation
- [ ] Newsletter form submits and shows toast confirmation
- [ ] Volunteer expression form submits correctly

### SEO & Performance
- [ ] All `<meta name="description">` tags are present
- [ ] Open Graph tags present on homepage
- [ ] All images have `alt` attributes
- [ ] Site loads in under 3 seconds (test at [PageSpeed Insights](https://pagespeed.web.dev))
- [ ] HTTPS is active (no mixed content warnings)

### Stripe (Production)
- [ ] Stripe Dashboard shows live mode is active
- [ ] A live test donation of $1 succeeds and is refunded
- [ ] Webhooks are configured and events are received
- [ ] Stripe Radar rules are reviewed for fraud protection

---

## 9. Customisation Guide

### Update Contact Information

Edit `js/nav.js` and `js/footer.js` — find and replace:

```
+256 782 000 000         → Your real phone number
info@purejoyempowerment.org → Your real email
donations@purejoyempowerment.org → Your donations email
```

### Update Social Media Links

In `js/nav.js` and `js/footer.js`, find the social links block and replace the `href` values:

```html
<a href="https://facebook.com/YOUR_PAGE">
<a href="https://instagram.com/YOUR_HANDLE">
<a href="https://youtube.com/@YOUR_CHANNEL">
```

### Add Real Photos

Replace any Unsplash URL with your own image:

```html
<!-- Before -->
<img src="https://images.unsplash.com/photo-XXXX?w=900&q=80" alt="...">

<!-- After — self-hosted -->
<img src="images/your-photo.jpg" alt="...">

<!-- After — CDN hosted -->
<img src="https://res.cloudinary.com/yourcloud/image/upload/v1/your-photo.jpg" alt="...">
```

For best performance, use images from [Cloudinary](https://cloudinary.com) (free tier) or [ImageKit](https://imagekit.io).

### Update Donation Amounts

In `donate.html`, find the amount buttons and edit the `data-amount` values:

```html
<button class="amt-btn" data-amount="10">$10</button>
<button class="amt-btn" data-amount="25">$25</button>
<!-- etc. -->
```

Also update the impact descriptions in the `impactMap` array in the Stripe script block.

### Add a Contact Form Backend

The contact form currently simulates submission. To make it real, integrate one of:

**Formspree (Easiest — Free):**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**EmailJS (No backend needed):**
```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
  from_name: firstName,
  message: message,
  reply_to: email,
});
```

**Custom backend endpoint:**
Replace the `await new Promise(...)` simulation in `js/main.js` with a real `fetch()` call to your endpoint.

### Update Organisation Registration Number

In `js/footer.js` find:

```
Reg. NGO: PJWEU/2018/JJA
```

Replace with your actual registration number.

---

## 10. Troubleshooting

### Stripe card element not rendering

**Cause:** Stripe.js failed to load (network issue or ad blocker)  
**Fix:** Ensure `https://js.stripe.com/v3/` is not blocked. Check browser console for errors.

---

### "Invalid API Key" error on payment

**Cause:** Wrong Stripe key or test key used in production  
**Fix:**
1. Confirm `STRIPE_SECRET_KEY` environment variable is set correctly
2. Ensure you're using `sk_live_...` in production (not `sk_test_...`)
3. Verify the publishable key in `donate.html` matches the same Stripe account

---

### CORS error on payment API call

**Cause:** Frontend origin not allowed by API  
**Fix:**
1. Set `ALLOWED_ORIGIN` environment variable to your exact domain
2. Confirm `vercel.json` or `netlify.toml` is present and correctly configured
3. Redeploy after changing env vars

---

### Nav or footer not appearing on a page

**Cause:** `<script src="js/nav.js">` or `<script src="js/footer.js">` missing  
**Fix:** Every HTML file must include both scripts before `</body>`:
```html
<script src="js/nav.js"></script>
...page content...
<script src="js/footer.js"></script>
<script src="js/main.js"></script>
</body>
```

---

### Images not loading

**Cause:** Unsplash CDN availability or slow connection  
**Fix:** Unsplash images require internet access. For offline use, download and self-host:
```bash
# Example: download one image
curl "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&q=80" \
  -o images/hero-children.jpg
```

---

### Scroll animations not working

**Cause:** Browser doesn't support `IntersectionObserver`  
**Fix:** Add this polyfill in your `<head>`:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/intersection-observer/0.12.0/intersection-observer.min.js"></script>
```

---

## Support

For technical support with this website, contact the development team at:  
📧 **info@tilaverse.co**

For donations or programme questions:  
📧 **info@purejoyempowerment.org**

---

*Built with ❤ for Pure Joy Empowerment Uganda by Tilaverse Inc.*  
*© 2026 Pure Joy Empowerment Uganda. NGO Reg. PJWEU/2018/JJA*
