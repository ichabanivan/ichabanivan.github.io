# Ivan Chaban: CV site

**Live:** https://ichabanivan.github.io/

**Storybook:** https://ichabanivan.github.io/storybook/

Single-page CV built with Astro, React, vanilla-extract and GSAP.

## Commands

Requires Node.js 26.

```sh
npm install
npm run dev      # local dev server
npm run build    # static build into dist/
npm run preview  # serve the built site
npm run check    # type-check (astro check)
npm run lint     # ESLint (npm run lint:fix to apply autofixes)
npm run test:e2e # Playwright smoke tests against a fresh production build
npm run storybook        # component workshop on http://localhost:6006
npm run build-storybook  # static Storybook into storybook-static/
npm run format   # format with Prettier (npm run format:check to only report)
npm run icons    # regenerate the favicon and app icons in public/
npm run links    # request every external link in the built page (run npm run build first)
```

## Where things live

- `src/ui/`: shared primitives (`Box`, `Text`, `Button`, `Card`, `Container`, `PrintOnly`, `ScreenOnly`, `VerifyLink`).
- `src/components/`: page sections and their parts.
- `src/styles/`: theme tokens, global styles, media queries, accessibility helpers, shared layout values.
- `src/scripts/`: all browser behaviour (header, scroll effects, reveals, hero strips, lightbox, magnetic buttons), started from `main.ts` after first paint. Each `init*` function returns its cleanup. React only renders HTML at build time; no React code ships to the browser.
- `src/lib/`: helpers shared by the build and the scripts (motion tokens, GSAP setup, hero strip geometry, document images).
- `tests/`: Playwright smoke tests for the built site (reveals, reduced motion, no JavaScript, script failure, lightbox, navigation), on a desktop and a mobile viewport.
- `src/stories/`: fixtures and decorators shared by stories.
- `.storybook/`: Storybook configuration (theme and viewport toolbars, accessibility addon, autodocs).

## Component conventions

- One component per file, named exports only.
- A component with more than one file lives in a folder named after it. The folder's `index.ts` contains only re-exports.
- A private part that needs several files gets its own folder inside its parent; a single-file part stays a file in the parent folder.
- Styles sit next to the component as `Name.css.ts`, stories as `Name.stories.tsx`.
- Import a component from its folder (`'../Section'`), not from the file inside it.
- No comments in the code; names carry the meaning.

```
Experience/
  index.ts
  Experience.tsx
  Experience.stories.tsx
  EmployerHeader.tsx
  EmployerEntry/
    index.ts
    EmployerEntry.tsx
    EmployerEntry.stories.tsx
```

## Content

All text lives in `src/data/cv.ts`.
The Download CV buttons download the PDF export of the CV Google Doc (`profile.cvPdf`), so edits to the doc show up automatically.

## Deploy

`.github/workflows/deploy.yml` runs the format check, ESLint, the type-check, the site build, the Storybook build and the Playwright smoke tests on every pull request.
A push to `master` runs the same steps and then publishes the site to GitHub Pages, with Storybook under `/storybook/` (kept out of search engines by `robots.txt`)
(**Settings → Pages → Source** must be **GitHub Actions**).

`.github/workflows/links.yml` builds the site and runs `npm run links` on the first day of every month; a broken CV or certificate link fails the run.
`.github/dependabot.yml` opens one grouped pull request a week for npm packages and one for GitHub Actions.

`src/pages/404.astro` becomes `404.html`, which GitHub Pages serves for unknown addresses.
`src/pages/llms.txt.ts` generates `llms.txt`, a Markdown summary of the CV for language models, from `src/data/cv.ts`.
The `dateModified` value in the structured data is the date of the last commit that changed `src/data/cv.ts`, so the build needs the full git history (`fetch-depth: 0`).
