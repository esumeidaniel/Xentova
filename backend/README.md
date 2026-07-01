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
- `GET /api/markets/:symbol`
- `GET /api/markets/:symbol/candles`
- `GET /api/wallet/balances`
- `GET /api/wallet/transactions`
- `POST /api/trading/preview-order`
- `POST /api/trading/orders`
- `POST /api/wallet/deposit`
- `POST /api/wallet/withdraw`

## Local demo mode

When Supabase is not configured, the backend uses demo auth and an in-memory demo wallet so the frontend can connect immediately:

```bash
curl -X POST http://127.0.0.1:4000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@xentova.test","password":"password"}'
```

Use the returned `session.access_token` as:

```text
Authorization: Bearer demo-token...
```

## Market data

The backend fetches public spot prices from Binance by default:

```text
MARKET_DATA_PROVIDER=binance
```

Set `MARKET_DATA_PROVIDER=bybit` to use Bybit public spot endpoints. If the public API cannot be reached, the backend returns demo fallback markets so the frontend still works.

## Notes

This backend is separated from the React/Vite frontend. It is ready for Supabase Auth, live public market data, demo wallets, and demo order previews/fills.

Deposits, withdrawals, payment processing, KYC, custody, exchange execution, and real trading must still be implemented carefully before production. Do not use demo wallet routes for real funds.
