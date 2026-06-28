import { Link } from 'react-router-dom'
import ButtomNavbar from '../Buttom-navbar.jsx'
import Sidebar from '../shared/Sidebar.jsx'
import { LoadingState } from '../shared/AppState.jsx'
import { useMockLoading } from '../shared/useMockLoading.js'
import './Profile.css'

const ItemIcon = ({ type }) => {
  const paths = {
    user: (<><circle cx="12" cy="8" r="3" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></>),
    lock: (<><path d="M7.5 10.25h9a1 1 0 0 1 1 1v6.25a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-6.25a1 1 0 0 1 1-1Z" /><path d="M9 10.25V8a3 3 0 0 1 6 0v2.25" /></>),
    shield: <path d="M12 21s7-3.5 7-10V5l-7-3-7 3v6c0 6.5 7 10 7 10Z" />,
    link: (<><path d="M10 13a5 5 0 0 0 7.07 0l1.41-1.41a5 5 0 0 0-7.07-7.07L10.5 5" /><path d="M14 11a5 5 0 0 0-7.07 0l-1.41 1.41a5 5 0 0 0 7.07 7.07l.91-.91" /></>),
    bell: (<><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" /><path d="M10 20a2 2 0 0 0 4 0" /></>),
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      {paths[type]}
    </svg>
  )
}

const profileItems = [
  { title: 'Personal Information', detail: 'Name, email, phone, country', icon: 'user', tone: 'gray', route: '/settings' },
  { title: 'Change Password', detail: 'Update your login password', icon: 'lock', tone: 'gray', route: '/forgot-password' },
  { title: 'Two-Factor Auth', detail: 'Google Authenticator active', icon: 'shield', tone: 'green', badge: 'Enabled', route: '/security' },
  { title: 'API Connections', detail: 'Manage exchange and app links', icon: 'link', tone: 'blue', badge: '3 Active', route: '/api-management' },
  { title: 'Notification Preferences', detail: 'Alerts, email, push settings', icon: 'bell', tone: 'gray', route: '/notifications' },
]

function ProfileRow({ item }) {
  const inner = (
    <>
      <span className={`profile-item-icon profile-item-icon--${item.tone}`}>
        <ItemIcon type={item.icon} />
      </span>
      <div>
        <strong>{item.title}</strong>
        <p>{item.detail}</p>
      </div>
      {item.badge ? <em>{item.badge}</em> : null}
      <span className="profile-arrow">›</span>
    </>
  )
  if (item.route) {
    return <Link className="profile-row" to={item.route}>{inner}</Link>
  }
  return <button className="profile-row" type="button">{inner}</button>
}

function Profile() {
  const isLoading = useMockLoading()

  return (
    <main className="profile-shell">
      <section className="profile-app" aria-label="Xentova profile settings">
        <Sidebar />

        <div className="profile-content">
          <header className="profile-header">
            <div>
              <p>Account center</p>
              <h1>Profile</h1>
            </div>
            <Link className="profile-menu" to="/settings" aria-label="More actions">···</Link>
          </header>

          {isLoading ? (
            <div className="profile-grid">
              <LoadingState title="Loading profile" message="Getting your account settings and verification status..." />
            </div>
          ) : (
          <div className="profile-grid">
            <section className="profile-card">
              <span className="profile-avatar">JD</span>
              <div>
                <h2>John Doe</h2>
                <p>johndoe@gmail.com</p>
                <span className="verified-badge">✓ Verified</span>
              </div>
            </section>

            <section className="profile-list" aria-label="Profile settings">
              {profileItems.map((item) => (
                <ProfileRow item={item} key={item.title} />
              ))}
            </section>

            <aside className="profile-summary">
              <article>
                <p>Member Since</p>
                <strong>2024</strong>
                <span>Premium investor profile</span>
              </article>
              <article>
                <p>Verification</p>
                <strong>Complete</strong>
                <span>KYC and email confirmed</span>
              </article>
              <article>
                <p>API Connections</p>
                <strong>3 Active</strong>
                <span>All connections healthy</span>
              </article>
            </aside>
          </div>
          )}
        </div>

      </section>

      <ButtomNavbar />
    </main>
  )
}

export default Profile
