import { Link, NavLink } from 'react-router-dom'
import { BrandMark, SideNavIcon } from './NavIcon.jsx'
import './Sidebar.css'

const navItems = [
  { label: 'Home', to: '/home', icon: 'home', activePaths: ['/home', '/notifications', '/deposit', '/withdraw', '/history', '/receipt', '/buy-crypto', '/wallet', '/funding'] },
  { label: 'Markets', to: '/markets', icon: 'markets', activePaths: ['/markets', '/price-alerts'] },
  { label: 'Trade', to: '/trades', icon: 'trades', activePaths: ['/trades', '/order-book'] },
  { label: 'Portfolio', to: '/portfolio', icon: 'portfolio', activePaths: ['/portfolio', '/performance'] },
  { label: 'Signals', to: '/signals', icon: 'signals' },
  { label: 'Copy Trading', to: '/copy-trading', icon: 'copy', activePaths: ['/copy-trading', '/trader-profile', '/leaderboard'] },
  { label: 'More', to: '/more', icon: 'more', activePaths: ['/more', '/profile', '/security', '/faq', '/api-management', '/payment-methods', '/settings', '/kyc', '/learn', '/support', '/subscription', '/connect-wallet', '/referral', '/rate-us', '/trading-bot', '/risk-disclosure', '/terms', '/privacy', '/about', '/news'] },
]

function Sidebar() {
  return (
    <aside className="app-sidebar" aria-label="Primary navigation">
      <Link className="sidebar-brand" to="/home" aria-label="Xentova home">
        <BrandMark />
        <span>XENTOVA</span>
      </Link>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) => {
              const groupActive = item.activePaths?.includes(window.location.pathname)
              return isActive || groupActive ? 'active' : undefined
            }}
          >
            <SideNavIcon type={item.icon} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-card">
        <p>Account status</p>
        <strong>Verified</strong>
        <span>Secure trading enabled</span>
      </div>
    </aside>
  )
}

export default Sidebar
