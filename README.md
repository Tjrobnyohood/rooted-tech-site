# Rooted Tech Services - is-a.dev Implementation Guide

## 📋 Overview
This guide will help you implement the Rooted Tech Services website on is-a.dev. The website is fully optimized for GitHub Pages deployment with proper SEO, dark theme, and interactive features.

## 🚀 Implementation Steps

### Option 1: Using is-a.dev (Recommended for subdomain)

#### Step 1: Fork the is-a.dev Repository
1. Go to [github.com/is-a-dev/register](https://github.com/is-a-dev/register)
2. Fork the repository to your GitHub account
3. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/register.git
   cd register
   ```

#### Step 2: Create Your Subdomain Configuration
1. Create a new file: `domains/rootedtech.json` (replace `rootedtech` with your desired subdomain)
2. Add the following content:
   ```json
   {
     "owner": {
       "username": "YOUR_GITHUB_USERNAME",
       "email": "tjrob0110@proton.me"
     },
     "record": {
       "CNAME": "YOUR_GITHUB_USERNAME.github.io"
     }
   }
   ```

#### Step 3: Deploy Website to GitHub Pages
1. Create a new repository for your website:
   - Go to GitHub and create a new repository (e.g., `rootedtech-website`)
   
2. Push your files to this repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Rooted Tech Services website"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/rootedtech-website.git
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` → `/ (root)`
   - Click Save

4. Wait a few minutes for GitHub to deploy your site
5. Your site will be available at: `https://YOUR_GITHUB_USERNAME.github.io/rootedtech-website`

#### Step 4: Submit Pull Request to is-a.dev
1. Create a new branch:
   ```bash
   git checkout -b add-rootedtech
   ```

2. Create the domain file:
   ```bash
   mkdir -p domains
   nano domains/rootedtech.json
   ```

3. Add your configuration (from Step 2)

4. Commit and push:
   ```bash
   git add domains/rootedtech.json
   git commit -m "Add rootedtech.is-a.dev"
   git push origin add-rootedtech
   ```

5. Create Pull Request on GitHub

#### Step 5: Configure DNS (if needed)
If you have a custom domain, update your DNS records to point to your GitHub Pages site.

---

### Option 2: Direct GitHub Pages (Simplest)

#### Step 1: Create Repository
1. Create a new repository on GitHub: `rootedtech-website`

#### Step 2: Upload Files
1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/rootedtech-website.git
   cd rootedtech-website
   ```

2. Copy all files to this directory:
   - `index.html`
   - `css/styles.css`
   - `js/tech-jargon.js`

3. Push to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit - Rooted Tech Services website"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/rootedtech-website.git
   git push -u origin main
   ```

#### Step 3: Enable GitHub Pages
1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` → `/ (root)`
4. Click Save
5. Your site will be available at: `https://YOUR_GITHUB_USERNAME.github.io/rootedtech-website`

---

### Option 3: Using Custom Domain (Professional)

#### Step 1: Purchase Domain
1. Purchase a domain (e.g., `rootedtech.com`) from a registrar like:
   - Namecheap
   - GoDaddy
   - Cloudflare

#### Step 2: Deploy to GitHub Pages
Follow Option 2 steps to deploy your website.

#### Step 3: Configure DNS
Add these DNS records to your domain registrar:

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | YOUR_USERNAME.github.io |

#### Step 4: Update GitHub Pages Settings
1. Go to repository Settings → Pages
2. Custom domain: `rootedtech.com`
3. Enforce HTTPS: ✅ Enable

#### Step 5: Update index.html
Update the canonical URL and meta tags in `index.html`:
```html
<link rel="canonical" href="https://rootedtech.com">
<meta property="og:url" content="https://rootedtech.com">
```

---

## 📁 File Structure

```
rootedtech-website/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Streamlined CSS with dark theme
├── js/
│   └── tech-jargon.js  # Interactive jargon library
└── README.md          # This file
```

---

## 🔧 Configuration Checklist

### Before Deployment:
- [ ] Update contact email in all files
- [ ] Verify Formspree form URL is correct
- [ ] Update social media links in JSON-LD
- [ ] Check all image paths (if using custom images)
- [ ] Test the contact form
- [ ] Verify mobile responsiveness

### After Deployment:
- [ ] Test all navigation links
- [ ] Verify jargon library search functionality
- [ ] Test the "Add New Term" feature
- [ ] Check SEO meta tags with [Rich Results Test](https://search.google.com/test/rich-results)
- [] Validate HTML with [W3C Validator](https://validator.w3.org/)
- [ ] Test on multiple devices and browsers

---

## 🎯 Recommended Implementation Path

### For is-a.dev Subdomain:
1. **Follow Option 1** above
2. Result: `https://rootedtech.is-a.dev`

### For Professional Branding:
1. **Follow Option 3** above
2. Result: `https://rootedtech.com`

### For Quick Testing:
1. **Follow Option 2** above
2. Result: `https://YOUR_USERNAME.github.io/rootedtech-website`

---

## 🔍 SEO Verification

After deployment, verify your SEO:

1. **Google Rich Results Test:**
   - Go to [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
   - Enter your website URL
   - Check for JSON-LD errors

2. **Facebook Sharing Debugger:**
   - Go to [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug/)
   - Test your Open Graph tags

3. **Twitter Card Validator:**
   - Go to [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator)
   - Test your Twitter cards

---

## 🐛 Troubleshooting

### Common Issues:

**Site not loading:**
- Wait 5-10 minutes for GitHub Pages to build
- Check repository Settings → Pages for build status

**Styles not loading:**
- Verify CSS file path: `css/styles.css`
- Check case sensitivity (GitHub Pages is case-sensitive)

**JavaScript not working:**
- Verify JS file path: `js/tech-jargon.js`
- Check browser console for errors

**Form not submitting:**
- Verify Formspree form URL is correct
- Check Formspree dashboard for submissions

---

## 📞 Support

If you encounter issues:
1. Check [GitHub Pages Documentation](https://docs.github.com/en/pages)
2. Visit [is-a.dev Documentation](https://github.com/is-a-dev/register)
3. Review [GitHub Status](https://www.githubstatus.com/)

---

## ✨ Next Steps

After successful deployment:

1. **Submit to Search Engines:**
   - Google Search Console
   - Bing Webmaster Tools

2. **Add Analytics:**
   - Google Analytics
   - Plausible (privacy-focused alternative)

3. **Set Up Monitoring:**
   - Uptime monitoring
   - SSL certificate monitoring

4. **Create Backups:**
   - Regular git commits
   - Cloud storage backup

---

**Best Implementation Choice:** Start with **Option 1** for an is-a.dev subdomain, then migrate to **Option 3** for a custom domain when ready for professional branding.