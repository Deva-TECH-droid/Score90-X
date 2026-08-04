# WorldCup Score90X Backend

A Node.js + TypeScript backend for fetching FIFA World Cup data via an external football API.

## Overview

This backend exposes REST endpoints for:

- World Cup matches
- World Cup matches details
- World Cup standings
- World Cup teams

It uses Express for routing, Axios for API requests, and environment variables to configure the football API client.

## Features

- `GET /api/worldcup/matches` - retrieves match data
- `GET /api/worldcup/standings` - retrieves tournament standings
- `GET /api/worldcup/teams` - retrieves participating teams
- Root health check at `GET /`

## Tech Stack

- Node.js
- TypeScript
- Express
- Axios
- dotenv

## Prerequisites

- Node.js installed
- `pnpm` installed globally (recommended)
- Football API credentials

## Installation

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5000
FOOTBALL_BASE_URL=https://api.football-data.org/v2
FOOTBALL_API_KEY=your_api_token_here
```

Adjust `PORT` as needed.

## Running Locally

- Development mode:

  ```bash
  pnpm dev
  ```

- Build and run production mode:
  ```bash
  pnpm build
  pnpm start
  ```

## API Endpoints

### Health Check

- `GET /`
- Response: `Score90X Backend Running 🚀`

### World Cup Routes

- `GET /api/worldcup/matches`
  - Returns World Cup match data

- `GET /api/worldcup/standings`
  - Returns World Cup standings data

- `GET /api/worldcup/teams`
  - Returns World Cup teams data

## Project Structure

- `src/server.ts` - app entrypoint
- `src/modules/worldcup.routes.ts` - route definitions
- `src/modules/worldcup.controller.ts` - controllers for endpoints
- `src/modules/worldcup.service.ts` - service layer
- `src/modules/worldcup.repository.ts` - external API integration logic
- `src/integrations/footbal-data/football.client.ts` - Axios client configuration

## Notes

- This backend currently relies on football-data API configuration via environment variables.
- The database folder exists but is not currently wired into the running backend.

## License

This repository does not include a specified license.
