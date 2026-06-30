import { Link } from 'react-router-dom'
import BottomNavbar from '../BottomNavbar.jsx'
import Sidebar from '../shared/Sidebar.jsx'
import './Portfolio.css'

const holdings = [
  { name: 'Bitcoin', symbol: 'BTC', amount: '0.468 BTC', share: '45%', value: '$31,381', change: '+8.14%', tone: 'btc', token: 'B' },
  { name: 'Ethereum', symbol: 'ETH', amount: '4.581 ETH', share: '29%', value: '$18,687', change: '+6.12%', tone: 'eth', token: 'E' },
  { name: 'Solana', symbol: 'SOL', amount: '67.8 SOL', share: '15%', value: '$11,905', change: '+4.10%', tone: 'sol', token: 'S' },
  { name: 'Tether', symbol: 'USDT', amount: '7,849 USDT', share: '6%', value: '$7,849', change: '0.00%', tone: 'usdt', token: 'T' },
  { name: 'XRP', symbol: 'XRP', amount: '4,198 XRP', share: '5%', value: '$2,899', change: '+3.21%', tone: 'xrp', token: 'X' },
]

const allocations = [
  { label: 'BTC', value: '45%', color: '#f4a12a' },
  { label: 'ETH', value: '29%', color: '#7c9cff' },
  { label: 'SOL', value: '15%', color: '#a053f4' },
  { label: 'USDT', value: '6%', color: '#45c7a8' },
  { label: 'Others', value: '5%', color: '#2ca86f' },
]

const summary = [
  { label: 'Assets', value: '5' },
  { label: 'Best Performer', value: 'BTC +8.14%' },
  { label: 'Stablecoin', value: '6%' },
]

function HoldingRow({ asset }) {
  return (
    <article className="holding-row">
      <span className={`asset-icon asset-icon--${asset.tone}`}>{asset.token}</span>
      <div className="asset-name">
        <strong>{asset.name}</strong>
        <p>{asset.amount} · {asset.share}</p>
      </div>
      <div className="asset-value">
        <strong>{asset.value}</strong>
        <span>{asset.change}</span>
      </div>
      <span className={`asset-line asset-line--${asset.tone}`} aria-hidden="true" />
    </article>
  )
}

function Portfolio() {
  return (
    <main className="portfolio-shell">
      <section className="portfolio-app" aria-label="Xentova portfolio dashboard">
        <Sidebar />

        <div className="portfolio-content">
          <header className="portfolio-header">
            <div>
              <p>Portfolio overview</p>
              <h1>Portfolio</h1>
            </div>
            <Link className="portfolio-menu" to="/more" aria-label="More actions">···</Link>
          </header>

          <div className="portfolio-grid">
            <section className="balance-card">
              <p className="section-label">Total Balance</p>
              <strong>$78,623.45</strong>
              <span className="gain-pill">+12.45% ($8,742.21)</span>
            </section>

            <section className="allocation-card">
              <div className="section-heading">
                <h2>Allocation</h2>
              <Link to="/performance">Performance ›</Link>
              </div>
              <div className="allocation-layout">
                <div className="allocation-donut" aria-label="Portfolio allocation chart">
                  <div>
                    <strong>100%</strong>
                    <span>Allocated</span>
                  </div>
                </div>
                <div className="allocation-list">
                  {allocations.map((item) => (
                    <div key={item.label}>
                      <span style={{ backgroundColor: item.color }} />
                      <strong>{item.label}</strong>
                      <em>{item.value}</em>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="portfolio-tabs" aria-label="Portfolio tabs">
              <button className="active" type="button">Assets</button>
              <button type="button">Allocation</button>
              <Link to="/history" className="portfolio-tab-link">History</Link>
            </section>

            <section className="holdings-card">
              <div className="section-heading">
                <h2>Assets</h2>
                <a href="#assets">Manage ›</a>
              </div>
              <div className="holdings-list">
                {holdings.map((asset) => (
                  <HoldingRow asset={asset} key={asset.symbol} />
                ))}
              </div>
            </section>

            <aside className="portfolio-summary">
              {summary.map((item) => (
                <article key={item.label}>
                  <p>{item.label}</p>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </aside>
          </div>
        </div>

      </section>

      <BottomNavbar />
    </main>
  )
}

export default Portfolio
