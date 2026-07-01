import { env } from '../config/env.js'

const markets = [
  { pair: 'BTC/USDT', symbol: 'BTCUSDT', name: 'Bitcoin' },
  { pair: 'ETH/USDT', symbol: 'ETHUSDT', name: 'Ethereum' },
  { pair: 'SOL/USDT', symbol: 'SOLUSDT', name: 'Solana' },
  { pair: 'BNB/USDT', symbol: 'BNBUSDT', name: 'BNB' },
  { pair: 'XRP/USDT', symbol: 'XRPUSDT', name: 'XRP' },
  { pair: 'ADA/USDT', symbol: 'ADAUSDT', name: 'Cardano' },
]

const fallbackMarkets = [
  { pair: 'BTC/USDT', symbol: 'BTCUSDT', name: 'Bitcoin', price: 67452, change24h: 3.85, volume: 42800000000 },
  { pair: 'ETH/USDT', symbol: 'ETHUSDT', name: 'Ethereum', price: 2763, change24h: 2.14, volume: 18100000000 },
  { pair: 'SOL/USDT', symbol: 'SOLUSDT', name: 'Solana', price: 175.32, change24h: -0.62, volume: 4200000000 },
  { pair: 'BNB/USDT', symbol: 'BNBUSDT', name: 'BNB', price: 612.18, change24h: 1.08, volume: 1900000000 },
  { pair: 'XRP/USDT', symbol: 'XRPUSDT', name: 'XRP', price: 0.61, change24h: -0.25, volume: 1100000000 },
  { pair: 'ADA/USDT', symbol: 'ADAUSDT', name: 'Cardano', price: 0.43, change24h: 0.72, volume: 690000000 },
]

function toNumber(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function normalizeSymbol(input) {
  return String(input || '').toUpperCase().replace('/', '')
}

function marketMeta(symbol) {
  return markets.find((market) => market.symbol === symbol) || {
    pair: symbol.replace('USDT', '/USDT'),
    symbol,
    name: symbol.replace('USDT', ''),
  }
}

async function requestJson(url) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 7000)

  try {
    const response = await fetch(url, { signal: controller.signal })

    if (!response.ok) {
      throw new Error(`Market data request failed with ${response.status}.`)
    }

    return await response.json()
  } finally {
    clearTimeout(timeout)
  }
}

function normalizeBinanceTicker(ticker) {
  const meta = marketMeta(ticker.symbol)

  return {
    pair: meta.pair,
    symbol: meta.symbol,
    name: meta.name,
    price: toNumber(ticker.lastPrice),
    change24h: toNumber(ticker.priceChangePercent),
    high24h: toNumber(ticker.highPrice),
    low24h: toNumber(ticker.lowPrice),
    volume: toNumber(ticker.quoteVolume),
    baseVolume: toNumber(ticker.volume),
  }
}

function normalizeBybitTicker(ticker) {
  const meta = marketMeta(ticker.symbol)
  const change24h = toNumber(ticker.price24hPcnt)

  return {
    pair: meta.pair,
    symbol: meta.symbol,
    name: meta.name,
    price: toNumber(ticker.lastPrice),
    change24h: change24h === null ? null : change24h * 100,
    high24h: toNumber(ticker.highPrice24h),
    low24h: toNumber(ticker.lowPrice24h),
    volume: toNumber(ticker.turnover24h),
    baseVolume: toNumber(ticker.volume24h),
  }
}

function toBybitInterval(interval) {
  const intervalMap = {
    '1m': '1',
    '3m': '3',
    '5m': '5',
    '15m': '15',
    '30m': '30',
    '1h': '60',
    '2h': '120',
    '4h': '240',
    '6h': '360',
    '12h': '720',
    '1d': 'D',
    '1w': 'W',
  }

  return intervalMap[interval] || '60'
}

async function getBinanceMarkets() {
  const symbols = markets.map((market) => market.symbol)
  const query = encodeURIComponent(JSON.stringify(symbols))
  const data = await requestJson(`${env.binanceRestUrl}/api/v3/ticker/24hr?symbols=${query}`)
  return data.map(normalizeBinanceTicker)
}

async function getBybitMarkets() {
  const data = await requestJson(`${env.bybitRestUrl}/v5/market/tickers?category=spot`)
  const wantedSymbols = new Set(markets.map((market) => market.symbol))
  return data.result.list.filter((ticker) => wantedSymbols.has(ticker.symbol)).map(normalizeBybitTicker)
}

function fallbackCandles(symbol, limit) {
  const market = fallbackMarkets.find((item) => item.symbol === symbol) || fallbackMarkets[0]
  const count = Math.max(5, Math.min(Number(limit) || 24, 100))
  const now = Date.now()

  return Array.from({ length: count }, (_, index) => {
    const drift = (index - count / 2) * market.price * 0.0025
    const wave = Math.sin(index / 2) * market.price * 0.008
    const close = market.price + drift + wave

    return {
      time: new Date(now - (count - index) * 60 * 60 * 1000).toISOString(),
      open: close * 0.995,
      high: close * 1.01,
      low: close * 0.99,
      close,
      volume: market.volume / count,
    }
  })
}

export async function getMarkets() {
  if (!env.liveMarketData) {
    return { markets: fallbackMarkets, source: 'fallback-demo' }
  }

  try {
    const data = env.marketDataProvider === 'bybit' ? await getBybitMarkets() : await getBinanceMarkets()
    return { markets: data, source: env.marketDataProvider }
  } catch (error) {
    return {
      markets: fallbackMarkets,
      source: 'fallback-demo',
      message: error.message,
    }
  }
}

export async function getMarket(symbolInput) {
  const symbol = normalizeSymbol(symbolInput)
  const data = await getMarkets()
  const market = data.markets.find((item) => item.symbol === symbol)

  if (!market) {
    throw new Error(`Market ${symbolInput} is not supported yet.`)
  }

  return { market, source: data.source, message: data.message }
}

export async function getCandles(symbolInput, { interval = '1h', limit = 48 } = {}) {
  const symbol = normalizeSymbol(symbolInput)
  const candleLimit = Math.max(5, Math.min(Number(limit) || 48, 200))

  if (!env.liveMarketData) {
    return { candles: fallbackCandles(symbol, candleLimit), source: 'fallback-demo' }
  }

  try {
    if (env.marketDataProvider === 'bybit') {
      const bybitInterval = toBybitInterval(interval)
      const data = await requestJson(
        `${env.bybitRestUrl}/v5/market/kline?category=spot&symbol=${symbol}&interval=${bybitInterval}&limit=${candleLimit}`,
      )

      return {
        candles: data.result.list.reverse().map((item) => ({
          time: new Date(Number(item[0])).toISOString(),
          open: toNumber(item[1]),
          high: toNumber(item[2]),
          low: toNumber(item[3]),
          close: toNumber(item[4]),
          volume: toNumber(item[5]),
        })),
        source: 'bybit',
      }
    }

    const data = await requestJson(
      `${env.binanceRestUrl}/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${candleLimit}`,
    )

    return {
      candles: data.map((item) => ({
        time: new Date(item[0]).toISOString(),
        open: toNumber(item[1]),
        high: toNumber(item[2]),
        low: toNumber(item[3]),
        close: toNumber(item[4]),
        volume: toNumber(item[5]),
      })),
      source: 'binance',
    }
  } catch (error) {
    return {
      candles: fallbackCandles(symbol, candleLimit),
      source: 'fallback-demo',
      message: error.message,
    }
  }
}
