import { Link } from 'react-router-dom'

import './Splash1.css'

const PortfolioPreview = () => (
  <div className="splash1-preview">
    <p>Portfolio Value</p>
    <strong>$78,623</strong>
    <span>+12.45% this month</span>
    <svg viewBox="0 0 260 90" preserveAspectRatio="none">
      <path d="M0 72 C34 60 51 47 78 43 C105 38 112 25 146 28 C174 30 181 17 214 18 C237 19 242 12 260 13" />
      <circle cx="260" cy="13" r="4" />
    </svg>
  </div>
)

function Splash1() {
  return (
    <main className="splash1-shell">
      <section className="splash1-screen" aria-label="Portfolio tracking onboarding">
        <Link to="/signup">Skip</Link>

        <PortfolioPreview />

        <div className="splash1-copy">
          <p>01 / 03 - Smart Trading</p>
          <h1>Track Your <span>Portfolio</span> in Real-Time</h1>
          <p>Monitor all your crypto assets, performance charts and returns from one powerful dashboard.</p>
        </div>

        <div className="splash1-footer">
          <div className="splash1-dots" aria-label="Slide 2 of 4">
            <span className="active" />
            <span />
            <span />
          </div>
          <Link to="/splash2">Next &rsaquo;</Link>
        </div>
      </section>
    </main>
  )
}

export default Splash1
