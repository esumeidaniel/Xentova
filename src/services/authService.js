import { demoDelay } from './api.js'
import { mockUser } from '../data/mockUsers.js'

export const authService = {
  signIn: () => demoDelay({ user: mockUser, requiresBackend: true }),
  signUp: () => demoDelay({ user: mockUser, requiresBackend: true }),
  signOut: () => demoDelay({ ok: true }),
}
