import { useState } from 'react'
import { Link } from 'react-router-dom'
import ButtomNavbar from '../Buttom-navbar.jsx'
import Sidebar from '../shared/Sidebar.jsx'
import './Deposit.css'

const ArrowLeftIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const WarningIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

const QrCode = () => (
  <svg viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg">
    <rect width="110" height="110" fill="#fff" />
    {[
      [6, 6], [22, 6], [38, 6], [6, 22], [38, 22], [6, 38], [22, 38], [38, 38],
      [70, 6], [86, 6], [102, 6], [70, 22], [102, 22], [70, 38], [86, 38], [102, 38],
      [6, 70], [22, 70], [38, 70], [6, 86], [38, 86], [6, 102], [22, 102], [38, 102],
      [42, 74], [58, 74], [66, 74], [74, 74],
      [42, 82], [58, 82], [66, 82], [82, 82],
      [42, 90], [50, 90], [66, 90], [96, 90],
      [42, 98], [58, 98], [82, 98],
    ].map(([x, y]) => (
      <rect key={`${x}-${y}`} x={x} y={y} width="6" height="6" fill="#030408" />
    ))}
    <rect x="46" y="46" width="18" height="18" fill="#fff" rx="3" />
    <rect x="48" y="48" width="14" height="14" fill="var(--accent)" rx="2" />
  </svg>
)

const ASSETS = [
  { symbol: 'BTC', name: 'Bitcoin', token: '₿', color: '#f7931a', bg: 'rgba(247, 147, 26, 0.12)', networks: ['BTC', 'BEP-20', 'Lightning'], address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' },
  { symbol: 'ETH', name: 'Ethereum', token: 'Ξ', color: '#627eea', bg: 'rgba(98, 126, 234, 0.12)', networks: ['ERC-20', 'BEP-20', 'Arbitrum'], address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' },
  { symbol: 'USDT', name: 'Tether', token: '₮', color: '#26a17b', bg: 'rgba(38, 161, 123, 0.12)', networks: ['TRC-20', 'ERC-20', 'BEP-20'], address: 'TXk2m7Pq5sV9Y3wRzB6cN1xJfL8tQv3qXv3q8Hk2m' },
  { symbol: 'SOL', name: 'Solana', token: '◎', color: '#9945ff', bg: 'rgba(153, 69, 255, 0.12)', networks: ['Solana'], address: '7g5kV2pQz8YxWnB4cM1tR3uJsH6dF9eL2qX5pT4kN8m' },
]

function Deposit() {
  const [assetIndex, setAssetIndex] = useState(0)
  const [networkIndex, setNetworkIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle')

  const asset = ASSETS[assetIndex]

  const cycleAsset = () => {
    setAssetIndex((current) => (current + 1) % ASSETS.length)
    setNetworkIndex(0)
    setCopied(false)
    setError('')
  }

  const handleSubmit = () => {
    const numericAmount = Number(amount)

    if (!amount || numericAmount <= 0) {
      setError('Enter a deposit amount greater than 0.')
      return
    }

    if (numericAmount < 10) {
      setError('Minimum deposit is $10.')
      return
    }

    setError('')
    setStatus('loading')
    window.setTimeout(() => {
      if (numericAmount === 13) {
        setStatus('error')
        setError('Deposit failed. Please check the network and try again.')
        return
      }

      setStatus('success')
    }, 450)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(asset.address)
    } catch {
      // clipboard unavailable, ignore
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <main className="deposit-shell">
      <section className="deposit-app" aria-label="Xentova deposit">
        <Sidebar />

        <div className="deposit-content">
          <header className="deposit-topbar">
            <Link className="icon-shell" to="/portfolio" aria-label="Back to portfolio">
              <ArrowLeftIcon />
            </Link>
            <h1>Deposit</h1>
            <span className="icon-shell" aria-hidden="true" />
          </header>

          <div className="deposit-body">
            <div className="wallet-balance-card">
              <p>Available Balance</p>
              <strong>$78,623.45</strong>
              <span>Last deposit: $2,000 USDT &middot; 2 days ago</span>
            </div>

            <label className="wallet-form-card">
              <span>Deposit Amount</span>
              <div className="wallet-amount-input">
                <input
                  type="number"
                  min="0"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={amount}
                  onChange={(event) => {
                    setAmount(event.target.value)
                    setError('')
                    setStatus('idle')
                  }}
                  aria-invalid={Boolean(error)}
                />
                <strong>{asset.symbol}</strong>
              </div>
              {error ? <em className="wallet-form-error">{error}</em> : null}
              {status === 'success' ? <em className="wallet-form-success">Deposit request created. Send funds to the address below.</em> : null}
            </label>

            <div>
              <p className="wallet-section-label" style={{ marginBottom: '0.6rem' }}>Select Asset</p>
              <button type="button" className="wallet-coin-select" onClick={cycleAsset}>
                <span className="wallet-coin-icon" style={{ background: asset.bg, color: asset.color }}>{asset.token}</span>
                <span className="wallet-coin-meta">
                  <strong>{asset.name}</strong>
                  <span>{asset.symbol}</span>
                </span>
                <ChevronDownIcon />
              </button>
            </div>

            <div>
              <p className="wallet-section-label" style={{ marginBottom: '0.6rem' }}>Select Network</p>
              <div className="wallet-network-row">
                {asset.networks.map((network, index) => (
                  <button
                    key={network}
                    type="button"
                    className={index === networkIndex ? 'active' : ''}
                    onClick={() => setNetworkIndex(index)}
                  >
                    {network}
                  </button>
                ))}
              </div>
            </div>

            <div className="wallet-qr-section">
              <div className="wallet-qr-box"><QrCode /></div>
              <div className="wallet-addr-box">
                <span className="wallet-addr-text">{asset.address}</span>
                <button type="button" className="wallet-copy-btn" onClick={handleCopy}>
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="wallet-warning">
              <WarningIcon />
              <p>
                Only send {asset.symbol} ({asset.networks[networkIndex]}) to this address.
                Sending any other coin or using the wrong network may result in permanent loss of funds.
              </p>
            </div>

            <button type="button" className="wallet-primary-action" disabled={status === 'loading'} onClick={handleSubmit}>
              {status === 'loading' ? 'Creating deposit...' : 'Create Deposit'}
            </button>
          </div>
        </div>
      </section>

      <ButtomNavbar />
    </main>
  )
}

export default Deposit
