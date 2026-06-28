import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ButtomNavbar from '../Buttom-navbar.jsx'
import Sidebar from '../shared/Sidebar.jsx'
import './Deposit.css'
import './Withdraw.css'

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

const PinIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const PasteIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const ASSETS = [
  { symbol: 'USDT', name: 'Tether', meta: 'USDT · TRC-20', token: '₮', color: '#26a17b', bg: 'rgba(38, 161, 123, 0.12)', balance: 7849.41, fee: 1.2 },
  { symbol: 'BTC', name: 'Bitcoin', meta: 'BTC · Bitcoin', token: '₿', color: '#f7931a', bg: 'rgba(247, 147, 26, 0.12)', balance: 0.42, fee: 0.00006 },
  { symbol: 'ETH', name: 'Ethereum', meta: 'ETH · ERC-20', token: 'Ξ', color: '#627eea', bg: 'rgba(98, 126, 234, 0.12)', balance: 1.85, fee: 0.0015 },
]

const QUICK_AMOUNTS = [100, 250, 500, 1000]

function Withdraw() {
  const [assetIndex, setAssetIndex] = useState(0)
  const [amount, setAmount] = useState('500')
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle')

  const asset = ASSETS[assetIndex]

  const cycleAsset = () => {
    setAssetIndex((current) => (current + 1) % ASSETS.length)
    setAmount('')
    setError('')
    setStatus('idle')
  }

  const numericAmount = parseFloat(amount) || 0
  const receiveAmount = useMemo(
    () => Math.max(numericAmount - asset.fee, 0),
    [numericAmount, asset.fee]
  )

  const handleSubmit = () => {
    if (numericAmount <= 0) {
      setError('Enter a withdrawal amount greater than 0.')
      return
    }

    if (numericAmount > asset.balance) {
      setError(`Amount cannot exceed your ${asset.symbol} balance.`)
      return
    }

    if (address.trim().length < 10) {
      setError('Enter a valid destination address.')
      return
    }

    setError('')
    setStatus('loading')
    window.setTimeout(() => {
      if (address.toLowerCase().includes('fail')) {
        setStatus('error')
        setError('Withdraw failed. Check the address and try again.')
        return
      }

      setStatus('success')
    }, 450)
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) setAddress(text.trim())
    } catch {
      // clipboard unavailable, ignore
    }
  }

  return (
    <main className="withdraw-shell">
      <section className="withdraw-app" aria-label="Xentova withdraw">
        <Sidebar />

        <div className="withdraw-content">
          <header className="withdraw-topbar">
            <Link className="icon-shell" to="/portfolio" aria-label="Back to portfolio">
              <ArrowLeftIcon />
            </Link>
            <h1>Withdraw</h1>
            <span className="icon-shell" aria-hidden="true" />
          </header>

          <div className="withdraw-body">
            <div className="wallet-balance-card" style={{ background: 'linear-gradient(135deg, var(--sell-dim), rgba(241, 121, 112, 0.04))', borderColor: 'rgba(241, 121, 112, 0.25)' }}>
              <p>Available to Withdraw</p>
              <strong>{asset.balance.toLocaleString(undefined, { maximumFractionDigits: 8 })} {asset.symbol}</strong>
              <span>Network fee ~{asset.fee} {asset.symbol}</span>
            </div>

            <div>
              <p className="wallet-section-label" style={{ marginBottom: '0.6rem' }}>Asset &amp; Amount</p>
              <button type="button" className="wallet-coin-select" onClick={cycleAsset}>
                <span className="wallet-coin-icon" style={{ background: asset.bg, color: asset.color }}>{asset.token}</span>
                <span className="wallet-coin-meta">
                  <strong>{asset.name}</strong>
                  <span>{asset.meta}</span>
                </span>
                <ChevronDownIcon />
              </button>
            </div>

            <div className="withdraw-amount-card">
              <div className="withdraw-amount-row">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  placeholder="0.00"
                  value={amount}
                  onChange={(event) => {
                    setAmount(event.target.value)
                    setError('')
                    setStatus('idle')
                  }}
                  aria-label="Withdrawal amount"
                />
                <span className="withdraw-currency-badge">{asset.symbol}</span>
              </div>
              <div className="withdraw-amount-meta">
                <span>&asymp; ${numericAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</span>
                <button type="button" className="withdraw-max-btn" onClick={() => setAmount(String(asset.balance))}>MAX</button>
              </div>
            </div>

            <div className="withdraw-quick-amounts">
              {QUICK_AMOUNTS.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={Number(amount) === value ? 'active' : ''}
                  onClick={() => setAmount(String(value))}
                >
                  {value >= 1000 ? `${value / 1000}K` : `$${value}`}
                </button>
              ))}
            </div>

            <div>
              <p className="wallet-section-label" style={{ marginBottom: '0.6rem' }}>Destination Address</p>
              <div className="withdraw-addr-input">
                <PinIcon />
                <input
                  type="text"
                  placeholder={`Enter ${asset.symbol} address`}
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value)
                    setError('')
                    setStatus('idle')
                  }}
                  aria-label="Destination address"
                />
                <button type="button" className="withdraw-addr-paste" onClick={handlePaste} aria-label="Paste address">
                  <PasteIcon />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div className="withdraw-fee-row">
                <span>Network Fee</span>
                <span>~{asset.fee} {asset.symbol}</span>
              </div>
              <div className="withdraw-fee-row highlight">
                <span>You Receive</span>
                <span>{receiveAmount.toLocaleString(undefined, { maximumFractionDigits: 8 })} {asset.symbol}</span>
              </div>
            </div>

            {error ? <em className="wallet-form-error">{error}</em> : null}
            {status === 'success' ? <em className="wallet-form-success">Withdrawal request submitted for review.</em> : null}

            <button type="button" className="withdraw-submit" disabled={status === 'loading'} onClick={handleSubmit}>
              {status === 'loading' ? 'Submitting...' : 'Confirm Withdraw'}
            </button>
          </div>
        </div>
      </section>

      <ButtomNavbar />
    </main>
  )
}

export default Withdraw
