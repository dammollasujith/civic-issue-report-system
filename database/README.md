# Database

This project uses **MongoDB (Mongoose)**.

## Local MongoDB

- Default DB name: `smart-civic`
- Configure via `server/.env` → `MONGODB_URI`

## Seeding (Admin)

From repo root:

```bash
npm run seed:admin -w server
```

Optional env overrides:

- `SEED_ADMIN_EMAIL`
- `SEED_ADMIN_PASSWORD`
- `SEED_ADMIN_NAME`

