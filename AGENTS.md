# Repository Guidelines

## Project Structure & Module Organization
This academic portfolio uses Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4, and Supabase.

- `src/app/`: routes, root layout, and global styles. Public routes include `/projetos`, `/publicacoes`, `/noticias`, and `/sobre`; authentication lives under `/admin`.
- `src/lib/content.ts`: static project content currently rendered by public pages.
- `src/lib/supabase.ts`: server-side Supabase client with cookie handling.
- `public/`: static assets.
- `supabase/schema.sql`: database tables and Row Level Security policies.

Public database reads, CRUD forms, and image uploads are planned features; do not assume they already exist.

## Build, Test, and Development Commands
Use Node.js 20 or newer.

- `npm install`: install dependencies; keep `package-lock.json` synchronized with dependency changes.
- `cp .env.example .env.local`: create local configuration before adding Supabase credentials.
- `npm run dev`: start development at `http://localhost:3000`.
- `npm run build`: create the production build.
- `npm start`: serve an existing production build.
- `npx tsc --noEmit`: check TypeScript types.

`npm run lint` invokes ESLint, but ESLint and its configuration are currently absent. Set these up before relying on that command.

## Coding Style & Naming Conventions
Use TypeScript with strict checking and `@/*` imports for modules under `src/`. Preserve App Router filenames such as `page.tsx` and `layout.tsx`. Use PascalCase component names and camelCase functions and variables. Existing files are compact and use single-quoted TypeScript strings; use two-space indentation when expanding code into readable blocks. No formatter is configured. Keep interface copy in Portuguese and use Tailwind utilities for styling.

## Testing Guidelines
No automated test framework, test script, or coverage threshold is configured. For changes, run type checking and the production build, then manually verify affected routes, responsive layouts, and login behavior. Authentication changes should cover signed-out users, authorized administrators, and authenticated users without administrator access.

## Commit & Pull Request Guidelines
Git history is unavailable in this checkout, so no existing commit convention can be verified. Use concise, imperative commit subjects. Pull requests should explain the change, list validation performed, link relevant issues, and include screenshots for visual changes. Document configuration or SQL changes explicitly.

## Security & Configuration
Keep credentials in ignored `.env.local`; use the variable names in `.env.example`. Never expose a Supabase `service_role` key in browser code. Preserve server-side administrator checks and database RLS policies.
