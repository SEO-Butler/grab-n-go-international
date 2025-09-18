# Repository Guidelines

## Project Structure & Module Organization
The Vite + React app lives in `src/`, with feature components under `src/components`, shared UI in `src/common`, and integrations in `src/lib`. Event content is centralized in `src/config/event.js`; update this file instead of hard-coding repeated copy. Utility helpers stay in `src/utils`. Static assets and the HTML shell live in `public/`, while production builds output to `dist/` (generated, do not edit by hand).

## Build, Test & Development Commands
- `npm install` installs dependencies; re-run after pulling major updates.
- `npm run dev` launches the Vite dev server with hot reloading.
- `npm run build` runs linting then creates the optimized bundle in `dist/`.
- `npm run preview` serves the production build locally for smoke checks.
- `npm run lint` runs ESLint using `eslint.config.js`; fix warnings before committing.
- `npm run lint:error` surfaces only blocking lint errors; use it in CI or pre-push hooks.

## Coding Style & Naming Conventions
Use modern ES modules, two-space indentation, and arrow functions for React components. Component files are PascalCase (for example, `HeroSection.jsx`), hooks and helpers are camelCase, and config objects export named constants. Keep Tailwind class lists readable (group layout classes before color and motion utilities) and prefer extracting repeated class strings into the config layer. Do not bypass the shared `ErrorBoundary` or analytics helpers when adding screens.

## Testing Guidelines
The project currently relies on linting plus manual QA. Before opening a PR, run `npm run lint`, then exercise the booking flow, map interactions, and responsive nav in Chrome and at least one mobile viewport. If you add automated tests, colocate them under `src/__tests__/<Component>.test.jsx` and add an `npm test` script so the suite can run in CI.

## Commit & Pull Request Guidelines
Commits follow short, imperative summaries (for example, `Enhance visual elements and fix navigation functionality`). Keep related changes together and include context in the body when you touch multiple areas. PRs should link any tracking issue, outline user-facing impacts, list manual test steps, and attach screenshots or recordings for visual tweaks. Confirm `npm run build` succeeds before requesting review.

## Configuration & Environment
Customize event copy, ticket tiers, and theming via `src/config/event.js`; document any new keys you introduce. Environment secrets (analytics IDs, API keys) belong in a local `.env` with `VITE_` prefixes and must never be committed. Point `VITE_FORM_ENDPOINT` at a webhook or API route that returns the correct CORS headers for both localhost and production; without it the booking form renders a setup warning. Update deployment notes in `README.md` if you change required configuration.

## Admin Background Image Workflow
Admins can upload hero or section backgrounds into `public/images/`; use descriptive kebab-case filenames (e.g., `hero-terminal.jpg`) and keep assets under 500 KB at ~1920px width. To apply a new image, swap the relevant CSS background source: adjust `eventConfig.sections.hero.backgroundGradients` in `src/config/event.js` to include `url('/images/hero-terminal.jpg') center/cover no-repeat`, or replace the `backgroundImage` value near the top of `src/components/ExperienceSection.jsx`. After updates, run `npm run preview` to confirm the file serves correctly and verify contrast on desktop and mobile breakpoints.

