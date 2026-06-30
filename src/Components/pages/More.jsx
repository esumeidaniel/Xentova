import { Link, useNavigate } from 'react-router-dom'
import BottomNavbar from '../BottomNavbar.jsx'
import Sidebar from '../shared/Sidebar.jsx'
import { useAuth } from '../shared/AuthContext.jsx'
import './More.css'

const ItemIcon = ({ type }) => {
  const paths = {
    profile: (<><circle cx="12" cy="8" r="3" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></>),
    security: <path d="M12 21s7-3.5 7-10V5l-7-3-7 3v6c0 6.5 7 10 7 10Z" />,
    api: (<><path d="M10 13a5 5 0 0 0 7.07 0l1.41-1.41a5 5 0 0 0-7.07-7.07L10.5 5" /><path d="M14 11a5 5 0 0 0-7.07 0l-1.41 1.41a5 5 0 0 0 7.07 7.07l.91-.91" /></>),
    payment: (<><path d="M4 7h16v11H4z" /><path d="M4 10h16" /></>),
    notification: (<><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" /><path d="M10 20a2 2 0 0 0 4 0" /></>),
    settings: (<><circle cx="12" cy="12" r="3" /><path d="M12 2v2M12 20v2m-7.07-14.07 1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2m-2.93 7.07-1.41-1.41M6.34 6.34 4.93 4.93" /></>),
    logout: (<><path d="M10 17 15 12 10 7" /><path d="M15 12H3" /><path d="M13 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5" /></>),
    leaderboard: (<><path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 4h10v5a5 5 0 0 1-10 0z" /><path d="M7 6H4a3 3 0 0 0 3 4" /><path d="M17 6h3a3 3 0 0 1-3 4" /></>),
    markets: (<><path d="M4 18V8" /><path d="M10 18V5" /><path d="M16 18v-7" /><path d="M22 18H2" /></>),
    trade: <path d="M4 13h4l2-6 4 12 2-6h4" />,
    signals: (<><path d="M2 12h3" /><path d="M5 7a7 7 0 0 1 0 10" /><path d="M19 12h3" /><path d="M19 7a7 7 0 0 0 0 10" /><circle cx="12" cy="12" r="2" /></>),
    copy: (<><path d="M8 8h10v10H8z" /><path d="M6 16H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>),
    alert: (<><path d="M12 9v4" /><path d="M12 17h.01" /><path d="M10.3 3.8 2.7 18a2 2 0 0 0 1.8 3h15a2 2 0 0 0 1.8-3L13.7 3.8a2 2 0 0 0-3.4 0Z" /></>),
    deposit: (<><path d="M12 19V5" /><path d="m6 11 6-6 6 6" /><path d="M5 19h14" /></>),
    withdraw: (<><path d="M12 5v14" /><path d="m18 13-6 6-6-6" /><path d="M5 5h14" /></>),
    history: (<><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 15" /></>),
    faq: (<><circle cx="12" cy="12" r="9" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></>),
    kyc: (<><path d="M12 3 4 7v5c0 5 3.5 8 8 9 4.5-1 8-4 8-9V7z" /><path d="m9 12 2 2 4-5" /></>),
    learn: (<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" /></>),
    support: (<><path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" /><path d="M9 10h6M9 14h4" /></>),
    subscription: (<><path d="M4 5h16v14H4z" /><path d="M8 9h8M8 13h5" /></>),
    wallet: (<><path d="M3 7h18v12H3z" /><path d="M16 12h5" /><path d="M6 7V5h12v2" /></>),
    referral: (<><circle cx="8" cy="8" r="3" /><circle cx="17" cy="17" r="3" /><path d="M11 10.5 14 14.5" /><path d="M14 7h4v4" /></>),
    rate: (<><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.1L12 17.2 6.4 20.1 7.5 14 3 9.6l6.2-.9z" /></>),
    bot: (<><path d="M8 7h8a3 3 0 0 1 3 3v6H5v-6a3 3 0 0 1 3-3Z" /><path d="M9 17v2M15 17v2" /><circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" /><path d="M12 7V4" /></>),
    legal: (<><path d="M12 3v18" /><path d="M5 7h14" /><path d="m6 7-3 6h6z" /><path d="m18 7-3 6h6z" /></>),
    about: (<><circle cx="12" cy="12" r="9" /><path d="M12 16v-4" /><path d="M12 8h.01" /></>),
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      {paths[type]}
    </svg>
  )
}

const moreGroups = [
  {
    title: 'Account',
    items: [
      { label: 'Profile', type: 'profile', tone: 'green', route: '/profile' },
      { label: 'Security', type: 'security', tone: 'blue', badge: '2FA Enabled', route: '/security' },
      { label: 'KYC Verification', type: 'kyc', tone: 'green', route: '/kyc' },
      { label: 'Notifications', type: 'notification', tone: 'gray', route: '/notifications' },
    ],
  },
  {
    title: 'Finance',
    items: [
      { label: 'Wallet Overview', type: 'wallet', tone: 'green', route: '/wallet' },
      { label: 'Buy Crypto', type: 'deposit', tone: 'gold', route: '/buy-crypto' },
      { label: 'Deposit', type: 'deposit', tone: 'green', route: '/deposit' },
      { label: 'Withdraw', type: 'withdraw', tone: 'sell', route: '/withdraw' },
      { label: 'History', type: 'history', tone: 'gold', route: '/history' },
      { label: 'Payment Methods', type: 'payment', tone: 'gold', route: '/payment-methods' },
      { label: 'Portfolio', type: 'wallet', tone: 'green', route: '/portfolio' },
    ],
  },
  {
    title: 'Trading',
    items: [
      { label: 'Markets', type: 'markets', tone: 'gold', route: '/markets' },
      { label: 'Trades', type: 'trade', tone: 'blue', route: '/trades' },
      { label: 'Signals', type: 'signals', tone: 'green', route: '/signals' },
      { label: 'Copy Trading', type: 'copy', tone: 'purple', route: '/copy-trading' },
      { label: 'Price Alerts', type: 'alert', tone: 'gold', route: '/price-alerts' },
      { label: 'Leaderboard', type: 'leaderboard', tone: 'gold', route: '/leaderboard' },
      { label: 'Trading Bot', type: 'bot', tone: 'blue', route: '/trading-bot' },
    ],
  },
  {
    title: 'Growth',
    items: [
      { label: 'Referral & Rewards', type: 'referral', tone: 'gold', route: '/referral' },
      { label: 'Subscription', type: 'subscription', tone: 'gold', route: '/subscription' },
      { label: 'Learn', type: 'learn', tone: 'blue', route: '/learn' },
      { label: 'News', type: 'learn', tone: 'blue', route: '/news' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { label: 'API Management', type: 'api', tone: 'purple', route: '/api-management' },
      { label: 'Connect Wallet', type: 'wallet', tone: 'green', route: '/connect-wallet' },
      { label: 'Settings', type: 'settings', tone: 'gray', route: '/settings' },
    ],
  },
  {
    title: 'Help',
    items: [
      { label: 'FAQ', type: 'faq', tone: 'gray', route: '/faq' },
      { label: 'Support', type: 'support', tone: 'blue', route: '/support' },
      { label: 'Rate Us', type: 'rate', tone: 'gold', route: '/rate-us' },
      { label: 'About Xentova', type: 'about', tone: 'gold', route: '/about' },
      { label: 'Risk Disclosure', type: 'legal', tone: 'sell', route: '/risk-disclosure' },
      { label: 'Terms', type: 'legal', tone: 'gray', route: '/terms' },
      { label: 'Privacy', type: 'security', tone: 'blue', route: '/privacy' },
    ],
  },
]

function MoreRow({ item }) {
  const content = (
    <>
      <span className={`more-item-icon more-item-icon--${item.tone}`}>
        <ItemIcon type={item.type} />
      </span>
      <strong>{item.label}</strong>
      {item.badge ? <em>{item.badge}</em> : null}
      <span className="row-arrow">›</span>
    </>
  )

  if (item.route) {
    return <Link className="more-row" to={item.route}>{content}</Link>
  }
  return <Link className="more-row" to="/more">{content}</Link>
}

function More() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/signin', { replace: true })
  }

  return (
    <main className="more-shell">
      <section className="more-app" aria-label="Xentova more settings">
        <Sidebar />

        <div className="more-content">
          <header className="more-header">
            <div>
              <p>Account center</p>
              <h1>More</h1>
            </div>
            <div className="more-profile">
              <span>JD</span>
              <div>
                <strong>John Doe</strong>
                <p>Verified investor</p>
              </div>
            </div>
          </header>

          <div className="more-grid">
            {moreGroups.map((group) => (
              <section className="more-card" key={group.title}>
                <h2>{group.title}</h2>
                <div className="more-list">
                  {group.items.map((item) => <MoreRow item={item} key={item.label} />)}
                </div>
              </section>
            ))}

            <aside className="more-summary">
              <article>
                <p>Security Level</p>
                <strong>Protected</strong>
                <span>2FA and withdrawal lock enabled</span>
              </article>
              <article>
                <p>API Access</p>
                <strong>3 Keys</strong>
                <span>Last used 2 hours ago</span>
              </article>
              <button className="logout-button" type="button" onClick={handleLogout}>
                <span><ItemIcon type="logout" /></span>
                Log Out
              </button>
            </aside>
          </div>
        </div>

      </section>

      <BottomNavbar />
    </main>
  )
}

export default More
