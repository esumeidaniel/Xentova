import { useState } from 'react'
import BottomNavbar from '../BottomNavbar.jsx'
import Sidebar from '../shared/Sidebar.jsx'
import { EmptyState } from '../shared/AppState.jsx'
import './Notifications.css'

const NotifIcon = ({ type }) => {
  const paths = {
    buy: <path d="M12 19V5m0 0-6 6m6-6 6 6" />,
    sell: <path d="M12 5v14m0 0 6-6m-6 6-6-6" />,
    alert: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5" /><path d="M12 16h.01" /></>),
    bell: (<><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" /><path d="M10 20a2 2 0 0 0 4 0" /></>),
    file: (<><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5" /></>),
    deposit: (<><path d="M12 19V5" /><path d="m6 11 6-6 6 6" /><path d="M5 19h14" /></>),
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      {paths[type] || paths.bell}
    </svg>
  )
}

const initialNotifications = [
  {
    id: 1,
    group: 'Today',
    icon: 'buy', tone: 'buy',
    title: 'BTC/USDT Signal: Take Profit Hit',
    detail: 'Your copied trade from CryptoPro closed with a +24.3% gain.',
    time: '2m ago',
    unread: true,
  },
  {
    id: 2,
    group: 'Today',
    icon: 'file', tone: 'gold',
    title: 'Risk-CryptoPro opened a new trade',
    detail: 'BTC/USDT short position opened at $67,452.18.',
    time: '38m ago',
    unread: true,
  },
  {
    id: 3,
    group: 'Today',
    icon: 'alert', tone: 'purple',
    title: 'New login detected on your account',
    detail: 'A new sign-in from Lagos, Nigeria was detected on Chrome.',
    time: '1h ago',
    unread: true,
  },
  {
    id: 4,
    group: 'Yesterday',
    icon: 'sell', tone: 'sell',
    title: 'New Signal: SOL/USDT Sell',
    detail: 'A new sell signal for SOL/USDT was issued by AlphaTrend.',
    time: '1d ago',
    unread: false,
  },
  {
    id: 5,
    group: 'Yesterday',
    icon: 'deposit', tone: 'blue',
    title: 'Deposit of $2,000 confirmed',
    detail: 'Your deposit has been credited to your portfolio balance.',
    time: '1d ago',
    unread: false,
  },
  {
    id: 6,
    group: 'This Week',
    icon: 'file', tone: 'gold',
    title: 'Monthly Report Ready',
    detail: 'Your May 2024 performance report is ready to view.',
    time: '3d ago',
    unread: false,
  },
]

function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications)

  const unreadCount = notifications.filter((item) => item.unread).length
  const groups = [...new Set(notifications.map((item) => item.group))]

  const markAllRead = () => {
    setNotifications((current) => current.map((item) => ({ ...item, unread: false })))
  }

  const markRead = (id) => {
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, unread: false } : item))
    )
  }

  return (
    <main className="notif-shell">
      <section className="notif-app" aria-label="Xentova notifications">
        <Sidebar />

        <div className="notif-content">
          <header className="notif-header">
            <div>
              <p>Account center</p>
              <h1>Notifications {unreadCount > 0 ? `(${unreadCount} new)` : ''}</h1>
            </div>
            <button className="notif-mark-read" type="button" onClick={markAllRead} disabled={unreadCount === 0}>
              Mark all as read
            </button>
            <button className="notif-mark-read" type="button" onClick={() => setNotifications([])} disabled={notifications.length === 0}>
              Clear all
            </button>
          </header>

          <div className="notif-body">
            {notifications.length === 0 ? (
              <EmptyState title="No notifications yet" message="Signals, account alerts, and deposit confirmations will appear here." />
            ) : (
              groups.map((group) => (
                <section key={group}>
                  <p className="notif-group-label">{group}</p>
                  <div className="notif-list">
                    {notifications.filter((item) => item.group === group).map((item) => (
                      <article
                        key={item.id}
                        className={`notif-row ${item.unread ? 'unread' : ''}`}
                        onClick={() => markRead(item.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => { if (event.key === 'Enter') markRead(item.id) }}
                      >
                        <span className={`notif-icon notif-icon--${item.tone}`}>
                          <NotifIcon type={item.icon} />
                        </span>
                        <div className="notif-text">
                          <h2>{item.title}</h2>
                          <p>{item.detail}</p>
                        </div>
                        <span className="notif-time">{item.time}</span>
                      </article>
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>
        </div>

      </section>

      <BottomNavbar />
    </main>
  )
}

export default Notifications
