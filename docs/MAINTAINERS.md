# Maintainers Guide

Internal deployment notes for the `reactilities-website` repository.

## Deploy to GitHub Pages (separate repository)

Assumes:

- this repository contains the website code,
- workflow exists at `.github/workflows/deploy-pages.yml`,
- target GitHub repository is already created.

### 1) Initialize and connect local repository

Run from project root:

```bash
git init
git add .
git commit -m "Initial website setup"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

If `origin` already exists, update it instead:

```bash
git remote set-url origin https://github.com/<your-username>/<your-repo>.git
```

### 2) Enable GitHub Pages via Actions

In GitHub repository:

1. Open `Settings`.
2. Open `Pages`.
3. Set `Source` to `GitHub Actions`.

### 3) Trigger deployment

Any push to `main` triggers deploy automatically.

You can also run it manually from `Actions` -> `Deploy Next.js static export to GitHub Pages` -> `Run workflow`.

### 4) Verify live URL

Project Pages URL format:

- `https://<your-username>.github.io/<your-repo>/`

### 5) Update production SEO URLs

Set your real production URL in:

- `public/sitemap.xml`
- `public/robots.txt`

Then commit and push again:

```bash
git add public/sitemap.xml public/robots.txt
git commit -m "Set production sitemap and robots URLs"
git push
```

## Optional: custom domain

If you later move from project pages to custom domain:

1. Add `public/CNAME` with your domain, for example `reactilities.dev`.
2. In workflow/build environment use your domain as site URL.
3. Point DNS records to GitHub Pages.
4. Rebuild and redeploy.
