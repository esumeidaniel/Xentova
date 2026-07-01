import { Router } from 'express'
import { getCandles, getMarket, getMarkets } from '../services/marketData.js'
import { fail, ok } from '../utils/http.js'

const router = Router()

router.get('/', async (_request, response) => {
  ok(response, await getMarkets())
})

router.get('/:symbol', async (request, response) => {
  try {
    ok(response, await getMarket(request.params.symbol))
  } catch (error) {
    fail(response, 404, error.message)
  }
})

router.get('/:symbol/candles', async (request, response) => {
  ok(response, await getCandles(request.params.symbol, request.query))
})

export default router
