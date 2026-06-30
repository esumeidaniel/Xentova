export function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  })
  response.end(JSON.stringify(payload, null, 2))
}

export function sendNotFound(response) {
  sendJson(response, 404, {
    error: 'Not found',
    message: 'This Xentova API route does not exist yet.',
  })
}

export async function readJson(request) {
  const chunks = []

  for await (const chunk of request) {
    chunks.push(chunk)
  }

  const raw = Buffer.concat(chunks).toString('utf8')
  if (!raw) return {}

  try {
    return JSON.parse(raw)
  } catch {
    const error = new Error('Invalid JSON body.')
    error.statusCode = 400
    throw error
  }
}

export function requireDemoAuth(request, response) {
  const authorization = request.headers.authorization || ''

  if (!authorization.startsWith('Bearer demo-token-')) {
    sendJson(response, 401, {
      error: 'Unauthorized',
      message: 'Use a demo token from /api/auth/signin while real auth is not connected.',
    })
    return false
  }

  return true
}
