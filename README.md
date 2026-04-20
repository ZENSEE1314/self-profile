# Zen See — Portfolio

Standalone developer portfolio with SEO, 3D scroll animations, and an embedded
sales chat. Built with React + TypeScript + Tailwind, deployed on Railway.

## Local dev

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # production bundle in dist/
npm start       # serve the built bundle on $PORT (default 3000)
```

## Customising

All content lives in the `DEV` object at the top of
[`src/PortfolioPage.tsx`](src/PortfolioPage.tsx) — name, stats, services,
projects, testimonials. Edit that object; everything else follows.

## Deploying on Railway

1. Push to GitHub.
2. In Railway: **New Project → Deploy from GitHub repo → self-profile**.
3. Railway picks up `railway.json` automatically:
   - Build: `npm ci && npm run build`
   - Start: `npx serve -s dist -l $PORT`
4. Generate a public domain under the service's **Settings → Networking**.

No environment variables required.
