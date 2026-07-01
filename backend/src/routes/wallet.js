import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { createDemoDeposit, createDemoWithdrawal, getDemoWallet } from '../services/demoStore.js'
import { accepted, created, fail, ok } from '../utils/http.js'

const router = Router()

router.get('/balances', requireAuth, (request, response) => {
  const wallet = getDemoWallet(request.user.id)
  ok(response, { balances: wallet.balances })
})

router.get('/transactions', requireAuth, (request, response) => {
  const wallet = getDemoWallet(request.user.id)
  ok(response, { transactions: wallet.transactions })
})

router.post('/deposit', requireAuth, (request, response) => {
  try {
    created(response, {
      deposit: createDemoDeposit(request.user.id, request.body),
      warning: 'Demo credit only. Do not send real funds until wallet/custody integration is connected.',
    })
  } catch (error) {
    fail(response, 400, error.message)
  }
})

router.post('/withdraw', requireAuth, (request, response) => {
  try {
    accepted(response, {
      withdrawal: createDemoWithdrawal(request.user.id, request.body),
      message: 'Demo withdrawal only. Production withdrawals need risk checks, approval, and wallet provider integration.',
    })
  } catch (error) {
    fail(response, 400, error.message)
  }
})

export default router
