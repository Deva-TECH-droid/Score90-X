# Score90X Frontend

A production-ready Next.js 16 (App Router) frontend scaffold for the FIFA World Cup 2026 live score platform.

## What is included

- Next.js 16 with App Router and TypeScript
- Tailwind CSS v4 with dark theme by default
- Custom Shadcn-style UI components
- Axios-powered API client
- TanStack Query provider for data fetching
- Zustand store for UI state
- ESLint and Prettier configuration
- Absolute imports with `@/*`
- Pages for Home, Live Matches, Match Details, Teams, Team Details, Standings, Top Scorers

## Installation

```bash
cd frontend
pnpm install
pnpm dev
```

## Environment

Copy `.env.example` to `.env.local` and update the API URL if needed.

## Folder structure

- `src/app/` - route pages and layout
- `src/components/` - reusable UI components
- `src/features/` - feature area scaffolding
- `src/providers/` - application providers
- `src/services/` - API integration
- `src/hooks/` - custom data hooks
- `src/store/` - Zustand state stores
- `src/types/` - typed domain models
- `src/utils/` / `src/lib/` - utility helpers
- `src/constants/` - route and static constants
