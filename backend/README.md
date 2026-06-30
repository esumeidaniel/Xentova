# Xentova Backend

Separate Express + Supabase backend for the Xentova frontend.

## Setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

API runs on:

```text
http://127.0.0.1:4000
```

## Supabase

Add your Supabase values to `backend/.env`:

```text
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Do not expose the service role key to the frontend.

## Routes

- `GET /api/health`
- `POST /api/auth/signup`
- `POST /api/auth/signin`
- `POST /api/auth/signout`
- `GET /api/account/me`
- `GET /api/markets`
- `POST /api/trading/preview-order`
- `POST /api/wallet/deposit`
- `POST /api/wallet/withdraw`

## Notes

This backend is separated from the React/Vite frontend. It is ready for Supabase Auth and Supabase tables, but wallet, trading, KYC, payment, and exchange execution must still be implemented carefully before production.
