import { Link } from 'react-router-dom'
import ButtomNavbar from '../Buttom-navbar.jsx'
import Sidebar from '../shared/Sidebar.jsx'
import './Trade.css'

const trades = [
  { pair: 'BTC / USDT', type: 'Buy', amount: '$12,450', status: 'Open', pnl: '+$842.21' },
  { pair: 'ETH / USDT', type: 'Buy', amount: '$7,200', status: 'Filled', pnl: '+$214.08' },
  { pair: 'SOL / USDT', type: 'Sell', amount: '$3,850', status: 'Pending', pnl: '-$38.42' },
]

function Trade() {
  return (
    <main className="trade-shell">
      <section className="trade-app" aria-label="Xentova trades dashboard">
        <Sidebar />

        <div className="trade-content">
          <header className="trade-header">
            <div>
              <p>Execution center</p>
              <h1>Trades</h1>
            </div>
            <Link to="/order-book">+ New Trade</Link>
          </header>

          <div className="trade-grid">
            <section className="trade-ticket">
              <p className="section-label">Quick Trade</p>
              <h2>BTC / USDT</h2>
              <div className="trade-actions">
                <Link to="/markets">Markets</Link>
                <Link to="/copy-trading">Copy</Link>
              </div>
              <label>
                Amount
                <input type="text" defaultValue="$1,000" />
              </label>
              <Link className="trade-submit" to="/order-book">Preview Order</Link>
            </section>

            <section className="trade-list-card">
              <div className="section-heading">
                <h2>Recent Trades</h2>
                <span>This Month</span>
              </div>
              <div className="trade-list">
                {trades.map((trade) => (
                  <article className="trade-row" key={trade.pair}>
                    <div>
                      <strong>{trade.pair}</strong>
                      <p>{trade.type} order</p>
                    </div>
                    <span>{trade.amount}</span>
                    <em>{trade.status}</em>
                    <b className={trade.pnl.startsWith('-') ? 'negative' : ''}>{trade.pnl}</b>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>

      </section>

      <ButtomNavbar />
    </main>
  )
}

export default Trade
