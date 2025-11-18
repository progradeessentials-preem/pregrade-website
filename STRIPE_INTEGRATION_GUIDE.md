# Stripe Integration Guide

## ✅ What Was Fixed

**Problem:** Your website was showing **$74.99** (hardcoded in `lib/products.ts`), but your Stripe account has the product at **$1.00**.

**Solution:** Integrated Stripe Products API to fetch live product data directly from your Stripe account.

---

## 🎯 Current Setup

### Your Stripe Product
- **Product Name**: Pocket Scope
- **Product ID**: `prod_TRRrOyCKHF6hcL`
- **Price**: $1.00 USD
- **Price ID**: `price_1SUYxlHs7hk404x80nA0bylC`
- **Image**: Hosted on Stripe

### How It Works Now

1. **Server-Side**: Products are fetched directly from Stripe at build/render time
2. **No Caching Issues**: Data updates when you change prices in Stripe Dashboard
3. **Single Source of Truth**: Stripe Dashboard controls all product data

---

## 📝 How to Update Prices

### Option 1: Update Existing Price (Recommended for Testing)

1. Go to https://dashboard.stripe.com/test/products
2. Click on "Pocket Scope"
3. Click "Add another price"
4. Enter new price (e.g., $74.99)
5. Save
6. Refresh your website - new price appears automatically

### Option 2: Edit Product (Stripe Best Practice)

**Note:** You can't edit an existing price in Stripe (by design). Instead:

1. Create a NEW price for the product
2. Set the new price as "Default"
3. Archive the old $1.00 price
4. Website automatically uses the new default price

---

## 🔧 Technical Architecture

### Files Created/Modified

**New Files:**
- `app/api/products/route.ts` - API endpoint to fetch Stripe products
- `lib/stripe-products-server.ts` - Server-side Stripe product fetching
- `scripts/check-stripe-products.js` - Helper script to check Stripe products

**Modified Files:**
- `app/products/page.tsx` - Now fetches from Stripe instead of hardcoded data
- `.env.local` - Updated `NEXT_PUBLIC_APP_URL` to port 3004

**Data Flow:**
```
Stripe Dashboard (update price)
       ↓
Stripe API
       ↓
lib/stripe-products-server.ts (fetchStripeProductsServer)
       ↓
app/products/page.tsx (displays products)
       ↓
User sees live price from Stripe
```

---

## 🧪 Testing Checklist

### ✅ Completed
- [x] Stripe API integration working
- [x] Products page shows live Stripe data
- [x] Price displays correctly ($1.00 USD)
- [x] Product image loads from Stripe
- [x] Product description from Stripe

### 🔄 Next Steps
- [ ] Test "Add to Cart" with Stripe product
- [ ] Test checkout flow with Stripe price
- [ ] Verify PaymentIntent uses correct priceId
- [ ] Update Stripe price to production amount ($74.99)
- [ ] Test on production deployment

---

## 🚀 Production Deployment

Before going live:

1. **Update Price in Stripe:**
   ```bash
   # Go to Stripe Dashboard
   # Products → Pocket Scope → Add another price
   # Enter: $74.99
   # Set as default
   ```

2. **Switch to Live Keys:**
   ```env
   # In Vercel/production .env
   STRIPE_SECRET_KEY=sk_live_... (not sk_test_...)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_... (not pk_test_...)
   ```

3. **Create Product in Live Mode:**
   - Switch Stripe Dashboard to "Live" mode
   - Create "Pocket Scope" product again
   - Set price to $74.99
   - Upload product images

4. **Deploy:**
   ```bash
   git add .
   git commit -m "feat: integrate Stripe Products API for live pricing"
   git push
   ```

---

## 🛠️ Helpful Commands

### Check Stripe Products
```bash
node scripts/check-stripe-products.js
```

### Test API Endpoint
```bash
curl http://localhost:3004/api/products | jq
```

### View Stripe Dashboard
- Test Mode: https://dashboard.stripe.com/test/products
- Live Mode: https://dashboard.stripe.com/products

---

## 📚 Documentation

- Stripe Products API: https://docs.stripe.com/api/products
- Stripe Prices API: https://docs.stripe.com/api/prices
- Stripe Node.js: https://github.com/stripe/stripe-node

---

## ⚠️ Important Notes

1. **Test vs Live Mode**: Always use test keys in development
2. **Price Updates**: Changes in Stripe Dashboard reflect immediately (no code deployment needed)
3. **Product Images**: Upload high-quality images to Stripe Dashboard
4. **Webhooks**: For inventory/stock management, set up Stripe webhooks
5. **Caching**: Products are cached for 5 minutes in production for performance

---

## 🎯 Summary

**Before:** Website showed $74.99 (hardcoded)
**After:** Website shows $1.00 (live from Stripe)

**To change price:** Update in Stripe Dashboard → Automatic on website ✨

**Next:** Test checkout flow and update to production price ($74.99) when ready!
