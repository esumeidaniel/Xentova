import { Router } from 'express'
import { supabase } from '../config/supabase.js'
import { ok } from '../utils/http.js'

const fallbackMarkets = [
  { pair: 'BTC/USDT', name: 'Bitcoin', price: 67452, change24h: 3.85, volume: '42.8B', marketCap: '1.32T' },
  { pair: 'ETH/USDT', name: 'Ethereum', price: 2763, change24h: 2.14, volume: '18.1B', marketCap: '332B' },
  { pair: 'SOL/USDT', name: 'Solana', price: 175.32, change24h: -0.62, volume: '4.2B', marketCap: '81B' },
]

const router = Router()

router.get('/', async (_request, response) => {
  if (!supabase) {
    ok(response, {
      markets: fallbackMarkets,
      source: 'fallback-demo',
      message: 'Add Supabase env keys and a markets table to serve database data.',
    })
    return
  }

  const { data, error } = await supabase
    .from('markets')
    .select('*')
    .order('market_cap_rank', { ascending: true })

  if (error) {
    ok(response, {
      markets: fallbackMarkets,
      source: 'fallback-demo',
      message: error.message,
    })
    return
  }

  ok(response, { markets: data, source: 'supabase' })
})

export default router
