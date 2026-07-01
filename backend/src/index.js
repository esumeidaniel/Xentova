import { app } from './app.js'
import { env, hasSupabaseConfig } from './config/env.js'

const server = app.listen(env.port, env.host, () => {
  console.log(`Xentova Express API running at http://${env.host}:${env.port}`)
  console.log(`Supabase configured: ${hasSupabaseConfig() ? 'yes' : 'no'}`)
})

server.on('error', (error) => {
  console.error(`Unable to start Xentova API on ${env.host}:${env.port}`)
  console.error(error.message)
  process.exit(1)
})
