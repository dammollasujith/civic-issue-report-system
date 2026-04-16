# 🌍 Smart Civic Issue Reporting & Management System

Full-stack production-ready civic-tech platform:

- **Citizen portal**: report issues with media + GPS, track status, view map, get realtime notifications, upvote issues.
- **Admin portal**: manage/assign/resolve issues, map view, analytics dashboard, user management.

## Tech Stack

- **Client**: Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion + Recharts + Leaflet
- **Server**: Node.js + Express + JWT + RBAC + Socket.io
- **DB**: MongoDB (Mongoose)
- **Storage**: Cloudinary (recommended) with optional local fallback

## Monorepo Structure

```
/client
/server
/database
```

## Quick Start (Local)

### 0) Install prerequisites

- Install **Node.js 22 LTS** (includes `node` + `npm`)
- Install MongoDB locally OR use MongoDB Atlas

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment

Copy and fill:

- `server/.env.example` → `server/.env`
- `client/.env.example` → `client/.env.local`

### 3) Run dev

```bash
npm run dev
```

- Client: `http://localhost:3000`
- Server: `http://localhost:4000`

### 4) Seed an admin account (optional)

```bash
npm run seed:admin -w server
```

## Deployment Notes

- **Client**: deploy `client/` to Vercel
- **Server**: deploy `server/` to Render/Railway
- **Database**: MongoDB Atlas
- **Uploads**: Cloudinary

See `server/.env.example` for required variables.
