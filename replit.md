# AD Phone - Replit Project

A comprehensive Arabic phone specifications database with AI-powered search and admin panel.

## Architecture

**Full-stack application:**
- **Frontend**: React + Vite (port 5000) with Tailwind CSS, shadcn/ui components
- **Backend**: Express.js server (port 3000) with TypeScript via `tsx`
- **Database**: Replit PostgreSQL via Drizzle ORM
- **AI**: Google Gemini 2.0 Flash for phone specs lookup and smart search

## Development

```bash
npm run dev       # Starts both Express server (3000) + Vite dev server (5000)
npm run db:push   # Sync database schema
```

Vite proxies `/api/*` requests to the Express server at port 3000.

## Key Files

- `server/index.ts` — Express API server (all routes)
- `server/schema.ts` — Drizzle ORM schema (brands, phones, phone_images, admin_users)
- `server/db.ts` — Database connection
- `server/create-admin.ts` — CLI to create/update admin users
- `src/lib/api.ts` — Frontend API client (all fetch calls)
- `src/pages/AdminPanel.tsx` — Admin dashboard
- `vite.config.ts` — Vite config with `/api` proxy

## API Routes

### Public
- `GET /api/brands` — All brands
- `GET /api/phones?limit=N` — Published phones
- `GET /api/phones/slug/:slug` — Single phone
- `GET /api/phones/brand/:brandSlug` — Phones by brand
- `GET /api/phones/similar/:phoneId?brandId=X` — Similar phones
- `GET /api/phones/images/:phoneId` — Phone images
- `GET /api/search?q=...` — Text search

### AI
- `POST /api/ai/search` — AI-powered search (Gemini)
- `POST /api/ai/phone-specs` — AI phone spec lookup (admin only)

### Auth
- `POST /api/auth/login` — Admin login (session-based)
- `POST /api/auth/logout` — Logout
- `GET /api/auth/me` — Check current session

### Admin (requires login)
- `GET /api/admin/phones` — All phones (including drafts)
- `POST /api/admin/phones` — Create phone
- `PUT /api/admin/phones/:id` — Update phone
- `DELETE /api/admin/phones/:id` — Delete phone
- `POST /api/admin/brands` — Create brand
- `PUT /api/admin/brands/:id` — Update brand
- `DELETE /api/admin/brands/:id` — Delete brand

## Admin Panel

Access at `/admin-login`. Create/update admin users via:
```bash
tsx server/create-admin.ts <email> <password>
```

## Environment Variables / Secrets

- `DATABASE_URL` — Replit PostgreSQL connection string (auto-set)
- `GEMINI_API_KEY` — Google Gemini API key (Replit Secret)
- `SESSION_SECRET` — Session signing secret (Replit Secret)

## Deployment

Build: `vite build` (outputs to `dist/`)
Run: `node ./dist/index.cjs` (see deployment config)
