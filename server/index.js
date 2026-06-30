import http from 'node:http'
import { URL } from 'node:url'
import { markets, portfolio, signals, transactions, user } from './mockData.js'
import { readJson, requireDemoAuth, sendJson, sendNotFound } from './utils.js'

const port = Number(process.env.PORT || 4000)

function demoToken() {
  return `demo-token-${Date.now()}`
}

async function handleRequest(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`)
  const { method } = request
  const path = url.pathname

  if (method === 'OPTIONS') {
    sendJson(response, 204, {})
    return
  }

  try {
    if (method === 'GET' && path === '/api/health') {
      sendJson(response, 200, {
        ok: true,
        service: 'xentova-api',
        mode: 'backend-starter',
        databaseConnected: false,
      })
      return
    }

    if (method === 'POST' && path === '/api/auth/signin') {
      const body = await readJson(request)
      sendJson(response, 200, {
        token: demoToken(),
        user: { ...user, email: body.email || user.email },
        message: 'Demo sign in accepted. Replace this with password hashing and real sessions before production.',
      })
      return
    }

    if (method === 'POST' && path === '/api/auth/signup') {
      const body = await readJson(request)
      sendJson(response, 201, {
        token: demoToken(),
        user: {
          ...user,
          name: body.name || user.name,
          email: body.email || user.email,
        },
        message: 'Demo account created. Database persistence is not connected yet.',
      })
      return
    }

    if (method === 'GET' && path === '/api/user/me') {
      if (!requireDemoAuth(request, response)) return
      sendJson(response, 200, { user })
      return
    }

    if (method === 'GET' && path === '/api/markets') {
      sendJson(response, 200, { markets })
      return
    }

    if (method === 'GET' && path === '/api/portfolio') {
      if (!requireDemoAuth(request, response)) return
      sendJson(response, 200, { portfolio })
      return
    }

    if (method === 'GET' && path === '/api/signals') {
      sendJson(response, 200, {
        signals,
        disclaimer: 'Signals are demo data and are not financial advice.',
      })
      return
    }

    if (method === 'GET' && path === '/api/transactions') {
      if (!requireDemoAuth(request, response)) return
      sendJson(response, 200, { transactions })
      return
    }

    if (method === 'POST' && path === '/api/trading/preview-order') {
      if (!requireDemoAuth(request, response)) return
      const body = await readJson(request)
      sendJson(response, 200, {
        order: {
          id: `ORDER-PREVIEW-${Date.now()}`,
          ...body,
          status: 'preview-only',
        },
        message: 'Order preview created. Real trade execution requires exchange/API integration.',
      })
      return
    }

    if (method === 'POST' && path === '/api/wallet/deposit') {
      if (!requireDemoAuth(request, response)) return
      const body = await readJson(request)
      sendJson(response, 201, {
        deposit: {
          id: `DEP-${Date.now()}`,
          asset: body.asset || 'USDT',
          network: body.network || 'TRC20',
          address: 'TXENTOVA_DEMO_WALLET_ADDRESS',
          status: 'awaiting-demo-confirmation',
        },
        warning: 'Do not send real funds. Wallet integration is not connected.',
      })
      return
    }

    if (method === 'POST' && path === '/api/wallet/withdraw') {
      if (!requireDemoAuth(request, response)) return
      const body = await readJson(request)
      sendJson(response, 202, {
        withdrawal: {
          id: `WDR-${Date.now()}`,
          ...body,
          status: 'pending-admin-review',
        },
        message: 'Withdrawal processing requires backend/admin approval.',
      })
      return
    }

    if (method === 'POST' && path === '/api/kyc/submit') {
      if (!requireDemoAuth(request, response)) return
      sendJson(response, 202, {
        kyc: {
          id: `KYC-${Date.now()}`,
          status: 'pending-review',
        },
        message: 'Document verification requires secure upload storage and admin review.',
      })
      return
    }

    sendNotFound(response)
  } catch (error) {
    sendJson(response, error.statusCode || 500, {
      error: error.statusCode ? 'Bad request' : 'Server error',
      message: error.message || 'Unexpected backend error.',
    })
  }
}

const server = http.createServer(handleRequest)

server.listen(port, () => {
  console.log(`Xentova API running at http://127.0.0.1:${port}`)
  console.log('Health check: http://127.0.0.1:4000/api/health')
})
