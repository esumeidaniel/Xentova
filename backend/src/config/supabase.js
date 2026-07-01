import { createClient } from '@supabase/supabase-js'
import { env, hasSupabaseAdminConfig, hasSupabaseConfig } from './env.js'

export const supabase = hasSupabaseConfig()
  ? createClient(env.supabaseUrl, env.supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null

export const supabaseAdmin = hasSupabaseAdminConfig()
  ? createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null
