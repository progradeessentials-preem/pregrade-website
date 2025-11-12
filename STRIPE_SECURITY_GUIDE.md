# Stripe Payment Integration - Security Guide

## Table of Contents
1. [Environment Variables Setup](#environment-variables-setup)
2. [Security Best Practices](#security-best-practices)
3. [API Key Management](#api-key-management)
4. [Testing Your Setup](#testing-your-setup)
5. [Production Deployment](#production-deployment)
6. [Common Security Vulnerabilities](#common-security-vulnerabilities)
7. [Webhook Security](#webhook-security)
8. [Troubleshooting](#troubleshooting)

---

## Environment Variables Setup

### 1. Getting Your Stripe Keys

#### Test Mode Keys (Development)
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Sign in to your account
3. Navigate to **Developers > API Keys**
4. Copy your keys:
   - **Publishable key**: Starts with `pk_test_...` (✅ Safe for client-side)
   - **Secret key**: Starts with `sk_test_...` (⚠️ Server-side ONLY)

#### Production Keys (Live Payments)
1. Toggle to **Live mode** in Stripe Dashboard
2. Navigate to **Developers > API Keys**
3. Copy your production keys:
   - **Publishable key**: Starts with `pk_live_...`
   - **Secret key**: Starts with `sk_live_...`

### 2. Configure Environment Variables

Your `.env.local` file should contain:

```env
# Stripe Test Keys (Development)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51SQKyyHs7hk404x8RSt3SNKgHrim8cx3yk6vA3uymCCK3YwSNdUdKcm5wmBtXfGRJUoW6Q00hqempSpzxiH7LWgS00Yq7Zl6sa
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Get Your Secret Key

**IMPORTANT**: You MUST get your secret key from Stripe Dashboard:

1. Go to [https://dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
2. Click **Reveal test key** for the Secret key
3. Copy the key (starts with `sk_test_...`)
4. Replace `sk_test_YOUR_SECRET_KEY_HERE` in `.env.local`

### 4. Set Up Webhook Secret (Optional but Recommended)

1. Go to [Stripe Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click **Add endpoint**
3. Set endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events to listen to:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.succeeded`
   - `charge.failed`
5. Copy the **Signing secret** (starts with `whsec_...`)
6. Add to `.env.local`

---

## Security Best Practices

### ✅ DO's

1. **ALWAYS use environment variables for API keys**
   ```typescript
   // ✅ CORRECT
   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
   ```

2. **Keep secret keys server-side only**
   - Use secret keys ONLY in `/app/api/` routes
   - Never import server-side utilities in client components

3. **Validate all inputs**
   ```typescript
   // ✅ CORRECT - Validate amount
   if (amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
     throw new Error('Invalid amount');
   }
   ```

4. **Use webhook signature verification**
   ```typescript
   // ✅ CORRECT - Verify webhook signature
   const event = stripe.webhooks.constructEvent(
     body,
     signature,
     webhookSecret
   );
   ```

5. **Implement rate limiting**
   - Add rate limiting middleware to API routes
   - Prevent abuse and DDoS attacks

6. **Use HTTPS in production**
   - Never send payment data over HTTP
   - Stripe will reject HTTP requests in live mode

7. **Log security events**
   ```typescript
   // ✅ CORRECT - Log without exposing sensitive data
   console.log('Payment attempt:', { userId, amount, currency });
   // ❌ WRONG - Don't log sensitive data
   console.log('Card details:', cardNumber, cvv);
   ```

### ❌ DON'Ts

1. **NEVER commit `.env.local` to Git**
   ```bash
   # ❌ WRONG
   git add .env.local

   # ✅ CORRECT - It should be in .gitignore
   ```

2. **NEVER expose secret keys to client**
   ```typescript
   // ❌ WRONG - Secret key in client component
   'use client';
   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

   // ✅ CORRECT - Use only in API routes
   ```

3. **NEVER store card details**
   - Let Stripe handle card data
   - Use Stripe Elements for card input
   - Never store CVV, even encrypted

4. **NEVER skip signature verification on webhooks**
   ```typescript
   // ❌ WRONG - Accepting unverified webhooks
   const event = req.body;

   // ✅ CORRECT - Always verify
   const event = stripe.webhooks.constructEvent(body, signature, secret);
   ```

5. **NEVER trust client-side data**
   ```typescript
   // ❌ WRONG - Using client-provided amount directly
   const amount = req.body.amount;

   // ✅ CORRECT - Calculate amount server-side
   const cart = await getCart(userId);
   const amount = calculateTotal(cart);
   ```

---

## API Key Management

### Key Types and Usage

| Key Type | Prefix | Usage | Exposure |
|----------|--------|-------|----------|
| Publishable Key | `pk_test_` or `pk_live_` | Client-side (browser) | ✅ Safe to expose |
| Secret Key | `sk_test_` or `sk_live_` | Server-side only | ⚠️ NEVER expose |
| Webhook Secret | `whsec_` | Server-side webhook verification | ⚠️ NEVER expose |

### Next.js Environment Variable Naming

```env
# ✅ CORRECT - Client-side (exposed to browser)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# ✅ CORRECT - Server-side only (never exposed)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# ❌ WRONG - Don't prefix secret keys with NEXT_PUBLIC_
NEXT_PUBLIC_STRIPE_SECRET_KEY=sk_test_...  # SECURITY RISK!
```

### Key Rotation

If a secret key is compromised:

1. **Immediately deactivate** the compromised key in Stripe Dashboard
2. Generate a **new key**
3. Update your `.env.local` and deployment environment
4. Restart your application
5. **Audit** recent transactions for suspicious activity

---

## Testing Your Setup

### 1. Verify Environment Variables

```bash
# Check if variables are loaded
npm run dev
```

Check the console for warnings about missing keys.

### 2. Test Payment Intent Creation

```bash
# Test API route
curl -X POST http://localhost:3000/api/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{"amount": 1000, "currency": "usd"}'
```

Expected response:
```json
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx"
}
```

### 3. Test Stripe Test Cards

Use these test cards for development:

| Card Number | Brand | Behavior |
|-------------|-------|----------|
| `4242 4242 4242 4242` | Visa | ✅ Success |
| `4000 0025 0000 3155` | Visa | ⚠️ Requires authentication |
| `4000 0000 0000 9995` | Visa | ❌ Declined |
| `5555 5555 5555 4444` | Mastercard | ✅ Success |

- Use any future expiration date (e.g., 12/25)
- Use any 3-digit CVC
- Use any ZIP code

### 4. Test Webhook Locally

Install Stripe CLI:
```bash
brew install stripe/stripe-cli/stripe
```

Forward webhooks to local server:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Trigger test event:
```bash
stripe trigger payment_intent.succeeded
```

---

## Production Deployment

### Pre-deployment Checklist

- [ ] Replace test keys with production keys
- [ ] Update `NEXT_PUBLIC_APP_URL` to production domain
- [ ] Configure webhook endpoint with production URL
- [ ] Enable HTTPS (required for live mode)
- [ ] Set up rate limiting middleware
- [ ] Configure Content Security Policy (CSP)
- [ ] Enable monitoring and alerting
- [ ] Test payment flow end-to-end
- [ ] Verify webhook signature validation
- [ ] Review error handling and logging

### Environment Variables on Deployment Platform

#### Vercel
```bash
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
```

#### Other Platforms
Add environment variables through your platform's dashboard or CLI.

### Production Security Headers

Add to `next.config.ts`:

```typescript
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' js.stripe.com; frame-src js.stripe.com;"
  }
];
```

---

## Common Security Vulnerabilities

### 1. XSS (Cross-Site Scripting)
**Risk**: Attacker injects malicious scripts to steal payment data

**Prevention**:
- Use Stripe Elements (handles sanitization)
- Never render user input without sanitization
- Set proper Content Security Policy

### 2. CSRF (Cross-Site Request Forgery)
**Risk**: Unauthorized payment requests from malicious sites

**Prevention**:
- Next.js has built-in CSRF protection for API routes
- Verify `Origin` header in webhook handler
- Use SameSite cookies

### 3. Man-in-the-Middle (MITM)
**Risk**: Attacker intercepts payment data in transit

**Prevention**:
- Always use HTTPS in production
- Enable HSTS header
- Use Stripe.js library (end-to-end encryption)

### 4. SQL Injection
**Risk**: Attacker manipulates database queries

**Prevention**:
- Use parameterized queries
- Validate all inputs
- Never concatenate user input into SQL

### 5. Insufficient Input Validation
**Risk**: Processing invalid or malicious payment amounts

**Prevention**:
```typescript
// ✅ CORRECT - Validate all inputs
if (!amount || typeof amount !== 'number') {
  throw new Error('Invalid amount');
}
if (amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
  throw new Error('Amount out of range');
}
```

### 6. API Key Exposure
**Risk**: Secret keys leaked in client-side code or Git

**Prevention**:
- Never commit `.env.local`
- Use `.gitignore` properly
- Scan code for hardcoded secrets
- Use environment variables only

---

## Webhook Security

### Why Webhooks Matter

Webhooks notify your server about payment events. Without proper security:
- Attackers could fake successful payment notifications
- Your system might fulfill orders without actual payment
- Sensitive payment data could be exposed

### Implementing Webhook Security

```typescript
// ✅ CORRECT - Full webhook security
export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  // 1. Verify signature
  const event = stripe.webhooks.constructEvent(
    body,
    signature!,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  // 2. Check event type
  if (!['payment_intent.succeeded', 'charge.succeeded'].includes(event.type)) {
    return NextResponse.json({ received: true });
  }

  // 3. Implement idempotency
  const processed = await checkIfProcessed(event.id);
  if (processed) {
    return NextResponse.json({ received: true });
  }

  // 4. Process event
  await processPayment(event);

  // 5. Mark as processed
  await markAsProcessed(event.id);

  return NextResponse.json({ received: true });
}
```

### Testing Webhook Security

```bash
# Test with invalid signature (should fail)
curl -X POST http://localhost:3000/api/webhooks/stripe \
  -H "Content-Type: application/json" \
  -H "stripe-signature: invalid" \
  -d '{"type": "payment_intent.succeeded"}'

# Expected: 400 Bad Request
```

---

## Troubleshooting

### Issue: "STRIPE_SECRET_KEY is not configured"

**Solution**:
1. Check `.env.local` exists in project root
2. Verify variable name is exact: `STRIPE_SECRET_KEY`
3. Restart development server: `npm run dev`

### Issue: "Invalid API Key"

**Solution**:
1. Verify key starts with `sk_test_` or `sk_live_`
2. Check for extra spaces or newlines
3. Regenerate key in Stripe Dashboard if corrupted

### Issue: "Webhook signature verification failed"

**Solution**:
1. Verify `STRIPE_WEBHOOK_SECRET` is set
2. Check you're using raw body (not parsed JSON)
3. Test with Stripe CLI to confirm endpoint works

### Issue: Keys exposed in Git history

**Solution**:
1. **Immediately** rotate all compromised keys
2. Remove from Git history:
   ```bash
   # Use BFG Repo-Cleaner or git-filter-repo
   git filter-branch --force --index-filter \
     'git rm --cached --ignore-unmatch .env.local' \
     --prune-empty --tag-name-filter cat -- --all
   ```
3. Force push to remote (⚠️ dangerous)
4. Notify your team

---

## Additional Resources

- [Stripe Security Best Practices](https://stripe.com/docs/security/best-practices)
- [PCI DSS Compliance](https://stripe.com/docs/security/stripe)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

---

## Quick Reference

### File Structure
```
pregrade-essentials/
├── .env.local              # ⚠️ NEVER commit (secret keys)
├── .env.example            # ✅ Commit (template)
├── .gitignore              # ✅ Must include .env.local
├── lib/
│   └── stripe.ts           # Stripe utilities
├── app/
│   └── api/
│       ├── create-payment-intent/
│       │   └── route.ts    # Payment Intent API
│       └── webhooks/
│           └── stripe/
│               └── route.ts # Webhook handler
```

### Environment Variables
```env
# Client-side (safe to expose)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Server-side (NEVER expose)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Security Checklist
- [x] `.env.local` in `.gitignore`
- [x] Secret key ONLY in API routes
- [x] Webhook signature verification
- [x] Input validation on all API routes
- [ ] Rate limiting (add for production)
- [ ] HTTPS enabled (required for production)
- [ ] Security headers configured
- [ ] Error handling without data leaks

---

**Last Updated**: 2025-11-05
**Author**: Security Guardian (Claude Code)
**Version**: 1.0.0
