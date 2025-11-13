# Lumos – Personal Student AI Assistant

Lumos is a Next.js web app that acts as a personal study co-pilot. It combines an AI chat companion with planning utilities to help students break down topics, schedule deep-work sessions, and maintain healthy study rhythms.

## ✨ Features

- Conversational assistant tuned for active recall coaching and study guidance
- Smart quick-start prompts for planning sessions, explaining concepts, and building revision plans
- Visual study roadmap with pacing, due labels, and energy budgeting
- Responsive, dark-UI tailored for focus-first workflows

## 🧱 Tech Stack

- [Next.js 14](https://nextjs.org/) with the App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for subtle motion and polish
- [OpenAI SDK](https://github.com/openai/openai-node) (bring your own `OPENAI_API_KEY`)

## 🚀 Getting Started

```bash
npm install
npm run dev
# visit http://localhost:3000
```

Provide an `OPENAI_API_KEY` environment variable to enable live responses:

```bash
OPENAI_API_KEY=sk-... npm run dev
```

To generate a production build:

```bash
npm run build
npm start
```

## 📁 Project Structure

```
app/                 # App Router routes, layouts, API handlers
components/          # Reusable UI components
lib/                 # OpenAI helpers and shared types
styles/              # Global styles (Tailwind entry point lives in app/globals.css)
```

## 🔐 Environment Variables

| Variable          | Description                                   |
| ----------------- | --------------------------------------------- |
| `OPENAI_API_KEY`  | OpenAI API key for chat completions (required) |
| `OPENAI_MODEL`    | Optional override for the model name          |

When the API key is missing the chat route responds gracefully, but AI answers will be unavailable.

## 📦 Deployment

The project ships with Vercel-friendly defaults. Run `vercel deploy --prod` (with a configured `VERCEL_TOKEN`) to publish.
