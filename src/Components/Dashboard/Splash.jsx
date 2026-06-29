import { Link } from 'react-router-dom'

import './Splash.css'

const BrandMark = () => (
  <div className="splash-brand-mark" aria-hidden="true">
    <svg viewBox="0 0 48 48">
      <path d="M12 13.5 36 37.5" />
      <path d="M36 13.5 12 37.5" />
      <path d="M16 8.5a18 18 0 0 1 16 0" />
      <path d="M16 42.5a18 18 0 0 0 16 0" />
      <path d="M24 5.5v7" />
      <path d="M24 35.5v7" />
    </svg>
  </div>
)

function Splash() {
  return (
    <main className="splash-shell">
      <section className="splash-screen splash-screen--intro" aria-label="Xentova welcome">
        <div className="splash-intro-content">
          <div className="splash-logo-card">
            <BrandMark />
          </div>
          <h1>XENTOVA</h1>
          <p>Smart strategies.<br />Stronger portfolio.</p>
        </div>

        <div className="splash-actions">
          <Link className="splash-primary" to="/splash1">Get Started</Link>
          <Link className="splash-secondary" to="/signin">Sign In</Link>
          <div className="splash-dots" aria-label="Slide 1 of 4">
            <span className="active" />
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Splash
