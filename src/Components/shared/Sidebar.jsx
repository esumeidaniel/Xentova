import { Link, NavLink } from 'react-router-dom'
import { BrandMark, SideNavIcon } from './NavIcon.jsx'
import './Sidebar.css'

const navItems = [
  { label: 'Home', to: '/home', icon: 'home', activePaths: ['/home', '/notifications', '/deposit', '/withdraw', '/history', '/receipt', '/price-alerts', '/news'] },
  { label: 'Portfolio', to: '/portfolio', icon: 'portfolio', activePaths: ['/portfolio', '/performance'] },
  { label: 'Trades', to: '/trades', icon: 'trades', activePaths: ['/trades', '/leaderboard', '/markets', '/order-book', '/copy-trading', '/trader-profile'] },
  { label: 'Signals', to: '/signals', icon: 'signals' },
  { label: 'More', to: '/more', icon: 'more', activePaths: ['/more', '/profile', '/security', '/faq', '/api-management', '/payment-methods', '/settings', '/kyc', '/learn', '/support', '/subscription', '/connect-wallet', '/referral', '/rate-us'] },
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
