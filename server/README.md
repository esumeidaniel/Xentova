# Xentova Backend Starter

This is the first backend foundation for Xentova. It uses native Node.js only, so it can run without installing Express or database packages.

## Run

```bash
npm run server
```

The API starts on:

```text
http://127.0.0.1:4000
```

## Current Routes

- `GET /api/health`
- `POST /api/auth/signin`
- `POST /api/auth/signup`
- `GET /api/user/me`
- `GET /api/markets`
- `GET /api/portfolio`
- `GET /api/signals`
- `GET /api/transactions`
- `POST /api/trading/preview-order`
- `POST /api/wallet/deposit`
- `POST /api/wallet/withdraw`
- `POST /api/kyc/submit`

## Important

This is not production backend security yet. It uses demo tokens and mock data. Before launch, connect:

- real database
- password hashing
- JWT/session storage
- wallet/custody provider
- market data provider
- KYC provider/admin review
- payment provider
- exchange/trading API
