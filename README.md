# Simmer web

A production-ready React web application scaffold.

## Tech Stack

| Layer             | Technology                        | Version |
|-------------------|-----------------------------------|---------|
| Framework         | React                             | 19.3.0  |
| Language          | TypeScript                        | 5.9.3   |
| Build tool        | Vite                              | 8.3.1   |
| UI Library        | Mantine                           | 9.6.3   |
| State Management  | Redux Toolkit + React Redux       | 2.13.0 / 9.3.0 |
| Linter            | ESLint (flat config)              | 9.39.5  |
| Formatter         | Prettier                          | 3.9.9   |
| Package Manager   | npm                               | —       |

> **Note on TypeScript version:** TypeScript 7.0.2 is available on npm but `@typescript-eslint/eslint-plugin@8.71.0` declares a peer dep of `typescript >=4.8.4 <6.1.0`, so this project pins TypeScript at **5.9.3** (the latest stable 5.x) until `@typescript-eslint` adds TypeScript 7 support.

> **Note on ESLint version:** ESLint 10.11.0 is available on npm but `eslint-plugin-react@7.37.5` declares a peer dep of `eslint ^9.7`, so this project uses **ESLint 9.39.5** until that plugin is updated.

## Security audit

`npm audit` — **0 vulnerabilities** (audited at scaffold time, 2026-10-01).

## Project structure

```
src/
├── app/
│   ├── store.ts        # Redux store configuration
│   └── hooks.ts        # Typed useAppDispatch / useAppSelector
├── components/         # Shared, reusable UI components
├── features/           # Redux feature slices (one folder per domain)
├── layouts/            # Page layout wrappers
├── pages/              # Top-level page components
│   └── HomePage.tsx
├── styles/
│   └── global.css      # Global CSS reset / baseline styles
├── App.tsx             # Root component
└── main.tsx            # Vite entry point — providers wired here
```

## Getting started

```bash
npm install
npm run dev       # start local dev server (http://localhost:5173)
```

## Available scripts

| Script              | Description                              |
|---------------------|------------------------------------------|
| `npm run dev`       | Start Vite development server            |
| `npm run build`     | Type-check then build for production     |
| `npm run preview`   | Preview the production build locally     |
| `npm run lint`      | Run ESLint across all source files       |
| `npm run format`    | Auto-format with Prettier                |
| `npm run format:check` | Check formatting (CI use)            |
| `npm run type-check` | Run `tsc --noEmit` without building     |

## Path aliases

`@/*` resolves to `./src/*` in both TypeScript and Vite, so you can write:

```ts
import { useAppSelector } from '@/app/hooks'
```

## Adding a Redux slice

1. Create `src/features/<domain>/slice.ts` using `createSlice` from `@reduxjs/toolkit`.
2. Add the slice reducer to `src/app/store.ts`.
3. Use `useAppSelector` / `useAppDispatch` from `src/app/hooks.ts` in components.

## Mantine theming

Wrap the `MantineProvider` in `src/main.tsx` with a `theme` prop:

```tsx
import { createTheme, MantineProvider } from '@mantine/core'

const theme = createTheme({ primaryColor: 'violet' })
<MantineProvider theme={theme}>…</MantineProvider>
```

Refer to the [Mantine docs](https://mantine.dev) for the full theme API.
