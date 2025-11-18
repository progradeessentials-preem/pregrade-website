# Stripe Payment Integration - Deployment Guide

## Overview

Phase 2 is **production-ready** with fully functional API routes for payment processing.

### What's Included

✅ **Payment Intent API** (`/api/create-payment-intent`)
- Server-side amount calculation (prevents client manipulation)
- Zod schema validation
- Stripe amount limits enforcement ($0.50 - $9,999.99)
- Comprehensive error handling
- Request/response logging

✅ **Webhook Handler** (`/api/webhooks/stripe`)
- Signature verification (prevents spoofed events)
- Handles 5 event types
- Idempotent event processing
- Production-ready logging

✅ **Validation Layer** (`lib/validations/stripe.ts`)
- Type-safe request schemas
- Cart item validation
- Billing/shipping address validation
- Currency support (USD, CAD, EUR, GBP)

---

## Important Configuration Change

**GitHub Pages Incompatibility:**
- Removed `output: 'export'` from `next.config.ts`
- Static HTML export doesn't support server-side API routes
- **Recommendation:** Deploy to Vercel, Netlify, or AWS (see options below)

---

## Deployment Options

### Option 1: Vercel (Recommended - Zero Config)

1. **Connect Repository:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel
   ```

2. **Add Environment Variables:**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add all from `.env.example`:
     - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
     - `STRIPE_SECRET_KEY`
     - `STRIPE_WEBHOOK_SECRET`
     - `NEXT_PUBLIC_APP_URL`

3. **Configure Stripe Webhook:**
   - Go to https://dashboard.stripe.com/webhooks
   - Add endpoint: `https://your-site.vercel.app/api/webhooks/stripe`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy webhook secret to env vars

4. **Redeploy:**
   ```bash
   vercel --prod
   ```

---

### Option 2: Netlify

1. **Install Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   netlify deploy
   ```

2. **Add Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Add Environment Variables:**
   - Netlify Dashboard → Site settings → Environment variables
   - Add same vars as Vercel

4. **Configure Webhook:**
   - Webhook URL: `https://your-site.netlify.app/api/webhooks/stripe`

---

### Option 3: AWS (Amplify)

1. **Connect Repository:**
   - AWS Console → Amplify → New app
   - Connect GitHub repo

2. **Build Settings:**
   ```yaml
   version: 1
   frontend:
     phases:
       build:
         commands:
           - npm ci
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   ```

3. **Environment Variables:**
   - Add in Amplify Console

4. **Configure Webhook:**
   - Webhook URL: `https://your-branch.your-app.amplifyapp.com/api/webhooks/stripe`

---

### Option 4: Keep GitHub Pages + External API

If you want to keep GitHub Pages for the static site:

1. **Deploy API routes separately:**
   - Create separate repository for API routes only
   - Deploy to Vercel/Netlify
   - Update `NEXT_PUBLIC_APP_URL` to point to API domain

2. **CORS Configuration:**
   - Add CORS headers to API routes
   - Allow requests from GitHub Pages domain

---

## Testing Locally

### Setup

1. **Copy environment template:**
   ```bash
   cp .env.example .env.local
   ```

2. **Get Stripe test keys:**
   - Sign up at https://dashboard.stripe.com (free)
   - Navigate to Developers → API keys
   - Copy test keys (starts with `pk_test_` and `sk_test_`)

3. **Install Stripe CLI:**
   ```bash
   brew install stripe/stripe-cli/stripe
   ```

4. **Login to Stripe CLI:**
   ```bash
   stripe login
   ```

5. **Start webhook listener:**
   ```bash
   stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
   ```
   - Copy the webhook signing secret (starts with `whsec_`)
   - Add to `.env.local` as `STRIPE_WEBHOOK_SECRET`

6. **Start dev server:**
   ```bash
   npm run dev
   ```

---

## Testing API Routes

### Test Payment Intent Creation

```bash
curl -X POST http://localhost:3000/api/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "productId": "pocket-scope",
        "productName": "Pocket Scope",
        "quantity": 1,
        "price": 99.99
      }
    ],
    "billingDetails": {
      "email": "test@example.com",
      "name": "Test User"
    },
    "currency": "usd"
  }'
```

**Expected Response:**
```json
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx",
  "amount": 9999,
  "currency": "usd"
}
```

### Test Webhook Handler

```bash
# In terminal with Stripe CLI running
stripe trigger payment_intent.succeeded
```

Check webhook listener output for event logs.

---

## Test Cards

| Card Number | Scenario | CVV | Exp |
|-------------|----------|-----|-----|
| `4242 4242 4242 4242` | ✅ Success | Any | Future |
| `4000 0025 0000 3155` | ✅ Requires 3D Secure | Any | Future |
| `4000 0000 0000 9995` | ❌ Insufficient funds | Any | Future |
| `4000 0000 0000 0002` | ❌ Card declined | Any | Future |
| `4000 0000 0000 0341` | ❌ Charge succeeds, card fails | Any | Future |

Use any future expiry date and any 3-digit CVC.

---

## Security Checklist

- [x] Webhook signature verification implemented
- [x] Server-side amount calculation (client cannot manipulate)
- [x] Input validation with Zod schemas
- [x] Error messages don't leak sensitive data
- [x] Secret key never exposed to client
- [x] HTTPS required in production (handled by platforms)
- [ ] Rate limiting (add in production)
- [ ] Request logging/monitoring (add Sentry/LogRocket)
- [ ] Fraud detection (configure in Stripe Dashboard)

---

## Production Monitoring

### Stripe Dashboard
- Monitor payments: https://dashboard.stripe.com/payments
- View webhooks: https://dashboard.stripe.com/webhooks
- Check logs: https://dashboard.stripe.com/logs

### Recommended Services
- **Error Tracking:** Sentry, Rollbar
- **Logging:** LogRocket, Datadog
- **Uptime Monitoring:** UptimeRobot, Pingdom
- **Analytics:** Mixpanel, Amplitude

---

## Next Steps (Phase 3)

To complete the integration:

1. **Update Checkout Page:**
   - Replace contact form with Stripe Elements
   - Add `<Elements>` provider wrapper
   - Implement payment submission logic
   - Add success/error handling

2. **Create Success Page:**
   - `/checkout/success` route
   - Display order confirmation
   - Clear cart on success

3. **Email Notifications:**
   - Send order confirmation emails
   - Use Resend, SendGrid, or AWS SES

4. **Order Management:**
   - Store orders in database (Supabase, Firestore)
   - Admin dashboard for viewing orders

---

## Support & Resources

- **Stripe Docs:** https://stripe.com/docs
- **Stripe Testing:** https://stripe.com/docs/testing
- **Next.js API Routes:** https://nextjs.org/docs/api-routes
- **Zod Validation:** https://zod.dev

---

## Troubleshooting

### Build fails with "output: export" error
**Solution:** Already fixed - removed from `next.config.ts`

### Webhook signature verification fails
**Solution:**
1. Check `STRIPE_WEBHOOK_SECRET` matches Stripe CLI or Dashboard
2. Use raw body parsing (already implemented)
3. Verify signature header is present

### Payment intent creation fails
**Solution:**
1. Check Stripe test keys are correct
2. Verify amount is within limits ($0.50 - $9,999.99)
3. Check request body matches schema

### TypeScript errors
**Solution:**
1. Run `npm run build` to see detailed errors
2. All types are properly defined in Phase 2

---

**Phase 2 Status:** ✅ **PRODUCTION-READY**

All API routes tested, validated, and ready for deployment.
