# CLAUDE.md

Personal site of Guillaume Damiens (guillaumedamiens.com): home (intro, projects, photo and video previews, contact), `/photos`, `/videos`, `/mentions-legales` (footer link). In French. React 19 + TypeScript + Vite + React Router (`createBrowserRouter`); no other runtime dependency, no backend call.

## Commands

```bash
npm run dev      # localhost:3000
npm run lint
npm run format   # Prettier (printWidth 140)
npm run build    # tsc -b then vite build
```

## Structure (`src/`)

- `content.ts`: every text, link, photo and video. Pages only lay it out.
- `main.tsx`: router (layout route + pages). A new page also goes into `pages` in `vite.config.ts`, which copies `index.html` into `dist/<page>/` (nginx serves files only: `try_files $uri $uri/index.html $uri/ =404`, no redirect to `/photos/`).
- `components/`: `Layout` (header, footer, skip link, `ScrollRestoration`), `PhotoGrid` + `Lightbox` (native `<dialog>`, arrows and Escape), `VideoEmbed` (click to load: youtube-nocookie / Vimeo `dnt`).
- `pages/`: `Home`, `Photos`, `Videos`, `Legal`, `NotFound`. Page titles with React 19's `<title>`.
- `styles/global.css`: design tokens (CSS variables, light and dark through `prefers-color-scheme`), base styles. Components and pages use CSS Modules.
- `photos/`: WebP, 800 px (grid) and 2048 px (lightbox) long edge, no metadata.

## Deployment

Tag `v*` on master → `.github/workflows/deploy.yml`: build, archive in the tag's GitHub release, downloaded by the VPS (`deploy` user) into `/var/www/guillaumedamiens-site/releases/<name>`, `current` link switched atomically, 5 releases kept, then the pages are checked over HTTPS. nginx (`/etc/nginx/sites-enabled/default`, server `guillaumedamiens.com`, not in a repo) serves `current` and proxies `/api/` to the backend.

## Design

Restrained and editorial: paper background, serif headings (system serif stack), system sans text, one accent color for hover and focus, thin rules between sections. No gradients, glass effects, shadows or entrance animations; no web font requests. Every image has a real `alt` describing what it shows; interactive elements are buttons or links with visible focus.
