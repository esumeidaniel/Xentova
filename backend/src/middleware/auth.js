import { env } from '../config/env.js'
import { supabase } from '../config/supabase.js'
import { getDemoUserByToken } from '../services/demoStore.js'
import { fail, requireSupabase } from '../utils/http.js'

export async function requireAuth(request, response, next) {
  const authorization = request.headers.authorization || ''
  const token = authorization.replace('Bearer ', '').trim()

  if (!token) {
    fail(response, 401, 'Missing bearer token.')
    return
  }

  if (!supabase && env.demoAuthEnabled) {
    const user = getDemoUserByToken(token)

    if (!user) {
      fail(response, 401, 'Invalid or expired demo token.')
      return
    }

    request.user = user
    next()
    return
  }

  if (!requireSupabase(response, supabase)) return

  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data?.user) {
    fail(response, 401, 'Invalid or expired token.')
    return
  }

  request.user = data.user
  next()
}
