<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1qWNJlUxkGv2ncFt4JzQd_LHt7OoziArg

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deep links (Hash routes)

The app supports direct links using URL hashes (everything after `#`).

Examples:

- `http://localhost:5173/#visual`
- `http://localhost:5173/#graph-create`
- `http://localhost:5173/#step-2`

Supported hashes:

- `#welcome` – About / welcome overlay
- `#tools` – "הרחבות וכלים" screen
- `#q-narratives` – Query: נרטיבים חלופיים
- `#q-sentiment` – Query: סנטימנט קהילתי / ערכי קהילה
- `#q-education` – Query: המסרה וחינוך
- `#q-semiotics` – Query: ניתוח סמיוטי
- `#q-jester` – Query: ליצן החצר
- `#q-chorus` – Query: מקהלה יוונית
- `#q-jester-chorus` – Query group: ליצן החצר / מקהלה יוונית
- `#graph-create` – Knowledge Graph input
- `#graph` – Knowledge Graph results modal (after generation)
- `#visual` – Visual analysis modal
- `#inventory` – [MA-RC] inventory instructions modal
- `#prompts` – Prompts workshop modal
- `#principles` – Principles modal
- `#step-0` … `#step-6` – CBSA stages
