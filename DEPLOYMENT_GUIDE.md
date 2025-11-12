# Production Deployment Guide - PreGrade Essentials

This guide walks you through deploying your Next.js website to production using Vercel and connecting your GoDaddy domain.

## Why Vercel Instead of GoDaddy Direct Hosting?

**GoDaddy doesn't support Next.js applications directly** because:
- Next.js requires Node.js runtime (GoDaddy is traditional PHP/HTML hosting)
- Server-side rendering and API routes need a Node.js environment
- No GitHub auto-deployment integration

**Vercel is the optimal solution:**
- ✅ Built by the Next.js team - native support
- ✅ Free hobby tier (perfect for your site)
- ✅ Automatic GitHub deployments (push to deploy)
- ✅ Edge network CDN for fast global delivery
- ✅ Automatic HTTPS/SSL certificates
- ✅ Zero configuration required

## 🚀 Step 1: Deploy to Vercel

### 1.1 Push Code to GitHub

```bash
# If not already in GitHub, initialize and push:
git init
git add .
git commit -m "Initial production-ready commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pregrade-essentials.git
git push -u origin main
```

### 1.2 Connect Vercel to GitHub

1. Go to https://vercel.com/signup
2. Click **"Sign up with GitHub"**
3. Authorize Vercel to access your repositories
4. Click **"Import Project"**
5. Select your `pregrade-essentials` repository
6. Vercel will auto-detect Next.js configuration

### 1.3 Configure Environment Variables

In the Vercel import screen, add these environment variables:

**Click "Environment Variables" and add:**

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_ACTUAL_KEY
STRIPE_SECRET_KEY=sk_live_YOUR_ACTUAL_KEY
NEXT_PUBLIC_APP_URL=https://progradeessentials.com
```

⚠️ **Important**: Use your **PRODUCTION** Stripe keys from https://dashboard.stripe.com/apikeys (toggle off "Test mode")

**Leave STRIPE_WEBHOOK_SECRET empty for now** - we'll add it after deployment.

### 1.4 Deploy

Click **"Deploy"** - Vercel will:
- Install dependencies
- Run production build
- Deploy to global edge network
- Provide a temporary `.vercel.app` URL

Your site will be live at: `https://pregrade-essentials-xxxxx.vercel.app`

---

## 🌐 Step 2: Connect Your GoDaddy Domain

You'll keep GoDaddy as your domain registrar but point DNS to Vercel.

### 2.1 Get Vercel DNS Records

1. In Vercel dashboard, go to your project
2. Click **Settings** > **Domains**
3. Enter: `progradeessentials.com`
4. Click **Add**
5. Vercel will show you DNS records to configure

You'll see something like:
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

### 2.2 Configure GoDaddy DNS

**In GoDaddy (where you took that screenshot):**

1. Go to **DNS Management** for progradeessentials.com
2. **Delete existing A records** pointing to old IPs (15.197.225.128, 3.33.251.168)
3. **Add Vercel's A record**:
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21` (Vercel's IP - **use the actual one Vercel provides**)
   - TTL: `1 Hour`

4. **Delete or update WWW record**:
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: `1 Hour`

5. **Keep your NS records** (ns35/ns36.domaincontrol.com) - don't touch these!

6. Click **Save**

### 2.3 Verify Domain in Vercel

1. Go back to Vercel > Settings > Domains
2. Click **Verify** next to progradeessentials.com
3. Wait 5-60 minutes for DNS propagation
4. Vercel will automatically provision SSL certificate

✅ Your site will be live at: **https://progradeessentials.com**

---

## 🔒 Step 3: Configure Stripe Webhooks

Now that your domain is live, set up Stripe webhooks for order processing.

### 3.1 Create Production Webhook

1. Go to https://dashboard.stripe.com/webhooks (ensure "Live mode" is ON)
2. Click **Add endpoint**
3. Enter endpoint URL: `https://progradeessentials.com/api/webhooks/stripe`
4. Select events to listen to:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Click **Add endpoint**

### 3.2 Get Webhook Secret

1. Click on your newly created webhook
2. Copy the **Signing secret** (starts with `whsec_`)
3. Go to Vercel dashboard > Settings > Environment Variables
4. Add new variable:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_ACTUAL_SECRET
   ```
5. Click **Save**
6. Vercel will auto-redeploy with the new variable

### 3.3 Test Webhook

1. In Stripe dashboard, go to your webhook
2. Click **Send test webhook**
3. Select `payment_intent.succeeded`
4. Click **Send test webhook**
5. Verify it shows "Succeeded" in Stripe dashboard

---

## 🔄 Step 4: Continuous Deployment (Auto-Deploy)

Now every time you push to GitHub, Vercel will automatically deploy!

```bash
# Make changes to your code
git add .
git commit -m "Update pricing"
git push

# Vercel automatically:
# 1. Detects the push
# 2. Runs build
# 3. Deploys to production
# 4. Updates https://progradeessentials.com
```

**Preview Deployments:**
- Every pull request gets its own preview URL
- Test changes before merging to main
- Share previews with team/clients

---

## ✅ Post-Deployment Checklist

After going live, verify:

- [ ] **Domain works**: https://progradeessentials.com loads
- [ ] **WWW redirect**: https://www.progradeessentials.com redirects to apex
- [ ] **SSL certificate**: Padlock icon in browser (automatic via Vercel)
- [ ] **Stripe checkout**: Test a purchase in production mode
- [ ] **Webhook events**: Verify orders create in Stripe dashboard
- [ ] **Cart persistence**: Add to cart, refresh page, cart persists
- [ ] **Mobile responsive**: Test on phone
- [ ] **Page speed**: Test with PageSpeed Insights
- [ ] **404 pages**: Test broken links handle gracefully
- [ ] **Sitemap**: Visit https://progradeessentials.com/sitemap.xml
- [ ] **Robots.txt**: Visit https://progradeessentials.com/robots.txt

---

## 📊 Monitoring & Analytics

### Vercel Analytics (Built-in)
- Go to your project > Analytics tab
- View real-time page views, unique visitors
- Track Web Vitals (performance metrics)
- **Free** on hobby tier

### Add Google Analytics (Optional)
1. Create GA4 property
2. Add tracking ID to `app/layout.tsx`
3. Monitor traffic, conversions, user behavior

### Stripe Dashboard
- Monitor sales, revenue, failed payments
- Set up email alerts for failed payments
- Track refunds and disputes

---

## 🆘 Troubleshooting

### Domain not connecting after 1 hour?
1. Verify DNS records match exactly what Vercel shows
2. Use https://dnschecker.org to check propagation
3. Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)
4. Try incognito/private browsing

### Stripe webhook failing?
1. Verify webhook URL is exact: `https://progradeessentials.com/api/webhooks/stripe`
2. Check signing secret matches in Vercel environment variables
3. Look at Vercel logs: Project > Deployments > [Latest] > Function Logs
4. Test with Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

### Build failing on Vercel?
1. Check Vercel logs for specific error
2. Verify environment variables are set
3. Test build locally: `npm run build`
4. Ensure `package.json` has correct Next.js version

### Site is slow?
- Vercel edge network is very fast by default
- Check images are optimized (use Next.js Image component)
- Review Vercel Analytics > Web Vitals tab
- Consider enabling Vercel Image Optimization (paid feature)

---

## 💰 Costs

**Vercel:**
- Hobby tier: **FREE** (100GB bandwidth/month)
- Your site easily fits in free tier
- Only upgrade if you exceed 100GB/month (very unlikely)

**GoDaddy:**
- Domain registration: ~$15-20/year (you already own it)
- No hosting costs (Vercel handles hosting)

**Stripe:**
- 2.9% + $0.30 per successful transaction
- No monthly fees

**Total ongoing cost:** ~$15-20/year for domain + Stripe fees

---

## 🎯 Next Steps After Deployment

1. **Set up email** for support@progradeessentials.com (use Google Workspace or Zoho)
2. **Add social media links** to footer (update `components/layout/Footer.tsx`)
3. **Submit sitemap** to Google Search Console
4. **Enable Vercel Web Analytics** for free traffic insights
5. **Create backup** of environment variables
6. **Document Stripe webhook events** for future reference
7. **Set up monitoring** (Vercel will email on deployment failures)

---

## 📝 Quick Reference

**Deploy Commands:**
```bash
git add .
git commit -m "Your change description"
git push  # Auto-deploys to Vercel
```

**Local Development:**
```bash
npm run dev          # Start dev server
npm run build        # Test production build
npm run start        # Test production locally
```

**Key URLs:**
- **Production site**: https://progradeessentials.com
- **Vercel dashboard**: https://vercel.com/dashboard
- **Stripe dashboard**: https://dashboard.stripe.com
- **GoDaddy DNS**: https://dcc.godaddy.com/control/progradeessentials.com/dns

**Environment Variables Reference:**
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=https://progradeessentials.com
```

---

## 🎉 You're Live!

Congratulations! Your PreGrade Essentials e-commerce site is now:
- ✅ Live on your custom domain
- ✅ SSL-secured (HTTPS)
- ✅ Auto-deploying from GitHub
- ✅ Processing real payments via Stripe
- ✅ Optimized for performance and SEO
- ✅ Globally distributed via Vercel edge network

**Share your site:** https://progradeessentials.com

For questions or issues, refer to:
- Vercel docs: https://vercel.com/docs
- Next.js docs: https://nextjs.org/docs
- Stripe docs: https://stripe.com/docs
