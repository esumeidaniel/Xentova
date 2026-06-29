import { Link } from 'react-router-dom'

import './Splash3.css'

const signals = [
  { pair: 'BTC/USDT', entry: '$67,452', target: '$68,200', stop: '$66,800', side: 'BUY', tone: 'buy' },
  { pair: 'SOL/USDT', entry: '$175.32', target: '$162.00', stop: '$182.50', side: 'SELL', tone: 'sell' },
]

function Splash3() {
  return (
    <main className="splash3-shell">
      <section className="splash3-screen" aria-label="Live signals onboarding">
        <Link to="/signup">Skip</Link>

        <div className="signal-preview-stack">
          {signals.map((signal) => (
            <article className={`signal-preview signal-preview--${signal.tone}`} key={signal.pair}>
              <header>
                <strong>{signal.pair}</strong>
                <span>{signal.side}</span>
              </header>
              <div>
                <p>Entry <b>{signal.entry}</b></p>
                <p>Target <b>{signal.target}</b></p>
                <p>Stop <b>{signal.stop}</b></p>
              </div>
            </article>
          ))}
        </div>

        <div className="splash3-copy">
          <p>03 / 03 - Live Signals</p>
          <h1>Get <span>Live Signals</span> from Top Analysts</h1>
          <p>Receive real-time buy/sell signals with entry, target and stop-loss for every trade.</p>
        </div>

        <div className="splash3-footer">
          <div className="splash3-dots" aria-label="Slide 4 of 4">
            <span />
            <span />
            <span className="active" />
          </div>
          <Link to="/signup">Start Now &rarr;</Link>
        </div>
      </section>
    </main>
  )
}

export default Splash3
