# Quick Start - Deploy to Production

## TL;DR Version (3 Steps)

### 1️⃣ Push to GitHub
```bash
git add .
git commit -m "Production ready"
git push origin main
```

### 2️⃣ Deploy to Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repo
3. Add environment variables:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = your Stripe publishable key
   - `STRIPE_SECRET_KEY` = your Stripe secret key
   - `NEXT_PUBLIC_APP_URL` = https://progradeessentials.com
4. Click Deploy

### 3️⃣ Point Your GoDaddy Domain
In GoDaddy DNS settings, update:
- **A record** `@` → Point to Vercel's IP (shown in Vercel dashboard)
- **CNAME** `www` → Point to `cname.vercel-dns.com`

**Done!** Your site will be live at https://progradeessentials.com in 5-60 minutes.

---

## Need More Details?

Read the full deployment guide: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## Environment Variables You'll Need

Get these from your Stripe dashboard (https://dashboard.stripe.com):

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_KEY
STRIPE_SECRET_KEY=sk_live_YOUR_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET (add after deployment)
NEXT_PUBLIC_APP_URL=https://progradeessentials.com
```

⚠️ **Use LIVE keys for production** (toggle off "Test mode" in Stripe)

---

## First Time Setup

If starting fresh:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test production build
npm run build
```

Visit http://localhost:3000 to see your site.

---

## Automatic Deployments

After initial setup, every push to `main` branch auto-deploys:

```bash
git add .
git commit -m "Update content"
git push
# Vercel automatically deploys!
```

---

## Support

- 📖 Full guide: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- 🐛 Issues: Check Vercel logs or Stripe webhook logs
- 💬 Questions: support@progradeessentials.com
