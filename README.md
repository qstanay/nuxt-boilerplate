# Nuxt Boilerplate

Personal starter for new Nuxt projects. Not an app — a minimal, opinionated base you clone and build on.

Based on **Nuxt 4** + **Vue 3** + **TypeScript**, with ESLint (lint + format) and pre-commit hooks. No UI kit, no auth, no tests, no Prettier — those are project decisions, not starter defaults.

## What's included

| Area | Choice |
| --- | --- |
| Framework | Nuxt 4 (`app/` directory) |
| Language | TypeScript |
| Package manager | pnpm |
| Lint / format | ESLint flat config via [`@nuxt/eslint`](https://eslint.nuxt.com/) + [`@qstanay/eslint-config`](https://www.npmjs.com/package/@qstanay/eslint-config) (`@stylistic`, no Prettier) |
| Git hooks | Husky + lint-staged (ESLint `--fix` on staged files) |
| Editor | VS Code / Cursor settings: ESLint as formatter, format on save |

## What's intentionally omitted

- **Tests** (Vitest / Playwright) — add when there is real logic to cover
- **Prettier** — formatting goes through ESLint
- **UI libraries, CSS frameworks, state, i18n, auth** — pick per project
- **CI** — wire up when the repo needs it

## Requirements

- Node.js 20+
- [pnpm](https://pnpm.io/)

## Setup

```bash
pnpm install
```

Rename `name` in `package.json` to your project name.

## Scripts

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Dev server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview the production build |
| `pnpm lint` | Check lint / format |
| `pnpm lint:fix` | Auto-fix lint / format |

## Project layout

```text
app/
  app.vue          # App root (Nuxt welcome page until you replace it)
public/            # Static assets
nuxt.config.ts     # Nuxt config
eslint.config.mjs  # ESLint flat config
```

## ESLint style defaults

Configured in `eslint.config.mjs`:

- semicolons
- single quotes
- 2-space indent
- max line length 100

Install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension; formatter settings live in `.vscode/settings.json`.

## Docs

- [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction)
- [`@nuxt/eslint`](https://eslint.nuxt.com/)
