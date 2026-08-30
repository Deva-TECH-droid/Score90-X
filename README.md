<div align="center">

# 🏆 SCORE90X

### FIFA World Cup 2026 — Live Score & Tournament Dashboard

A full-stack, cinematic sports dashboard delivering live scores, standings, team & player profiles, a knockout bracket, and a top-scorer leaderboard for the 2026 FIFA World Cup.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/) 
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5-lightgrey?logo=express)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](#license)
![Status](https://img.shields.io/badge/status-Active-success)

![World Cup](https://img.shields.io/badge/FIFA-World%20Cup%202026-blue)

![Open Source](https://img.shields.io/badge/Open%20Source-Yes-success)

[Live Demo](https://world-cup-score90-x.vercel.app/) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>


 
 

---

## 📖 Overview

**Score90X** is a two-app monorepo built around the FIFA World Cup 2026:

- 🎨 **`frontend/`** — a Next.js 16 (App Router) + TypeScript client with a dark, cinematic UI: glassmorphism cards, Bebas Neue display type, and amber/gold + blue dual-accent styling.
- ⚙️ **`backend/`** — an Express 5 + TypeScript REST API that proxies and caches data from the football-data.org World Cup competition endpoints.

The frontend never talks to the external data provider directly — every request is routed through the backend, which centralizes API-key handling, rate limiting, and response caching.

---

## ✨ Features

- 🔴 **Live Matches** — real-time scores with match-minute and status indicators
- 📊 **Standings** — full group-stage table with qualification highlighting
- 🌍 **Teams** — team grid + cinematic team profile pages (squad, coach, club colors)
- 👤 **Player Profiles** — two-column hero layout with shirt-number watermark
- 🏆 **Knockout Bracket** — Round of 16 → Quarter-final → Semi-final → Final, visualized as a connected tree
- ⚽ **Top Scorers** — ranked leaderboard with gold/silver/bronze styling
- 🔎 **Search** — cross-entity search across teams and players
- ⚡ **Smart Caching** — layered caching (backend in-memory TTL + frontend TanStack Query + Axios cache interceptor) to minimize upstream API calls

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Data Fetching | TanStack Query, Axios + `axios-cache-interceptor` |
| State Management | Zustand |
| Charts / Icons | Recharts, lucide-react |
| Backend Framework | Express 5 (Node.js, TypeScript) |
| Security & Middleware | Helmet, CORS, express-rate-limit, compression |
| Package Manager | pnpm |
| Database (scaffolded) | MongoDB via Mongoose *(not yet wired in)* |

---

## 📂 Project Structure

```
WorldCup-Score90X/
├── backend/
│   ├── src/
│   │   ├── server.ts                  # App bootstrap: middleware, routes, listener
│   │   ├── database/mongodb.ts         # Reserved Mongoose connection
│   │   ├── integrations/footbal-data/  # Axios client for football-data.org
│   │   ├── modules/                     # routes → controller → service → repository → mapper
│   │   └── utils/cache.ts                # In-memory TTL cache helper
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── app/            # Next.js App Router pages (Overview, Live Matches, Teams, Bracket, ...)
    │   ├── components/     # UI components grouped by domain
    │   ├── features/       # Feature-area barrel exports
    │   ├── hooks/          # useMatches, useTeams, useStandings, useBracket, ...
    │   ├── services/       # Typed API client wrappers
    │   ├── store/          # Zustand stores (UI/selection state)
    │   ├── providers/      # TanStack Query & Theme providers
    │   ├── types/          # Shared TypeScript domain models
    │   └── constants/routes.ts
    └── package.json
```

> 📘 See [`DEVELOPER_GUIDE.md`](./Score90X_Developer_Guide.docx)) for a full breakdown of code organization and conventions.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/)
- A free API key from [football-data.org](https://www.football-data.org/)

### 1. Clone the repository

```bash
git clone https://github.com/Abu10thahir7-github/WorldCup-Score90X.git
cd WorldCup-Score90X
```

### 2. Set up the backend

```bash
cd backend
pnpm install
```

Create a `.env` file:

```env
PORT=5000
FOOTBALL_BASE_URL=https://api.football-data.org/v2
FOOTBALL_API_KEY=your_api_token_here
```

```bash
pnpm dev
# Backend running at http://localhost:5000
```

### 3. Set up the frontend

```bash
cd ../frontend
pnpm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/worldcup
```

```bash
pnpm dev
# Frontend running at http://localhost:3000
```

---

## 🔌 API Reference

All endpoints are served under `/api/worldcup` and return a consistent envelope: `{ "success": true, "data": ... }` or `{ "success": false, "message": "..." }`.

| Method | Endpoint | Description | Cache TTL |
|---|---|---|---|
| GET | `/matches` | All World Cup matches | 5 min |
| GET | `/standings` | Group/tournament standings | 10 min |
| GET | `/teams` | All participating teams | 1 hour |
| GET | `/teams/:id` | Single team profile | 1 hour |
| GET | `/persons/:id` | Player/coach profile | 1 hour |
| GET | `/matchesDetails/:id` | Single match detail | 5 min |
| GET | `/scorers` | Top scorer leaderboard | 5 min |

> 📘 See [`REST_API_DOCUMENTATION.md`](./REST_API_DOCUMENTATION.md) for full request/response examples.

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| Background | `#081226` | Primary dark navy base |
| Accent — Gold | Amber/Gold | Ranks, highlights, CTAs |
| Accent — Blue | Blue | Links, live indicators, hover states |
| Display Type | Bebas Neue | Scores, ranks, hero headings |
| Body Type | Poppins / Inter | UI and body copy |

Consistent glassmorphism surfaces, glow-accented hover states, and Framer Motion–orchestrated transitions are used across every screen.

---

## 🗺️ Roadmap

- [ ] Wire up MongoDB for persistence (favorites, accounts)
- [ ] Scheduled cache warm-up via `node-cron`
- [ ] OpenAPI/Swagger spec for the REST API
- [ ] Automated test suite (unit + component tests)
- [ ] API versioning (`/api/v1/...`)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author

**Devansh Upadhyay**
- Portfolio: (https://portfolio-cyan-three-52.vercel.app)

Freelance Creative Frontend Developer & UI/UX Designer

- client: [Vijay Das](#)


<div align="center">

⭐ **If you find this project interesting, consider giving it a star!** ⭐

</div>
