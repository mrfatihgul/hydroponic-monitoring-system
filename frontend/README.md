# Soilless Farming Control — Frontend

React (Vite) + Tailwind + Recharts. For the full monorepo overview, see the root `README.md`.

## Setup

```bash
npm install
```

## Environment

Copy `.env.example` to `.env`. For local development with the Spring API, set `VITE_API_BASE_URL` (e.g. `http://localhost:8080/api`). With Docker nginx, the image is built with `VITE_API_BASE_URL=/api` so the browser calls the same origin.

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
