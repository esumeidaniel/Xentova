import { useState } from 'react'
import { Link } from 'react-router-dom'
import BottomNavbar from '../BottomNavbar.jsx'
import Sidebar from '../shared/Sidebar.jsx'
import './Security.css'

const ItemIcon = ({ type }) => {
  const paths = {
    shield: <path d="M12 21s7-3.5 7-10V5l-7-3-7 3v6c0 6.5 7 10 7 10Z" />,
    lock: (<><path d="M7.5 10.25h9a1 1 0 0 1 1 1v6.25a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-6.25a1 1 0 0 1 1-1Z" /><path d="M9 10.25V8a3 3 0 0 1 6 0v2.25" /></>),
    mail: (<><path d="M4.75 6.75h14.5v10.5H4.75z" /><path d="m5.25 7.25 6.25 5.25a1.15 1.15 0 0 0 1.5 0l6.25-5.25" /></>),
    link: (<><path d="M10 13a5 5 0 0 0 7.07 0l1.41-1.41a5 5 0 0 0-7.07-7.07L10.5 5" /><path d="M14 11a5 5 0 0 0-7.07 0l-1.41 1.41a5 5 0 0 0 7.07 7.07l.91-.91" /></>),
    alert: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5" /><path d="M12 16h.01" /></>),
    monitor: (<><path d="M4 5h16v11H4z" /><path d="M9 20h6" /><path d="M12 16v4" /></>),
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      {paths[type]}
    </svg>
  )
}

const securityItems = [
  { title: 'Two-Factor Authentication', detail: 'Google Authenticator active', icon: 'shield', tone: 'green', enabled: true, badge: 'Enabled' },
  { title: 'Biometric Login', detail: 'Face ID / Fingerprint', icon: 'lock', tone: 'blue', enabled: true },
  { title: 'Email Notifications', detail: 'Login & transaction alerts', icon: 'mail', tone: 'gold', enabled: true },
  { title: 'API Withdrawal Access', detail: 'Restricted for security', icon: 'link', tone: 'red', enabled: false },
  { title: 'Anti-Phishing Code', detail: 'Not configured', icon: 'alert', tone: 'purple', action: 'Set Up' },
  { title: 'Active Sessions', detail: '2 devices logged in', icon: 'monitor', tone: 'gray', action: 'View' },
]

const Toggle = ({ enabled, onToggle }) => (
  <button
    type="button"
    className={`security-toggle ${enabled ? 'enabled' : ''}`}
    role="switch"
    aria-checked={enabled}
    onClick={onToggle}
  >
    <i />
  </button>
)

function SecurityRow({ item, onToggle }) {
  const actionRoute = item.title === 'Active Sessions' ? '/settings' : '/security'

  return (
    <article className="security-row">
      <span className={`security-icon security-icon--${item.tone}`}>
        <ItemIcon type={item.icon} />
      </span>
      <div>
        <h2>{item.title}</h2>
        <p>{item.detail}</p>
      </div>
      {item.badge ? <em>{item.badge}</em> : null}
      {typeof item.enabled === 'boolean' ? <Toggle enabled={item.enabled} onToggle={onToggle} /> : null}
      {item.action ? <Link to={actionRoute}>{item.action}</Link> : null}
    </article>
  )
}

function Security() {
  const [items, setItems] = useState(securityItems)
  const [sessionsRevoked, setSessionsRevoked] = useState(false)

  const toggleItem = (title) => {
    setItems((current) =>
      current.map((item) =>
        item.title === title ? { ...item, enabled: !item.enabled } : item
      )
    )
  }

  return (
    <main className="security-shell">
      <section className="security-app" aria-label="Xentova security settings">
        <Sidebar />

        <div className="security-content">
          <header className="security-header">
            <div>
              <p>Account protection</p>
              <h1>Security</h1>
            </div>
            <Link className="security-menu" to="/settings" aria-label="More actions">···</Link>
          </header>

          <div className="security-grid">
            <section className="security-score">
              <span className="security-score-icon">
                <ItemIcon type="shield" />
              </span>
              <div>
                <h2>Security Score</h2>
                <p>Your account is well protected</p>
                <div className="score-progress">
                  <span />
                  <strong>82 / 100</strong>
                </div>
              </div>
            </section>

            <section className="security-list" aria-label="Security settings">
              {items.map((item) => (
                <SecurityRow item={item} key={item.title} onToggle={() => toggleItem(item.title)} />
              ))}
            </section>

            <aside className="security-summary">
              <article>
                <p>Authentication</p>
                <strong>Enabled</strong>
                <span>2FA and biometrics active</span>
              </article>
              <article>
                <p>Open Sessions</p>
                <strong>{sessionsRevoked ? '1' : '2'}</strong>
                <span>{sessionsRevoked ? 'Other sessions revoked' : 'Last login today'}</span>
              </article>
              <button className="revoke-button" type="button" onClick={() => setSessionsRevoked(true)}>
                {sessionsRevoked ? 'Sessions Revoked' : 'Revoke All Sessions'}
              </button>
            </aside>
          </div>
        </div>

      </section>

      <BottomNavbar />
    </main>
  )
}

export default Security
