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
npm run check    # type-check (astro check), also runs in CI before the build
npm run format   # format with Prettier (npm run format:check to only report)
npm run icons    # regenerate the favicon and app icons in public/
```

## Where things live

- `src/components/`: page sections, each with its own `*.css.ts` when it needs styles beyond `<Box>` props.
- `src/ui/`: shared primitives (`Box`, `Text`, `Button`, theme tokens, media queries).
- `src/scripts/`: all browser behaviour (header, scroll effects, reveals, hero strips, lightbox, magnetic buttons), started from `main.ts` after first paint. React only renders HTML at build time; no React code ships to the browser.
- `src/lib/`: helpers shared by the build and the scripts (motion tokens, GSAP setup, hero strip geometry, document images).

## Content

All text lives in `src/data/cv.ts`.
The Download CV buttons download the PDF export of the CV Google Doc (`profile.cvPdf`), so edits to the doc show up automatically.

## Deploy

Every push to `master` builds and publishes to GitHub Pages via `.github/workflows/deploy.yml`
(**Settings → Pages → Source** must be **GitHub Actions**).
