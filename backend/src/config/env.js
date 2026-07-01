import 'dotenv/config'

function isConfiguredValue(value, placeholder) {
  return Boolean(value && value !== placeholder && !value.includes('your-'))
}

export const env = {
  port: Number(process.env.PORT || 4000),
  host: process.env.HOST || '127.0.0.1',
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://127.0.0.1:5173,http://127.0.0.1:5174,http://localhost:5173,http://localhost:5174',
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  demoAuthEnabled: process.env.DEMO_AUTH_ENABLED !== 'false' && process.env.NODE_ENV !== 'production',
  liveMarketData: process.env.LIVE_MARKET_DATA !== 'false',
  marketDataProvider: process.env.MARKET_DATA_PROVIDER || 'binance',
  binanceRestUrl: process.env.BINANCE_REST_URL || 'https://api.binance.com',
  bybitRestUrl: process.env.BYBIT_REST_URL || 'https://api.bybit.com',
}

export function frontendOrigins() {
  return env.frontendUrl.split(',').map((origin) => origin.trim()).filter(Boolean)
}

export function hasSupabaseConfig() {
  return (
    isConfiguredValue(env.supabaseUrl, 'https://your-project.supabase.co') &&
    isConfiguredValue(env.supabaseAnonKey, 'your-anon-key')
  )
}

export function hasSupabaseAdminConfig() {
  return hasSupabaseConfig() && isConfiguredValue(env.supabaseServiceRoleKey, 'your-service-role-key')
}
