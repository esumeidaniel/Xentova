import { Link } from 'react-router-dom'
import BottomNavbar from '../BottomNavbar.jsx'
import Sidebar from '../shared/Sidebar.jsx'
import './Markets.css'

const tabs = ['All', 'Favorites', 'Spot', 'Futures', 'Top Gainers', 'Top Losers', 'New Listings']

const markets = [
  { star: true, name: 'Bitcoin', pair: 'BTC/USDT', price: '$67,452.10', change: '+3.85%', volume: '$42.8B', cap: '$1.32T', tone: 'gold' },
  { star: true, name: 'Ethereum', pair: 'ETH/USDT', price: '$2,763.40', change: '+2.14%', volume: '$18.1B', cap: '$332B', tone: 'blue' },
  { star: false, name: 'Solana', pair: 'SOL/USDT', price: '$175.32', change: '-0.62%', volume: '$4.2B', cap: '$81B', tone: 'purple', negative: true },
  { star: false, name: 'Chainlink', pair: 'LINK/USDT', price: '$18.42', change: '+5.70%', volume: '$740M', cap: '$11B', tone: 'blue' },
  { star: false, name: 'XRP', pair: 'XRP/USDT', price: '$0.68', change: '+3.21%', volume: '$2.8B', cap: '$38B', tone: 'green' },
]

const trending = [
  { token: 'B', name: 'BTC', text: 'Institutional flow rising', meta: '+3.85%', tone: 'gold' },
  { token: 'L', name: 'LINK', text: 'Oracle volume spike', meta: '+5.70%', tone: 'blue' },
  { token: 'A', name: 'ARB', text: 'Layer 2 watchlist', meta: '+8.20%', tone: 'green' },
]

function CoinBadge({ market }) {
  return <span className={`market-token market-token--${market.tone}`}>{market.name.charAt(0)}</span>
}

function Markets() {
  return (
    <main className="markets-shell">
      <section className="markets-app" aria-label="Xentova markets">
        <Sidebar />

        <div className="markets-content">
          <header className="markets-header">
            <div>
              <p>Market discovery · Demo data</p>
              <h1>Markets</h1>
            </div>
            <Link to="/trades">Trade</Link>
          </header>

          <div className="markets-body">
            <section className="markets-hero">
              <div>
                <span className="markets-kicker">Global market cap</span>
                <h2>$2.48T</h2>
                <p>Track watchlists, movers, sentiment, and trading pairs before opening a demo order.</p>
              </div>
              <div className="sentiment-card">
                <p>Market Sentiment</p>
                <strong>68 / 100</strong>
                <span>Moderate risk appetite</span>
              </div>
            </section>

            <section className="market-controls">
              <label>
                <span>Search coins or pairs</span>
                <input type="search" placeholder="Search BTC, ETH, SOL..." />
              </label>
              <div className="market-tabs" aria-label="Market filters">
                {tabs.map((tab) => (
                  <button className={tab === 'All' ? 'active' : ''} type="button" key={tab}>{tab}</button>
                ))}
              </div>
            </section>

            <section className="market-table-card">
              <div className="section-heading">
                <h2>Market Watch</h2>
                <span>Preview only</span>
              </div>
              <div className="market-table" role="table">
                <div className="market-table-head" role="row">
                  <span>Pair</span><span>Price</span><span>24h</span><span>Volume</span><span>Market Cap</span><span>Action</span>
                </div>
                {markets.map((market) => (
                  <article className="market-row" key={market.pair} role="row">
                    <div className="market-pair">
                      <button className={market.star ? 'watch-star active' : 'watch-star'} type="button">★</button>
                      <CoinBadge market={market} />
                      <div><strong>{market.name}</strong><p>{market.pair}</p></div>
                    </div>
                    <span>{market.price}</span>
                    <em className={market.negative ? 'negative' : ''}>{market.change}</em>
                    <span>{market.volume}</span>
                    <span>{market.cap}</span>
                    <Link to="/trades">Trade</Link>
                  </article>
                ))}
              </div>
            </section>

            <section className="market-card-list" aria-label="Mobile market cards">
              {markets.map((market) => (
                <article className="market-card" key={market.pair}>
                  <div className="market-pair">
                    <CoinBadge market={market} />
                    <div><strong>{market.name}</strong><p>{market.pair}</p></div>
                  </div>
                  <div className="market-card-price">
                    <strong>{market.price}</strong>
                    <em className={market.negative ? 'negative' : ''}>{market.change}</em>
                  </div>
                  <p>Vol {market.volume} · Cap {market.cap}</p>
                  <Link to="/trades">Trade</Link>
                </article>
              ))}
            </section>

            <section className="market-side-grid">
              <article className="market-insight-card">
                <div className="section-heading"><h2>Trending Coins</h2><Link to="/price-alerts">Set Alert</Link></div>
                {trending.map((item) => (
                  <div className="trend-row" key={item.name}>
                    <span className={`market-token market-token--${item.tone}`}>{item.token}</span>
                    <div><strong>{item.name}</strong><p>{item.text}</p></div>
                    <em>{item.meta}</em>
                  </div>
                ))}
              </article>

              <article className="market-insight-card">
                <div className="section-heading"><h2>Top Gainers / Losers</h2><span>24h</span></div>
                <div className="gainer-row"><strong>ARB/USDT</strong><span>+8.20%</span></div>
                <div className="gainer-row"><strong>LINK/USDT</strong><span>+5.70%</span></div>
                <div className="gainer-row negative"><strong>SOL/USDT</strong><span>-0.62%</span></div>
              </article>
            </section>

            <section className="markets-warning">
              <strong>Demo market data</strong>
              <p>Prices and market data are placeholders until a live market data provider and backend cache are connected.</p>
            </section>
          </div>
        </div>
      </section>

      <BottomNavbar />
    </main>
  )
}

export default Markets
