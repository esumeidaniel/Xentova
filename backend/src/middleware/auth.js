import { supabase } from '../config/supabase.js'
import { fail, requireSupabase } from '../utils/http.js'

export async function requireAuth(request, response, next) {
  if (!requireSupabase(response, supabase)) return

  const authorization = request.headers.authorization || ''
  const token = authorization.replace('Bearer ', '').trim()

  if (!token) {
    fail(response, 401, 'Missing bearer token.')
    return
  }

  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data?.user) {
    fail(response, 401, 'Invalid or expired token.')
    return
  }

  request.user = data.user
  next()
}
