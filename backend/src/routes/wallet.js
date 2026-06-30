import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { accepted, created } from '../utils/http.js'

const router = Router()

router.post('/deposit', requireAuth, (request, response) => {
  created(response, {
    deposit: {
      id: `DEP-${Date.now()}`,
      asset: request.body.asset || 'USDT',
      network: request.body.network || 'TRC20',
      address: 'SUPABASE_WALLET_PROVIDER_REQUIRED',
      status: 'awaiting-provider-integration',
    },
    warning: 'Do not send real funds until wallet/custody integration is connected.',
  })
})

router.post('/withdraw', requireAuth, (request, response) => {
  accepted(response, {
    withdrawal: {
      id: `WDR-${Date.now()}`,
      ...request.body,
      status: 'pending-admin-review',
    },
    message: 'Withdrawal requires backend validation, admin approval, and wallet provider integration.',
  })
})

export default router
