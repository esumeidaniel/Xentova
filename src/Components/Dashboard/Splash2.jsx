import { Link } from 'react-router-dom'

import './Splash2.css'

const traders = [
  { name: 'Rei-CryptoPro', rate: '68.7% Win Rate', gain: '+24.3%', initials: 'RC', tone: 'cyan' },
  { name: 'AlphaBull', rate: '72.1% Win Rate', gain: '+18.7%', initials: 'AB', tone: 'orange' },
  { name: 'MoonTrader', rate: '61.4% Win Rate', gain: 'Following', initials: 'MT', tone: 'violet' },
]

function Splash2() {
  return (
    <main className="splash2-shell">
      <section className="splash2-screen" aria-label="Copy trading onboarding">
        <div className="splash2-status">
          <span>9:41</span>
          <span>100%</span>
        </div>
        <Link to="/signup">Skip</Link>

        <div className="trader-stack">
          {traders.map((trader) => (
            <article className="trader-card" key={trader.name}>
              <span className={`trader-avatar trader-avatar--${trader.tone}`}>{trader.initials}</span>
              <div>
                <strong>{trader.name}</strong>
                <p>{trader.rate}</p>
              </div>
              <em>{trader.gain}</em>
            </article>
          ))}
        </div>

        <div className="splash2-copy">
          <p>02 / 03 - Copy Trading</p>
          <h1>Copy <span>Expert Traders</span> Automatically</h1>
          <p>Follow verified professional traders and auto-copy their trades with full risk control.</p>
        </div>

        <div className="splash2-footer">
          <div className="splash2-dots" aria-label="Slide 3 of 4">
            <span />
            <span className="active" />
            <span />
          </div>
          <Link to="/splash3">Next &rsaquo;</Link>
        </div>
      </section>
    </main>
  )
}

export default Splash2
