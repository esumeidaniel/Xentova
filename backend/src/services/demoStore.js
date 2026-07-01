const usersByEmail = new Map()
const sessionsByToken = new Map()
const walletsByUserId = new Map()

const defaultBalances = [
  { asset: 'USDT', available: 25000, locked: 0 },
  { asset: 'BTC', available: 0.35, locked: 0 },
  { asset: 'ETH', available: 4.2, locked: 0 },
  { asset: 'SOL', available: 85, locked: 0 },
]

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function ensureWallet(userId) {
  if (!walletsByUserId.has(userId)) {
    walletsByUserId.set(userId, {
      balances: clone(defaultBalances),
      transactions: [],
      orders: [],
    })
  }

  return walletsByUserId.get(userId)
}

function findBalance(wallet, asset) {
  const normalizedAsset = String(asset || '').toUpperCase()
  let balance = wallet.balances.find((item) => item.asset === normalizedAsset)

  if (!balance) {
    balance = { asset: normalizedAsset, available: 0, locked: 0 }
    wallet.balances.push(balance)
  }

  return balance
}

export function createDemoSession({ email, password, name }) {
  const normalizedEmail = normalizeEmail(email)

  if (!normalizedEmail || !password) {
    throw new Error('Email and password are required.')
  }

  let user = usersByEmail.get(normalizedEmail)

  if (!user) {
    user = {
      id: createId('demo-user'),
      email: normalizedEmail,
      user_metadata: {
        name: name || normalizedEmail.split('@')[0] || 'Demo User',
      },
      app_metadata: {
        provider: 'demo',
      },
      created_at: new Date().toISOString(),
    }
    usersByEmail.set(normalizedEmail, user)
  }

  const accessToken = createId('demo-token')
  sessionsByToken.set(accessToken, user)
  ensureWallet(user.id)

  return {
    user,
    session: {
      access_token: accessToken,
      token_type: 'bearer',
      provider: 'demo',
    },
  }
}

export function getDemoUserByToken(token) {
  return sessionsByToken.get(token) || null
}

export function signOutDemoSession(token) {
  sessionsByToken.delete(token)
}

export function getDemoWallet(userId) {
  return clone(ensureWallet(userId))
}

export function createDemoDeposit(userId, { asset = 'USDT', network = 'TRC20', amount }) {
  const wallet = ensureWallet(userId)
  const depositAmount = Number(amount)

  if (!Number.isFinite(depositAmount) || depositAmount <= 0) {
    throw new Error('Deposit amount must be greater than 0.')
  }

  const balance = findBalance(wallet, asset)
  balance.available += depositAmount

  const deposit = {
    id: createId('DEP'),
    type: 'deposit',
    asset: balance.asset,
    network,
    amount: depositAmount,
    status: 'confirmed-demo',
    createdAt: new Date().toISOString(),
  }

  wallet.transactions.unshift(deposit)
  return clone(deposit)
}

export function createDemoWithdrawal(userId, { asset = 'USDT', network = 'TRC20', amount, address }) {
  const wallet = ensureWallet(userId)
  const withdrawalAmount = Number(amount)

  if (!Number.isFinite(withdrawalAmount) || withdrawalAmount <= 0) {
    throw new Error('Withdrawal amount must be greater than 0.')
  }

  if (!address) {
    throw new Error('Withdrawal address is required.')
  }

  const balance = findBalance(wallet, asset)

  if (balance.available < withdrawalAmount) {
    throw new Error(`Insufficient ${balance.asset} balance.`)
  }

  balance.available -= withdrawalAmount

  const withdrawal = {
    id: createId('WDR'),
    type: 'withdrawal',
    asset: balance.asset,
    network,
    amount: withdrawalAmount,
    address,
    status: 'pending-demo-review',
    createdAt: new Date().toISOString(),
  }

  wallet.transactions.unshift(withdrawal)
  return clone(withdrawal)
}

export function placeDemoOrder(userId, orderInput, market) {
  const wallet = ensureWallet(userId)
  const symbol = String(orderInput.symbol || '').toUpperCase().replace('/', '')
  const side = String(orderInput.side || '').toLowerCase()
  const quantity = Number(orderInput.quantity)
  const price = Number(orderInput.price || market?.price)

  if (!symbol || !['buy', 'sell'].includes(side)) {
    throw new Error('Order symbol and side are required.')
  }

  if (!Number.isFinite(quantity) || quantity <= 0) {
    throw new Error('Order quantity must be greater than 0.')
  }

  if (!Number.isFinite(price) || price <= 0) {
    throw new Error('Order price must be greater than 0.')
  }

  const baseAsset = symbol.replace('USDT', '')
  const quoteAsset = 'USDT'
  const notional = quantity * price
  const baseBalance = findBalance(wallet, baseAsset)
  const quoteBalance = findBalance(wallet, quoteAsset)

  if (side === 'buy') {
    if (quoteBalance.available < notional) {
      throw new Error(`Insufficient ${quoteAsset} balance.`)
    }

    quoteBalance.available -= notional
    baseBalance.available += quantity
  } else {
    if (baseBalance.available < quantity) {
      throw new Error(`Insufficient ${baseAsset} balance.`)
    }

    baseBalance.available -= quantity
    quoteBalance.available += notional
  }

  const order = {
    id: createId('ORD'),
    symbol,
    side,
    type: orderInput.type || 'market',
    quantity,
    price,
    notional,
    status: 'filled-demo',
    createdAt: new Date().toISOString(),
  }

  wallet.orders.unshift(order)
  wallet.transactions.unshift({
    id: createId('TRX'),
    type: 'trade',
    asset: side === 'buy' ? baseAsset : quoteAsset,
    amount: side === 'buy' ? quantity : notional,
    status: 'filled-demo',
    orderId: order.id,
    createdAt: order.createdAt,
  })

  return clone(order)
}
