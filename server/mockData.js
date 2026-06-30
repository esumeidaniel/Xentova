export const user = {
  id: 'user_demo_001',
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  initials: 'JD',
  accountStatus: 'Verified',
  kycStatus: 'Verified',
  twoFactorEnabled: true,
}

export const markets = [
  { pair: 'BTC/USDT', name: 'Bitcoin', price: 67452, change24h: 3.85, volume: '42.8B', marketCap: '1.32T' },
  { pair: 'ETH/USDT', name: 'Ethereum', price: 2763, change24h: 2.14, volume: '18.1B', marketCap: '332B' },
  { pair: 'SOL/USDT', name: 'Solana', price: 175.32, change24h: -0.62, volume: '4.2B', marketCap: '81B' },
  { pair: 'XRP/USDT', name: 'XRP', price: 0.68, change24h: 3.21, volume: '2.8B', marketCap: '38B' },
  { pair: 'LINK/USDT', name: 'Chainlink', price: 18.42, change24h: 5.7, volume: '740M', marketCap: '11B' },
]

export const portfolio = {
  totalBalance: 78623.45,
  availableBalance: 12840,
  lockedBalance: 2410,
  totalPnl: 8742.21,
  assets: [
    { symbol: 'BTC', name: 'Bitcoin', amount: 0.468, value: 31381, change: 8.14, allocation: 45 },
    { symbol: 'ETH', name: 'Ethereum', amount: 4.581, value: 18687, change: 6.12, allocation: 29 },
    { symbol: 'SOL', name: 'Solana', amount: 67.8, value: 11905, change: 4.1, allocation: 15 },
    { symbol: 'USDT', name: 'Tether', amount: 7849, value: 7849, change: 0, allocation: 6 },
  ],
}

export const signals = [
  { pair: 'BTC/USDT', side: 'BUY', entry: 67452, takeProfit: 68200, stopLoss: 66800, risk: 'Low', confidence: 92, status: 'Active', trader: 'Rei-CryptoPro', winRate: 87 },
  { pair: 'ETH/USDT', side: 'BUY', entry: 2763, takeProfit: 2900, stopLoss: 2680, risk: 'Moderate', confidence: 84, status: 'Active', trader: 'AlphaBull', winRate: 72 },
  { pair: 'SOL/USDT', side: 'SELL', entry: 175.32, takeProfit: 162, stopLoss: 182.5, risk: 'High', confidence: 68, status: 'Active', trader: 'MoonTrader', winRate: 61 },
]

export const transactions = [
  { id: 'TX-1001', type: 'Deposit', asset: 'USDT', amount: 2000, status: 'Confirmed', date: 'Today' },
  { id: 'TX-1002', type: 'Copied Trade', asset: 'BTC', amount: 842.21, status: 'Filled', date: 'Today' },
  { id: 'TX-1003', type: 'Withdraw', asset: 'USDT', amount: -500, status: 'Pending review', date: 'Yesterday' },
]
