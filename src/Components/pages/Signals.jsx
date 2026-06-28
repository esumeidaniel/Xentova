import { Link } from 'react-router-dom'
import ButtomNavbar from '../Buttom-navbar.jsx'
import Sidebar from '../shared/Sidebar.jsx'
import './Signal.css'

const SearchIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m16.5 16.5 4 4" /></svg>
)
const MenuIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 8h12" /><path d="M6 12h12" /><path d="M6 16h12" /></svg>
)

const signalData = [
  {
    pair: 'BTC / USDT', time: '2 hrs ago',
    entry: '$67,452', profit: '$68,200', stop: '$66,800',
    progress: 62, side: 'BUY', strength: 'Strong',
    trader: 'Rei-CryptoPro', initials: 'RC', token: 'B', tone: 'btc',
  },
  {
    pair: 'ETH / USDT', time: '5 hrs ago',
    entry: '$2,763', profit: '$2,900', stop: '$2,680',
    progress: 38, side: 'BUY', strength: 'Moderate',
    trader: 'AlphaBull', initials: 'AB', token: 'E', tone: 'eth',
  },
  {
    pair: 'SOL / USDT', time: '8 hrs ago',
    entry: '$175.32', profit: '$162.00', stop: '$182.50',
    progress: 21, side: 'SELL', strength: 'Moderate',
    trader: 'MoonTrader', initials: 'MT', token: 'S', tone: 'sol', negative: true,
  },
]

const tabs = ['All Signals', 'My Copy', 'Favorites', 'BTC', 'ETH']

const StrengthDots = ({ negative = false, count = 4 }) => (
  <span className={`strength-dots ${negative ? 'strength-dots--sell' : ''}`} aria-hidden="true">
    {Array.from({ length: 6 }, (_, i) => (
      <i className={i < count ? 'filled' : ''} key={i} />
    ))}
  </span>
)

function SignalCard({ signal }) {
  return (
    <article className={`signal-card ${signal.negative ? 'signal-card--sell' : ''}`}>
      <div className="signal-card-main">
        <div className="signal-pair">
          <span className={`signal-token signal-token--${signal.tone}`}>{signal.token}</span>
          <div>
            <h2>{signal.pair}</h2>
            <p>{signal.time}</p>
          </div>
        </div>
        <div className="signal-side">
          <span>{signal.side}</span>
          <div>
            <StrengthDots negative={signal.negative} count={signal.negative ? 3 : signal.strength === 'Strong' ? 5 : 4} />
            <p style={{ fontSize: '0.68rem', color: 'rgba(247,243,236,0.46)', marginTop: '0.2rem' }}>{signal.strength}</p>
          </div>
        </div>
      </div>

      <div className="signal-values">
        <div><p>Entry</p><strong>{signal.entry}</strong></div>
        <div><p>Take Profit</p><strong>{signal.profit}</strong></div>
        <div><p>Stop Loss</p><strong className="danger">{signal.stop}</strong></div>
      </div>

      <div className="signal-progress">
        <div>
          <span>Progress to Target</span>
          <strong>{signal.progress}%</strong>
        </div>
        <meter min="0" max="100" value={signal.progress} aria-label={`${signal.progress}% progress to target`} />
      </div>

      <footer className="signal-footer">
        <div>
          <span className={`trader-avatar signal-token--${signal.tone}`}>{signal.initials}</span>
          <strong>{signal.trader}</strong>
        </div>
        <Link to="/copy-trading">Follow Signal</Link>
      </footer>
    </article>
  )
}

function Signals() {
  return (
    <main className="signals-shell">
      <section className="signals-app" aria-label="Xentova signals dashboard">
        <Sidebar />

        <div className="signals-content">
          <header className="signals-header">
            <div>
              <p>Trading intelligence</p>
              <h1>Signals</h1>
            </div>
            <div className="signals-actions">
              <Link to="/more" aria-label="Menu"><MenuIcon /></Link>
              <Link to="/markets" aria-label="Search"><SearchIcon /></Link>
            </div>
          </header>

          <nav className="signal-tabs" aria-label="Signal filters">
            {tabs.map((tab, index) => (
              <button className={index === 0 ? 'active' : ''} type="button" key={tab}>{tab}</button>
            ))}
          </nav>

          <div className="signals-grid">
            <section className="signals-list" aria-label="Signal list">
              {signalData.map((signal) => (
                <SignalCard key={signal.pair} signal={signal} />
              ))}
            </section>

            <aside className="signals-summary" aria-label="Signal summary">
              <article>
                <p>Active Signals</p>
                <strong>24</strong>
                <span>8 high confidence</span>
              </article>
              <article>
                <p>Copy Win Rate</p>
                <strong>68.7%</strong>
                <span>+5.4% this month</span>
              </article>
              <article>
                <p>Best Pair</p>
                <strong>BTC / USDT</strong>
                <span>Strong buy trend</span>
              </article>
            </aside>
          </div>
        </div>

      </section>

      <ButtomNavbar />
    </main>
  )
}

export default Signals
