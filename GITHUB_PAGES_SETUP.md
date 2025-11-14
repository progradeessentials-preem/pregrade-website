# GitHub Pages Deployment - Complete Setup Guide

## ✅ What's Already Done

Your codebase is now production-ready for GitHub Pages:
- ✅ Stripe code removed (now contact-form based checkout)
- ✅ Configured for static export
- ✅ Git repository initialized with initial commit
- ✅ GitHub Actions workflow created (auto-deploys on push)
- ✅ Build tested successfully

---

## 🚀 Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. **Repository name**: `pregrade-essentials` (or any name you prefer)
3. **Visibility**: Public (required for free GitHub Pages)
4. **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **Create repository**

---

## 📤 Step 2: Push Code to GitHub

Copy and run these commands in your terminal (replace `YOUR_USERNAME` with your GitHub username):

```bash
# Set your GitHub remote URL
git remote add origin https://github.com/YOUR_USERNAME/pregrade-essentials.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/johndoe/pregrade-essentials.git
git branch -M main
git push -u origin main
```

You'll be prompted for your GitHub credentials.

---

## ⚙️ Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. In the left sidebar, click **Pages**
4. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions**
   - (Do NOT use "Deploy from a branch" - we use Actions)
5. Click **Save**

That's it! The GitHub Actions workflow will automatically deploy your site.

---

## 🌐 Step 4: Configure Custom Domain (GoDaddy)

### Get Your GitHub Pages URL

After the first deployment (takes ~2 minutes), your site will be live at:
```
https://YOUR_USERNAME.github.io/pregrade-essentials/
```

### GoDaddy DNS Configuration

In your GoDaddy DNS Management (where you took that screenshot):

#### Option A: Apex Domain (progradeessentials.com)

**Add these A records:**
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 1 Hour

Type: A
Name: @
Value: 185.199.109.153
TTL: 1 Hour

Type: A
Name: @
Value: 185.199.110.153
TTL: 1 Hour

Type: A
Name: @
Value: 185.199.111.153
TTL: 1 Hour
```

**Add CNAME for www:**
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
TTL: 1 Hour
```

#### Option B: Subdomain (www.progradeessentials.com)

**Just add this CNAME:**
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
TTL: 1 Hour
```

### Configure Custom Domain in GitHub

1. Go to GitHub repository **Settings** > **Pages**
2. Under **Custom domain**, enter: `progradeessentials.com`
3. Click **Save**
4. Wait for DNS check (may take 5-60 minutes)
5. ✅ Check **Enforce HTTPS** (after DNS propagates)

---

## 🔄 Automatic Deployments

Every time you push to the `main` branch, GitHub Actions will:
1. Build your Next.js site
2. Export static files
3. Deploy to GitHub Pages
4. Your site updates automatically at `progradeessentials.com`

```bash
# To update your site:
git add .
git commit -m "Update content"
git push

# GitHub Actions deploys automatically in ~2 minutes
```

---

## 📋 GoDaddy DNS Summary (Quick Reference)

### What to DELETE:
- ❌ Old A records (15.197.225.128, 3.33.251.168)
- ❌ Any old CNAME pointing to other services

### What to ADD:
**For Apex Domain (recommended):**
```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   YOUR_USERNAME.github.io
```

**Keep these (don't touch):**
```
NS    @     ns35.domaincontrol.com
NS    @     ns36.domaincontrol.com
```

---

## ✅ Verification Checklist

After setup, verify these:

- [ ] Repository exists on GitHub
- [ ] Code pushed successfully (`git push` worked)
- [ ] GitHub Actions ran (check **Actions** tab)
- [ ] Site live at `YOUR_USERNAME.github.io/pregrade-essentials`
- [ ] DNS records added in GoDaddy
- [ ] Custom domain configured in GitHub Settings > Pages
- [ ] DNS check passed (green checkmark in GitHub)
- [ ] HTTPS enforced
- [ ] Site loads at `https://progradeessentials.com`
- [ ] www subdomain redirects to apex

---

## 🆘 Troubleshooting

### "Permission denied" when pushing to GitHub
```bash
# Use HTTPS with token:
# 1. Generate token: GitHub Settings > Developer settings > Personal access tokens
# 2. Use token as password when prompted
```

### GitHub Actions workflow failing
- Check **Actions** tab for error logs
- Most common: Build errors (run `npm run build` locally to test)
- Fix errors, commit, and push again

### Custom domain not connecting
1. Wait 30-60 minutes for DNS propagation
2. Verify A records in GoDaddy match exactly
3. Check DNS propagation: https://dnschecker.org
4. Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)

### Site shows 404 after deployment
- Ensure custom domain is set in GitHub Pages settings
- Check `.nojekyll` file exists in repository root
- Verify GitHub Actions completed successfully (green checkmark)

---

## 📊 Monitoring Your Site

### GitHub Actions
- View deployments: Repository > **Actions** tab
- Each push creates a new workflow run
- Green checkmark = successful deployment
- Red X = build failed (check logs)

### Analytics (Optional)
Add Google Analytics 4:
1. Create GA4 property at https://analytics.google.com
2. Add tracking code to `app/layout.tsx`
3. Monitor traffic, conversions, user behavior

---

## 🎯 Your Live URLs (After Setup)

- **Production**: https://progradeessentials.com
- **WWW**: https://www.progradeessentials.com (redirects to apex)
- **GitHub Pages**: https://YOUR_USERNAME.github.io/pregrade-essentials/

---

## 💰 Costs

- **GitHub Pages**: FREE (public repositories)
- **GoDaddy Domain**: ~$15-20/year (you already own it)
- **No hosting fees** - GitHub hosts everything free
- **No build fees** - GitHub Actions free for public repos

**Total ongoing cost:** ~$15-20/year for domain renewal only!

---

## 🔐 Security Notes

- All pages served over HTTPS (free SSL from GitHub)
- No sensitive data (static site, no database)
- No API keys needed (removed Stripe)
- Contact form is client-side only (consider adding email service like EmailJS or Formspree)

---

## 📞 Next Steps

1. **Run the commands in Step 2** to push to GitHub
2. **Enable GitHub Pages** in repository settings (Step 3)
3. **Configure GoDaddy DNS** with the A records above (Step 4)
4. **Wait 30-60 minutes** for DNS propagation
5. **Verify site loads** at progradeessentials.com

Your site will be live!

---

## 🎉 Success!

Once complete, you'll have:
- ✅ Professional e-commerce site
- ✅ Custom domain (progradeessentials.com)
- ✅ Free hosting on GitHub Pages
- ✅ Auto-deploy on every push
- ✅ Free SSL certificate
- ✅ Global CDN delivery

**Share your site:** https://progradeessentials.com
