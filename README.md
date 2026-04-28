# InSites — אתר.בוט

Hebrew-first React/Vite SPA for the **InSites** cultural-significance-assessment workshops (CBSA methodology) run with ICOMOS Israel. Participants use the site to walk through the seven-stage assessment process, generate prompts for the אתר.בוט AI assistant, and explore knowledge-graph and visual analyses of heritage sites.

- **Deploys to** `/icomos/workshop` on the host (same path across branches).
- **Authors:** Yuval Shafriri (development) · Dr. Yael Alef (heritage methodology).

## Branches

- `main` — pre-workshop home view; the long-running production state.
- `betsalel-workshop` — Bezalel workshop variant: simplified home view (three AI-bot links, hidden survey / agent-builder / "השראה" sections, larger typography). Branched off `main` at `1497f4d`. Workshop-bound; **not** to be merged back.

## External references

The "אתר.בוט" system prompts ("המוח של אתר.בוט") live in a separate repo — linked out from the home view, not bundled here:

- Branch: [InSites-Lab/Insites-CAA2026 @ betsalel-1.1.0](https://github.com/InSites-Lab/Insites-CAA2026/tree/betsalel-1.1.0)
- Folder: [InSites-Brain/](https://github.com/InSites-Lab/Insites-CAA2026/tree/betsalel-1.1.0/InSites-Brain) — sub-folder [Claude/](https://github.com/InSites-Lab/Insites-CAA2026/tree/betsalel-1.1.0/InSites-Brain/Claude) holds the Claude-Project README

If those prompts move, update the two `href`s in `App.tsx`.

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

## House rules for code edits (humans and AI agents)

- **Preserve existing inline comments.** They encode author intent across multiple workshop iterations — don't strip them on refactor.
- **Hide, don't delete.** When removing UI sections that may resurface later, comment them out (`{/* … */}`) with a one-line marker rather than deleting.
- **Verify UI changes in a browser** before declaring done — the build can pass while the layout is broken.
