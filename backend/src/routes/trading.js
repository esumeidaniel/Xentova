import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { placeDemoOrder } from '../services/demoStore.js'
import { getMarket } from '../services/marketData.js'
import { accepted, fail } from '../utils/http.js'

const router = Router()

function normalizeOrderInput(body) {
  const symbol = String(body.symbol || body.pair || 'BTCUSDT').toUpperCase().replace('/', '')
  const side = String(body.side || '').toLowerCase()
  const quantity = Number(body.quantity || body.amount)

  if (!['buy', 'sell'].includes(side)) {
    throw new Error('Order side must be buy or sell.')
  }

  if (!Number.isFinite(quantity) || quantity <= 0) {
    throw new Error('Order quantity must be greater than 0.')
  }

  return {
    symbol,
    side,
    quantity,
    type: body.type || 'market',
    price: body.price,
  }
}

router.post('/preview-order', requireAuth, async (request, response) => {
  try {
    const input = normalizeOrderInput(request.body)
    const { market, source } = await getMarket(input.symbol)
    const price = Number(input.price || market.price)
    const notional = input.quantity * price
    const feeRate = 0.001

    accepted(response, {
      order: {
        id: `ORDER-PREVIEW-${Date.now()}`,
        ...input,
        price,
        notional,
        estimatedFee: notional * feeRate,
        status: 'preview-only',
      },
      marketSource: source,
      message: 'Order preview only. Real execution requires exchange API integration and risk checks.',
    })
  } catch (error) {
    fail(response, 400, error.message)
  }
})

router.post('/orders', requireAuth, async (request, response) => {
  try {
    const input = normalizeOrderInput(request.body)
    const { market, source } = await getMarket(input.symbol)
    const order = placeDemoOrder(request.user.id, input, market)

    accepted(response, {
      order,
      marketSource: source,
      message: 'Demo order filled in local memory. Production trading needs exchange routing or a matching engine.',
    })
  } catch (error) {
    fail(response, 400, error.message)
  }
})

export default router
