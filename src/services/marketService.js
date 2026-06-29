import { demoDelay } from './api.js'
import { mockMarkets } from '../data/mockMarkets.js'

export const marketService = {
  listMarkets: () => demoDelay(mockMarkets),
}
