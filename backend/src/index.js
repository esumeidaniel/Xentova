import { app } from './app.js'
import { env, hasSupabaseConfig } from './config/env.js'

app.listen(env.port, () => {
  console.log(`Xentova Express API running at http://127.0.0.1:${env.port}`)
  console.log(`Supabase configured: ${hasSupabaseConfig() ? 'yes' : 'no'}`)
})
