import { Router } from 'express'
import { env, hasSupabaseConfig } from '../config/env.js'
import { ok } from '../utils/http.js'

const router = Router()

router.get('/', (_request, response) => {
  ok(response, {
    ok: true,
    service: 'xentova-backend',
    framework: 'express',
    database: 'supabase',
    supabaseConfigured: hasSupabaseConfig(),
    demoAuthEnabled: env.demoAuthEnabled,
    liveMarketData: env.liveMarketData,
    marketDataProvider: env.marketDataProvider,
  })
})

export default router
