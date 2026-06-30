import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { accepted } from '../utils/http.js'

const router = Router()

router.post('/preview-order', requireAuth, (request, response) => {
  accepted(response, {
    order: {
      id: `ORDER-PREVIEW-${Date.now()}`,
      ...request.body,
      status: 'preview-only',
    },
    message: 'Order preview only. Real execution requires exchange API integration and risk checks.',
  })
})

export default router
