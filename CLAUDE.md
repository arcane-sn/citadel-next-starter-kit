@AGENTS.md

# Citadel Starter Kit - AI Rules & Guidelines

## 1. Directory Structure
Each feature is colocated in its route folder `src/app/[route]/` (no separate `features/` folder):
- `_components/` : UI components exclusive to this feature.
- `_core/`       : API request/response services, TanStack Query hooks, providers.
- `_hooks/`      : Custom logic hooks for the feature.
- `page.tsx`     : The main feature view/page.

Global components live in:
- `@/components/ui/`     : Base UI primitives (Button, Input, Card).
- `@/components/shared/` : Cross-feature components (Sidebar, Header, Navbar).

## 2. Coding Principles & Over-Engineering
- No unnecessary runtime checks. Trust TypeScript strict typing and Zod schema validations.
- Do not write `typeof x === 'string'` if `x` is already typed as `string`.
- Keep components modular and under 150 lines of code.

## 3. Naming Conventions
- File & Folder Names: ALWAYS `kebab-case` (e.g., `user-profile.tsx`, `auth.sdk.ts`). Never PascalCase or camelCase filenames.
- Components & Pages (identifiers): `PascalCase` (e.g., `UserProfile`, `DashboardPage`), exported from kebab-case files.
- Normal Functions & Methods: `camelCase` (e.g., `formatCurrency`, `calculateTotal`).
- Variables: `camelCase` (e.g., `userData`, `isLoading`). Use `snake_case` ONLY for raw backend API response mappings.

## 4. Function Syntax Standards
- React Components MUST use function declarations:
  `export function UserCard() { ... }`
- Event handlers, utilities, and inline helpers MUST use arrow functions:
  `const handleSubmit = () => { ... }`

## 5. Testing & Identifiers
- Do NOT add `id` to every HTML tag.
- Add `data-testid` ONLY to interactive elements (buttons, inputs, form submits) and main section wrappers.
  Example: `<button data-testid="submit-login-btn">`
- Unit tests are MANDATORY for files inside `_core/` (services, data transformers) and Zod validation schemas.
- Tests are colocated as `*.test.ts(x)` next to the file under test. Run with `npm test` (Vitest + Testing Library); coverage threshold is 80%.

## 6. Forms & Styling
- ALL forms must be validated using `Zod` schemas.
- NEVER use arbitrary Tailwind values (e.g., `w-[230px]`, `bg-[#0f172a]`). Always use project design tokens (`bg-background`, `text-foreground`, `p-4`).
- ALL API calls must use the centralized `api` instance from `@/lib/axios/axios`. Raw `fetch()` is forbidden.

## 7. Next.js Server/Client Boundaries & Exports
- Pages (`page.tsx`) and Layouts (`layout.tsx`) MUST be Server Components by default. Never put `"use client"` at the page level.
- Push `"use client"` down to the smallest possible leaf component inside `_components/`.
- Use Named Exports for all components, helpers, and hooks (`export function Component()`).
- Use Default Exports ONLY for Next.js magic files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`).

## 8. State Management Architecture
- Server Data: Use TanStack Query exclusively.
- URL Parameters (Filters, Search, Pagination): Use `nuqs`.
- Global UI State (Modals, Sidebar status): Use Zustand.
- Do NOT fetch API data directly inside Zustand stores.

## 9. Environment Variables
- Never access `process.env` directly. Use validated environment schema from `@/lib/env/env`.

## 10. Assets & Semantic Layout
- ALWAYS use Next.js `<Image />` component instead of standard `<img>` tags.
- Use semantic layout elements (`<main>`, `<aside>`, `<header>`, `<nav>`) instead of generic nested `<div>` elements.

## 11. Security & API Response Shape
- Client components MUST NEVER access `document.cookie` or attempt to manage auth tokens manually.
- API responses conform to the envelope `{ data: T, message: string, code: number }`. `code` is the source of truth for business logic; never branch on `message`.

## 12. SDK & API Architecture Pattern
- ALL API interactions must be written as object SDKs inside `src/app/[route]/_core/[feature].sdk.ts`. Name the file after the feature domain (`auth.sdk.ts`), not a single action (`login.sdk.ts`).
- ALL request/response types and Zod schemas must live in `src/app/[route]/_core/[feature].types.ts`. Types are derived via `z.infer`.
- SDK functions must ONLY use the centralized `api` instance from `@/lib/axios/axios`.
- TanStack Query hooks live in `[feature].queries.ts`; tests in `[feature].sdk.test.ts`.
- Example naming: `cartSdk.getCart()`, `orderSdk.createOrder()`.