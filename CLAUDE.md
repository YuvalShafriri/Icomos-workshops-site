# InSites — אתר.בוט (workshops site)

Hebrew-first React/Vite SPA for the ICOMOS / InSites cultural-significance-assessment workshops. Deployed to `/icomos/workshop` — same site URL across branches; only the build content varies.

## Branches

- `main` — pre-workshop home view; the long-running production state.
- `betsalel-workshop` — Bezalel workshop variant of the home view: three AI-bot rows (Gemini Gem, ChatGPT GPTs, Claude), survey + agent-builder + "השראה" sections hidden, larger group titles. Branched off `main` at `1497f4d`. Workshop-bound; **do not** merge back into main.

## External references (links out from the home view)

The "אתר.בוט" prompt files ("המוח של אתר.בוט") live in a **separate** repo:

- Repo: `github.com/InSites-Lab/Insites-CAA2026`
- Branch: `betsalel-1.1.0`
- Folder: `InSites-Brain/` (sub-folder `Claude/` has the Claude-Project README)

Those are external links rendered in the home view; the prompts are not built into this codebase. If they move, update both `href`s in `App.tsx`.

## Run / build

```bash
npm install
npm run dev      # default port 3000; on this dev machine prefer 3001 (port 3000 may be held by a sibling project)
npm run build    # produces deployable dist/
npm run preview  # default 4173; prefer 5180+ on this machine for the same reason
```
