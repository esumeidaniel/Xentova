import { useState } from 'react'
import { Link } from 'react-router-dom'
import ButtomNavbar from '../Buttom-navbar.jsx'
import Sidebar from '../shared/Sidebar.jsx'
import { EmptyState, LoadingState } from '../shared/AppState.jsx'
import { useMockLoading } from '../shared/useMockLoading.js'
import './History.css'

const ArrowLeftIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const FilterIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
)

const UpArrowIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
)

const DownArrowIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
)

const FILTERS = ['All', 'Buy', 'Sell', 'Deposits', 'Withdrawals']

const HISTORY = [
  {
    date: 'Today',
    items: [
      { type: 'Buy', name: 'Buy BTC/USDT', sub: '0.025 BTC · 10:42 AM', amount: '+$1,686.30', up: true, status: 'done', tone: 'rgba(224, 173, 115, 0.18)', color: 'var(--accent)', icon: 'up' },
      { type: 'Sell', name: 'Sell SOL/USDT', sub: '12 SOL · 9:15 AM', amount: '-$210.40', up: false, status: 'done', tone: 'var(--sell-dim)', color: 'var(--sell)', icon: 'down' },
    ],
  },
  {
    date: 'Yesterday',
    items: [
      { type: 'Deposits', name: 'Deposit USDT', sub: 'TRC-20 · 4:30 PM', amount: '+$2,000.00', up: true, status: 'done', tone: 'rgba(98, 126, 234, 0.15)', color: '#7c9cff', icon: 'down' },
      { type: 'Buy', name: 'Buy ETH/USDT', sub: '0.85 ETH · 2:08 PM', amount: '+$94.10', up: true, status: 'done', tone: 'rgba(98, 126, 234, 0.15)', color: '#7c9cff', token: 'Ξ' },
      { type: 'Withdrawals', name: 'Withdraw USDT', sub: 'TRC-20 · 11:02 AM', amount: '-$500.00', up: false, status: 'pending', tone: 'rgba(247, 201, 72, 0.12)', color: '#f7c948', icon: 'up' },
    ],
  },
  {
    date: 'May 10',
    items: [
      { type: 'Buy', name: 'Buy BTC/USDT', sub: '0.04 BTC · Copy: Rei-CryptoPro', amount: '+$2,698.08', up: true, status: 'done', tone: 'rgba(247, 147, 26, 0.12)', color: '#f7931a', token: '₿' },
    ],
  },
]

function History() {
  const [filter, setFilter] = useState('All')
  const isLoading = useMockLoading()

  const groups = HISTORY
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => filter === 'All' || item.type === filter),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <main className="history-shell">
      <section className="history-app" aria-label="Xentova trade history">
        <Sidebar />

        <div className="history-content">
          <header className="history-topbar">
            <Link className="icon-shell" to="/trades" aria-label="Back to trades">
              <ArrowLeftIcon />
            </Link>
            <h1>History</h1>
            <span className="icon-shell" aria-hidden="true"><FilterIcon /></span>
          </header>

          <div className="history-body">
            <div className="hist-summary">
              <div className="hist-summary-card">
                <strong className="up">142</strong>
                <span>Total Trades</span>
              </div>
              <div className="hist-summary-card">
                <strong>68.7%</strong>
                <span>Win Rate</span>
              </div>
              <div className="hist-summary-card">
                <strong className="up">+$12.4K</strong>
                <span>Net P/L</span>
              </div>
            </div>

            <div className="hist-filter">
              {FILTERS.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={item === filter ? 'active' : ''}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            {isLoading ? (
              <LoadingState title="Loading transaction history" message="Fetching your latest deposits, withdrawals, and trades..." />
            ) : groups.length === 0 ? (
              <EmptyState title="No transactions yet" message="Transactions that match this filter will appear here." />
            ) : (
              groups.map((group) => (
                <div key={group.date}>
                  <p className="hist-date-divider">{group.date}</p>
                  <div className="hist-list">
                    {group.items.map((item) => (
                      <div className="hist-item" key={`${group.date}-${item.name}-${item.sub}`}>
                        <div className="hi-left">
                          <span className="hi-icon" style={{ background: item.tone, color: item.color }}>
                            {item.token ? item.token : item.icon === 'down' ? <DownArrowIcon /> : <UpArrowIcon />}
                          </span>
                          <div>
                            <p className="hi-name">{item.name}</p>
                            <p className="hi-sub">{item.sub}</p>
                          </div>
                        </div>
                        <div className="hi-right">
                          <p className={`hi-amount ${item.up ? 'up' : 'down'}`}>{item.amount}</p>
                          <span className={`hi-status ${item.status}`}>
                            {item.status === 'done' ? 'Completed' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <ButtomNavbar />
    </main>
  )
}

export default History
