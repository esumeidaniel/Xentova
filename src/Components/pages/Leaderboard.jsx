import { useState } from 'react'
import { Link } from 'react-router-dom'
import ButtomNavbar from '../Buttom-navbar.jsx'
import Sidebar from '../shared/Sidebar.jsx'
import './Leaderboard.css'

const ArrowLeftIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const SearchIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const TABS = ['This Week', 'This Month', 'All Time']

const PODIUM = [
  { rank: 2, name: 'AlphaBull', initials: 'AB', return: '+18.7%', bg: 'linear-gradient(135deg,#f7931a,#ff6b35)', border: 'rgba(192,192,192,0.4)', barColor: 'rgba(192,192,192,0.18)', barBorder: 'rgba(192,192,192,0.25)', barTextColor: 'rgba(192,192,192,0.7)', height: '3.2rem' },
  { rank: 1, name: 'Rei-CryptoPro', initials: 'RC', return: '+24.3%', bg: 'linear-gradient(135deg, var(--accent), var(--accent-bright))', border: '#ffd700', barColor: 'rgba(255,215,0,0.18)', barBorder: 'rgba(255,215,0,0.3)', barTextColor: '#ffd700', height: '4.4rem', crown: true },
  { rank: 3, name: 'MoonTrader', initials: 'MT', return: '+15.1%', bg: 'linear-gradient(135deg,#9945ff,#627eea)', border: 'rgba(205,127,50,0.4)', barColor: 'rgba(205,127,50,0.18)', barBorder: 'rgba(205,127,50,0.3)', barTextColor: 'rgba(205,127,50,0.8)', height: '2.2rem' },
]

const RANKINGS = [
  { rank: 4, name: 'DarkKnight', initials: 'DK', bg: 'linear-gradient(135deg,#26a17b, var(--accent))', sub: '68.2% win · 412 trades', return: '+12.8%', up: true },
  { rank: 5, name: 'SatoshiX', initials: 'SX', bg: 'linear-gradient(135deg,#ff6b6b, var(--sell))', sub: '59.4% win · 287 trades', return: '+11.2%', up: true },
  { rank: 6, name: 'QuantZen', initials: 'QZ', bg: 'linear-gradient(135deg,#00c4ff,#627eea)', sub: '64.1% win · 198 trades', return: '+9.6%', up: true },
  { rank: 7, name: 'NovaTrades', initials: 'NV', bg: 'linear-gradient(135deg, var(--accent-bright), var(--accent))', sub: '55.8% win · 156 trades', return: '-1.4%', up: false },
]

const YOU = { rank: 42, name: 'You', initials: 'JD', sub: '68.7% win · 84 trades', return: '+12.45%', up: true }

function Leaderboard() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <main className="leaderboard-shell">
      <section className="leaderboard-app" aria-label="Xentova leaderboard">
        <Sidebar />

        <div className="leaderboard-content">
          <header className="leaderboard-topbar">
            <Link className="icon-shell" to="/trades" aria-label="Back to trades">
              <ArrowLeftIcon />
            </Link>
            <h1>Leaderboard</h1>
            <span className="icon-shell" aria-label="Search traders"><SearchIcon /></span>
          </header>

          <div className="leaderboard-body">
            <div className="lb-tabs">
              {TABS.map((tab, index) => (
                <button
                  key={tab}
                  type="button"
                  className={index === activeTab ? 'active' : ''}
                  onClick={() => setActiveTab(index)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="lb-podium">
              {PODIUM.map((item) => (
                <div key={item.name} className={`lb-podium-item ${item.rank === 1 ? 'lb-first' : ''}`}>
                  <span className="lb-podium-av" style={{ background: item.bg, borderColor: item.border, color: item.rank === 1 ? 'var(--accent-dark)' : '#fff' }}>
                    {item.crown ? <span className="lb-crown" aria-hidden="true">&#128081;</span> : null}
                    {item.initials}
                  </span>
                  <span className="lb-podium-name">{item.name}</span>
                  <span className="lb-podium-ret">{item.return}</span>
                  <span
                    className="lb-podium-bar"
                    style={{ height: item.height, background: item.barColor, border: `1px solid ${item.barBorder}`, color: item.barTextColor }}
                  >
                    {item.rank}
                  </span>
                </div>
              ))}
            </div>

            <div className="lb-list">
              {RANKINGS.map((item) => (
                <div className="lb-row" key={item.name}>
                  <div className="lb-left">
                    <span className="lb-rank">{item.rank}</span>
                    <span className="lb-av" style={{ background: item.bg }}>{item.initials}</span>
                    <div>
                      <p className="lb-name">{item.name}</p>
                      <p className="lb-sub">{item.sub}</p>
                    </div>
                  </div>
                  <span className={`lb-ret ${item.up ? 'up' : 'down'}`}>{item.return}</span>
                </div>
              ))}
            </div>

            <div className="lb-you-row">
              <div className="lb-row">
                <div className="lb-left">
                  <span className="lb-rank">{YOU.rank}</span>
                  <span className="lb-av" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-bright))', color: 'var(--accent-dark)' }}>{YOU.initials}</span>
                  <div>
                    <p className="lb-name">{YOU.name}</p>
                    <p className="lb-sub">{YOU.sub}</p>
                  </div>
                </div>
                <span className={`lb-ret ${YOU.up ? 'up' : 'down'}`}>{YOU.return}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ButtomNavbar />
    </main>
  )
}

export default Leaderboard
