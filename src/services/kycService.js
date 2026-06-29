import { demoDelay } from './api.js'

export const kycService = {
  getStatus: () => demoDelay({ status: 'Demo only', requiresAdminReview: true }),
}
