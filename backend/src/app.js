import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { env, frontendOrigins } from './config/env.js'
import accountRoutes from './routes/account.js'
import authRoutes from './routes/auth.js'
import healthRoutes from './routes/health.js'
import marketsRoutes from './routes/markets.js'
import tradingRoutes from './routes/trading.js'
import walletRoutes from './routes/wallet.js'
import { fail } from './utils/http.js'

export const app = express()

app.use(cors({
  origin: frontendOrigins(),
  credentials: true,
}))
app.use(express.json({ limit: '1mb' }))
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'))

app.use('/api/health', healthRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/account', accountRoutes)
app.use('/api/markets', marketsRoutes)
app.use('/api/trading', tradingRoutes)
app.use('/api/wallet', walletRoutes)

app.use((request, response) => {
  fail(response, 404, `Route not found: ${request.method} ${request.originalUrl}`)
})

app.use((error, _request, response, _next) => {
  fail(response, error.status || 500, error.message || 'Unexpected server error.')
})
