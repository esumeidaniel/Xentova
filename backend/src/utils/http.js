export function ok(response, data = {}, status = 200) {
  response.status(status).json(data)
}

export function created(response, data = {}) {
  ok(response, data, 201)
}

export function accepted(response, data = {}) {
  ok(response, data, 202)
}

export function fail(response, status, message, details = undefined) {
  response.status(status).json({
    error: message,
    details,
  })
}

export function requireSupabase(response, client) {
  if (client) return true

  fail(
    response,
    503,
    'Supabase is not configured. Add SUPABASE_URL and keys in backend/.env.',
  )
  return false
}
