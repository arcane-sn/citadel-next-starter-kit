# Citadel Next Starter Kit

AI-friendly Next.js dashboard boilerplate. MIT licensed.

## Stack

Next.js (App Router) · TypeScript (strict) · Tailwind CSS v4 · TanStack Query & Table · Zustand · nuqs · Zod · Axios

## Getting Started

```bash
cp .env.example .env.local   # then fill in the values
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script          | Description          |
| --------------- | -------------------- |
| `npm run dev`   | Start the dev server |
| `npm run build` | Production build     |
| `npm run lint`  | Run ESLint           |
| `npm run typecheck` | Run `tsc --noEmit` |
| `npm test`      | Run unit tests (Vitest) |
| `npm run test:coverage` | Tests + coverage (80% threshold) |

## Environment

Variables are validated with Zod in `src/lib/env/env.ts`. Never read `process.env` elsewhere.

| Variable              | Description         |
| --------------------- | ------------------- |
| `NEXT_PUBLIC_API_URL` | Base URL of the API |

## Structure

```
src/
  app/[route]/            Feature colocated per route: _components, _core (sdk, types, queries), _hooks, page.tsx
  components/ui/          Base primitives
  components/shared/      Cross-feature components (providers, layout)
  lib/                    axios, env, utils
```

Project conventions for humans and AI agents live in [`CLAUDE.md`](./CLAUDE.md) and [`.cursorrules`](./.cursorrules).
