import { Link } from 'react-router-dom'
import ButtomNavbar from '../Buttom-navbar.jsx'
import Sidebar from '../shared/Sidebar.jsx'
import { LoadingState } from '../shared/AppState.jsx'
import { useMockLoading } from '../shared/useMockLoading.js'
import './Home.css'

/* ─── Greeting ───────────────────────────────────────────── */
const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

/* ─── Icons ──────────────────────────────────────────────── */
const ArrowUpIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
    <path d="M12 19V5" /><path d="m6 11 6-6 6 6" />
  </svg>
)
const ArrowDownIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
    <path d="M12 5v14" /><path d="m18 13-6 6-6-6" />
  </svg>
)
const TransferIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
    <path d="M17 4 21 8l-4 4" /><path d="M3 8h18" />
    <path d="m7 20-4-4 4-4" /><path d="M21 16H3" />
  </svg>
)
const FileIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
    <path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5" />
  </svg>
)
const BellIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
    <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </svg>
)

const Chart = () => (
  <div className="home-chart" aria-label="Portfolio chart">
    <svg viewBox="0 0 360 130" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#e0ad73" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#e0ad73" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path className="chart-area" d="M0 104 C30 96 45 86 72 78 C92 72 102 76 121 65 C139 56 151 66 174 58 C197 50 206 51 228 40 C250 29 268 34 292 26 C314 20 333 25 360 18 L360 130 L0 130 Z" />
      <path className="chart-line" d="M0 104 C30 96 45 86 72 78 C92 72 102 76 121 65 C139 56 151 66 174 58 C197 50 206 51 228 40 C250 29 268 34 292 26 C314 20 333 25 360 18" />
      <circle className="chart-dot" cx="360" cy="18" r="5" />
    </svg>
  </div>
)

const MiniBars = ({ negative = false }) => (
  <span className={`mini-bars ${negative ? 'mini-bars--negative' : ''}`} aria-hidden="true">
    <i /><i /><i /><i /><i />
  </span>
)

const actions = [
  { label: 'Deposit', icon: <ArrowUpIcon />, to: '/deposit' },
  { label: 'Withdraw', icon: <ArrowDownIcon />, to: '/withdraw' },
  { label: 'Transfer', icon: <TransferIcon />, to: '/withdraw' },
  { label: 'Buy Crypto', icon: <ArrowUpIcon />, to: '/buy-crypto' },
  { label: 'Trade', icon: <TransferIcon />, to: '/trades' },
  { label: 'History', icon: <FileIcon />, to: '/history' },
]

const stats = [
  { label: 'Monthly Return', value: '+12.45%', meta: '+$8,742' },
  { label: 'Win Rate', value: '68.7%', meta: '+5.4%' },
  { label: 'Avg Risk/Reward', value: '1.82 : 1', meta: '+0.1' },
  { label: 'AUM', value: '$78.62M', meta: '+6.33%' },
]

const movers = [
  { name: 'Bitcoin', pair: 'BTC / USDT', price: '$67,452', change: '+3.85%', token: 'B', tone: 'btc' },
  { name: 'Ethereum', pair: 'ETH / USDT', price: '$2,763', change: '+2.14%', token: 'E', tone: 'eth' },
  { name: 'Solana', pair: 'SOL / USDT', price: '$175.32', change: '-0.62%', token: 'S', tone: 'sol', negative: true },
]

const activity = [
  { title: 'Deposit confirmed', detail: 'USDT via TRC-20', value: '+$2,000.00', tone: 'up' },
  { title: 'BTC/USDT copied trade', detail: 'Rei-CryptoPro strategy', value: '+$842.21', tone: 'up' },
  { title: 'Withdraw request', detail: 'Pending review', value: '-$500.00', tone: 'down' },
]

const signalPreview = [
  { pair: 'BTC/USDT', action: 'Buy', confidence: '92%', target: '$70,000' },
  { pair: 'ETH/USDT', action: 'Buy', confidence: '86%', target: '$2,920' },
  { pair: 'SOL/USDT', action: 'Sell', confidence: '78%', target: '$168' },
]

function Home() {
  const isLoading = useMockLoading()

  return (
    <main className="home-shell">
      <section className="home-app" aria-label="Xentova home dashboard">
        <Sidebar />

        <div className="home-content">
          <header className="home-topbar">
            <div>
              <p>{getGreeting()}</p>
              <h1>John Doe</h1>
              <span className="home-status-pill">Verified account · KYC approved · Demo UI</span>
            </div>
            <div className="home-top-actions">
              <Link className="icon-shell" to="/notifications" aria-label="Notifications">
                <BellIcon />
              </Link>
              <Link className="avatar" to="/profile" aria-label="Profile">JD</Link>
            </div>
          </header>

          {isLoading ? (
            <div className="dashboard-grid">
              <LoadingState title="Loading dashboard" message="Syncing portfolio value, performance, and market movers..." />
            </div>
          ) : (
          <div className="dashboard-grid">
            <section className="portfolio-hero">
              <div className="portfolio-heading">
                <div>
                  <p className="section-label">Total Portfolio Value</p>
                  <strong>$78,623.45</strong>
                </div>
                <span className="gain-pill">+$8,742.21&nbsp;&nbsp;(+12.45%)</span>
              </div>
              <div className="range-tabs" aria-label="Chart range">
                {['1D', '7D', '30D', '1Y'].map((t) => (
                  <button key={t} className={t === '30D' ? 'active' : ''} type="button">{t}</button>
                ))}
              </div>
              <Chart />
            </section>

            <section className="quick-actions" aria-label="Quick actions">
              {actions.map((action) => (
                <Link to={action.to} key={action.label}>
                  <span className="quick-action-icon">{action.icon}</span>
                  {action.label}
                </Link>
              ))}
            </section>

            <section className="home-section performance-section">
              <div className="section-heading">
                <h2>Performance Overview</h2>
                <Link to="/history" className="section-link">This Month ›</Link>
              </div>
              <div className="stats-grid">
                {stats.map((stat) => (
                  <article className="stat-card" key={stat.label}>
                    <p>{stat.label}</p>
                    <strong>{stat.value}</strong>
                    <span>{stat.meta}</span>
                  </article>
                ))}
              </div>
            </section>

            <section className="home-section movers-section">
              <div className="section-heading">
                <h2>Top Movers</h2>
                <Link to="/markets" className="section-link">View All ›</Link>
              </div>
              <div className="movers-list">
                {movers.map((mover) => (
                  <article className="mover-row" key={mover.name}>
                    <span className={`coin-icon coin-icon--${mover.tone}`}>{mover.token}</span>
                    <div>
                      <strong>{mover.name}</strong>
                      <p>{mover.pair}</p>
                    </div>
                    <MiniBars negative={mover.negative} />
                    <div className="mover-price">
                      <strong>{mover.price}</strong>
                      <span className={mover.negative ? 'negative' : ''}>{mover.change}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="home-section activity-section">
              <div className="section-heading">
                <h2>Recent Activity</h2>
                <Link to="/history" className="section-link">Open History ›</Link>
              </div>
              <div className="activity-list">
                {activity.map((item) => (
                  <article className="activity-row" key={item.title}>
                    <span className={`activity-dot activity-dot--${item.tone}`} />
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.detail}</p>
                    </div>
                    <em className={item.tone === 'down' ? 'negative' : ''}>{item.value}</em>
                  </article>
                ))}
              </div>
            </section>

            <section className="home-section signal-preview-section">
              <div className="section-heading">
                <h2>Signal Preview</h2>
                <Link to="/signals" className="section-link">View Signals ›</Link>
              </div>
              <div className="signal-preview-grid">
                {signalPreview.map((signal) => (
                  <article className="signal-preview-card" key={signal.pair}>
                    <strong>{signal.pair}</strong>
                    <span className={signal.action === 'Sell' ? 'negative' : ''}>{signal.action}</span>
                    <p>{signal.confidence} confidence</p>
                    <em>Target {signal.target}</em>
                  </article>
                ))}
              </div>
            </section>

            <section className="home-risk-card">
              <strong>Preview only</strong>
              <p>Xentova is currently a frontend demo. Deposits, withdrawals, signals, and trades require backend, wallet, compliance, and API integration before they can be used with real funds.</p>
            </section>
          </div>
          )}
        </div>

      </section>

      <ButtomNavbar />
    </main>
  )
}

export default Home
