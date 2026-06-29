import { demoDelay } from './api.js'
import { mockPortfolio } from '../data/mockPortfolio.js'
import { mockTransactions } from '../data/mockTransactions.js'

export const walletService = {
  getPortfolio: () => demoDelay(mockPortfolio),
  listTransactions: () => demoDelay(mockTransactions),
  previewWithdrawal: (withdrawal) => demoDelay({ ...withdrawal, status: 'backend-required' }),
}
