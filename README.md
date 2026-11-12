# Ivan Chaban: CV site

**Live:** https://ichabanivan.github.io/

Single-page CV built with Astro, React, vanilla-extract and GSAP.

## Commands

Requires Node.js 26.

```sh
npm install
npm run dev      # local dev server
npm run build    # static build into dist/
npm run preview  # serve the built site
```

## Content

All text lives in `src/data/cv.ts`.
The Download CV buttons download the PDF export of the CV Google Doc (`profile.cvPdf`), so edits to the doc show up automatically.

## Deploy

Every push to `master` builds and publishes to GitHub Pages via `.github/workflows/deploy.yml`
(**Settings → Pages → Source** must be **GitHub Actions**).
