import { NavLink, useLocation } from 'react-router-dom'
import { SideNavIcon } from './shared/NavIcon.jsx'
import './Buttom-navbar.css'

const navItems = [
  { label: 'Home', to: '/home', icon: 'home', activePaths: ['/home', '/notifications', '/deposit', '/withdraw', '/history', '/receipt', '/price-alerts', '/news'] },
  { label: 'Portfolio', to: '/portfolio', icon: 'portfolio', activePaths: ['/portfolio', '/performance'] },
  { label: 'Trades', to: '/trades', icon: 'trades', activePaths: ['/trades', '/leaderboard', '/markets', '/order-book', '/copy-trading', '/trader-profile'] },
  { label: 'Signals', to: '/signals', icon: 'signals' },
  { label: 'More', to: '/more', icon: 'more', activePaths: ['/more', '/profile', '/security', '/faq', '/api-management', '/payment-methods', '/settings', '/kyc', '/learn', '/support', '/subscription', '/connect-wallet', '/referral', '/rate-us'] },
]

function ButtomNavbar() {
  const { pathname } = useLocation()

  return (
    <nav className="buttom-navbar" aria-label="Mobile primary navigation">
      {navItems.map((item) => (
        <NavLink
          className={({ isActive }) =>
            isActive || item.activePaths?.includes(pathname) ? 'active' : undefined
          }
          key={item.label}
          to={item.to}
        >
          <SideNavIcon type={item.icon} />
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default ButtomNavbar
