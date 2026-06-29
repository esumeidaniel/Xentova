import { demoDelay } from './api.js'

export const tradingService = {
  previewOrder: (order) => demoDelay({ ...order, status: 'preview-only', requiresBackend: true }),
}
