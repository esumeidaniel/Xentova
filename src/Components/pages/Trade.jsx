import { Link } from 'react-router-dom'
import BottomNavbar from '../BottomNavbar.jsx'
import Sidebar from '../shared/Sidebar.jsx'
import './Trade.css'

const timeframes = ['1m', '5m', '15m', '1h', '4h', '1D']

const orderBook = [
  { price: '67,498.20', amount: '0.184', total: '12,419', side: 'sell' },
  { price: '67,482.80', amount: '0.092', total: '6,208', side: 'sell' },
  { price: '67,461.10', amount: '0.231', total: '15,585', side: 'sell' },
  { price: '67,438.50', amount: '0.156', total: '10,521', side: 'buy' },
  { price: '67,420.00', amount: '0.318', total: '21,439', side: 'buy' },
  { price: '67,405.90', amount: '0.124', total: '8,358', side: 'buy' },
]

const recentTrades = [
  { price: '67,452.10', amount: '0.024', time: '12:42:09', side: 'buy' },
  { price: '67,448.80', amount: '0.110', time: '12:42:04', side: 'sell' },
  { price: '67,455.40', amount: '0.056', time: '12:41:58', side: 'buy' },
  { price: '67,439.20', amount: '0.071', time: '12:41:51', side: 'sell' },
]

const positions = [
  { pair: 'BTC/USDT', side: 'Long', size: '$12,450', entry: '$66,820', pnl: '+$842.21' },
  { pair: 'ETH/USDT', side: 'Long', size: '$7,200', entry: '$2,690', pnl: '+$214.08' },
]

const history = [
  { pair: 'SOL/USDT', type: 'Limit Sell', amount: '$3,850', status: 'Pending', pnl: '-$38.42' },
  { pair: 'BTC/USDT', type: 'Market Buy', amount: '$2,000', status: 'Filled', pnl: '+$86.10' },
]

function Trade() {
  return (
    <main className="trade-shell">
      <section className="trade-app" aria-label="Xentova trading terminal">
        <Sidebar />

        <div className="trade-content">
          <header className="trade-header">
            <div>
              <p>Execution center · Demo UI</p>
              <h1>Trade</h1>
            </div>
            <Link to="/markets">View Markets</Link>
          </header>

          <div className="trade-terminal">
            <section className="pair-header">
              <div>
                <label htmlFor="pair-select">Trading Pair</label>
                <select id="pair-select" defaultValue="BTC/USDT">
                  <option>BTC/USDT</option>
                  <option>ETH/USDT</option>
                  <option>SOL/USDT</option>
                </select>
              </div>
              <strong>$67,452.10</strong>
              <span className="positive">+3.85%</span>
              <dl>
                <div><dt>24h High</dt><dd>$68,120</dd></div>
                <div><dt>24h Low</dt><dd>$65,904</dd></div>
                <div><dt>Volume</dt><dd>$42.8B</dd></div>
              </dl>
            </section>

            <section className="chart-panel">
              <div className="section-heading">
                <h2>BTC/USDT Chart</h2>
                <div className="timeframe-row">
                  {timeframes.map((timeframe) => (
                    <button className={timeframe === '1h' ? 'active' : ''} type="button" key={timeframe}>
                      {timeframe}
                    </button>
                  ))}
                </div>
              </div>
              <div className="chart-canvas" aria-label="Chart placeholder">
                <svg viewBox="0 0 760 260" preserveAspectRatio="none">
                  <path className="chart-fill" d="M0 208 C90 180 120 198 188 152 S310 120 390 132 S510 76 620 82 S708 58 760 46 L760 260 L0 260 Z" />
                  <path className="chart-stroke" d="M0 208 C90 180 120 198 188 152 S310 120 390 132 S510 76 620 82 S708 58 760 46" />
                </svg>
                <span>Chart provider integration pending</span>
              </div>
            </section>

            <aside className="order-form">
              <div className="order-tabs">
                <button className="buy active" type="button">Buy</button>
                <button className="sell" type="button">Sell</button>
              </div>
              <div className="order-type-tabs">
                {['Market', 'Limit', 'Stop Limit'].map((type) => (
                  <button className={type === 'Limit' ? 'active' : ''} type="button" key={type}>{type}</button>
                ))}
              </div>
              <label>Price <input defaultValue="67,452.10" /></label>
              <label>Amount <input defaultValue="0.025 BTC" /></label>
              <label>Risk Limit <select defaultValue="2%"><option>1%</option><option>2%</option><option>5%</option></select></label>
              <div className="order-summary">
                <span>Estimated total</span><strong>$1,686.30</strong>
                <span>Fee estimate</span><strong>$1.68</strong>
              </div>
              <button className="trade-submit" type="button">Preview Order</button>
              <p className="trade-demo-note">Demo UI: trading execution requires backend, risk checks, and exchange API integration.</p>
            </aside>

            <section className="order-book-panel">
              <div className="section-heading"><h2>Order Book</h2><span>Price / Amount / Total</span></div>
              <div className="book-list">
                {orderBook.map((row) => (
                  <article className={`book-row book-row--${row.side}`} key={`${row.price}-${row.amount}`}>
                    <span>{row.price}</span><span>{row.amount}</span><span>{row.total}</span>
                  </article>
                ))}
              </div>
            </section>

            <section className="recent-trades-panel">
              <div className="section-heading"><h2>Recent Trades</h2><span>Live-style feed</span></div>
              <div className="recent-list">
                {recentTrades.map((trade) => (
                  <article className={`recent-row recent-row--${trade.side}`} key={`${trade.time}-${trade.amount}`}>
                    <span>{trade.price}</span><span>{trade.amount}</span><span>{trade.time}</span>
                  </article>
                ))}
              </div>
            </section>

            <section className="trade-table-panel positions-panel">
              <div className="section-heading"><h2>Positions</h2><Link to="/portfolio">Portfolio</Link></div>
              {positions.map((position) => (
                <article className="trade-row" key={position.pair}>
                  <div><strong>{position.pair}</strong><p>{position.side} · Entry {position.entry}</p></div>
                  <span>{position.size}</span>
                  <em>Open</em>
                  <b>{position.pnl}</b>
                </article>
              ))}
            </section>

            <section className="trade-table-panel history-panel">
              <div className="section-heading"><h2>Open Orders & History</h2><Link to="/history">History</Link></div>
              {history.map((trade) => (
                <article className="trade-row" key={`${trade.pair}-${trade.type}`}>
                  <div><strong>{trade.pair}</strong><p>{trade.type}</p></div>
                  <span>{trade.amount}</span>
                  <em>{trade.status}</em>
                  <b className={trade.pnl.startsWith('-') ? 'negative' : ''}>{trade.pnl}</b>
                </article>
              ))}
            </section>
          </div>
        </div>
      </section>

      <BottomNavbar />
    </main>
  )
}

export default Trade
