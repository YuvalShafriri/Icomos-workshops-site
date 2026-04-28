# InSites — אתר.בוט

Hebrew-first React/Vite SPA for the **InSites** cultural-significance-assessment workshops (CBSA methodology) run with ICOMOS Israel. Participants use the site to walk through the seven-stage assessment process, generate prompts for the אתר.בוט AI assistant, and explore knowledge-graph and visual analyses of heritage sites.

This is the `main` branch — the **long-running production state** of the home view (full resource list: bot links, dashboard demos, inspiration links, source-prompt link). Workshop-specific variants live on side branches (see below).

- **Deploys to** `/icomos/workshop` on the host (same path across branches).
- **Authors:** Yuval Shafriri (development) · Dr. Yael Alef (heritage methodology).

## Branches

- `main` — this branch. The pre-workshop / general-audience home view. Stable; used for the standing deploy.
- [`betsalel-workshop`](https://github.com/YuvalShafriri/Icomos-workshops-site/tree/betsalel-workshop) — Bezalel workshop variant: simplified home view (three AI-bot rows including a Claude Project link, hidden survey / agent-builder / "השראה" sections, larger typography). Branched off `main` at `1497f4d`. Workshop-bound; **not** to be merged back here.

When a new workshop runs, branch off `main` (don't fork from a previous workshop branch). After the workshop, redeploy `main` to restore the standing home view.

## External references

The "אתר.בוט" system prompts ("המוח של אתר.בוט") live in separate GitHub repos — linked out from the home view, not bundled here.

- **Current / canonical** (the brain running in the Bezalel-workshop Gemini and Claude bots): [InSites-Lab/Insites-CAA2026 @ betsalel-1.1.0](https://github.com/InSites-Lab/Insites-CAA2026/tree/betsalel-1.1.0) — folder [InSites-Brain/](https://github.com/InSites-Lab/Insites-CAA2026/tree/betsalel-1.1.0/InSites-Brain).
- **Original Hebrew version** (what `main`'s home view currently links to): [atar.bot-Icomos.Israel · Bot-Brain-he.md](https://github.com/YuvalShafriri/atar.bot-Icomos.Israel/blob/main/Bot-Brain-he.md).

If the prompts move, update the `href` in `App.tsx`.

## Stack

React 19 · Vite 6 · TypeScript · Tailwind 4 · `@google/genai` (Gemini API) · `lucide-react` · `vis-network` (knowledge graph).

## Run locally

```bash
npm install
cp .env.example .env.local   # then set GEMINI_API_KEY
npm run dev                  # default port 3000
```

If another vite project on your machine already holds port 3000, vite may bind silently while the browser loads the wrong app. Run on a free port instead: `npm run dev -- --port 3001`.

```bash
npm run build      # outputs dist/
npm run preview    # serves dist/ for a local sanity-check
```

## Hash routes (deep links)

The app routes via URL hash — examples:

- `/#step-0` … `/#step-6` — the seven CBSA stages
- `/#welcome` · `/#tools` · `/#prompts` · `/#principles` — overlays / modals
- `/#graph-create` · `/#graph` — knowledge-graph input + results
- `/#visual` — visual-analysis modal
- `/#inventory` — MA-RC inventory instructions
- `/#q-narratives` · `/#q-sentiment` · `/#q-education` · `/#q-semiotics` · `/#q-jester` · `/#q-chorus` · `/#q-jester-chorus` — research-query modals
