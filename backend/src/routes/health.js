import { Router } from 'express'
import { hasSupabaseConfig } from '../config/env.js'
import { ok } from '../utils/http.js'

const router = Router()

router.get('/', (_request, response) => {
  ok(response, {
    ok: true,
    service: 'xentova-backend',
    framework: 'express',
    database: 'supabase',
    supabaseConfigured: hasSupabaseConfig(),
  })
})

export default router
