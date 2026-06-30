import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { ok } from '../utils/http.js'

const router = Router()

router.get('/me', requireAuth, (request, response) => {
  ok(response, {
    user: request.user,
  })
})

export default router
