import { useState } from 'react'
import { Link } from 'react-router-dom'
import BottomNavbar from '../BottomNavbar.jsx'
import Sidebar from '../shared/Sidebar.jsx'
import { EmptyState } from '../shared/AppState.jsx'
import './FAQ.css'

const ChevronIcon = ({ open }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2.5"
    style={{ width: '0.9rem', height: '0.9rem', flexShrink: 0, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const faqs = [
  {
    q: 'Do you guarantee profits?',
    a: 'No. All trading involves risk. We do not guarantee profits and past performance is not indicative of future results. Only invest what you can afford to lose.',
  },
  {
    q: 'Do you control my funds?',
    a: 'No. Your funds remain in your own account at all times. We never have direct access to withdraw or move your money — you are always in full control.',
  },
  {
    q: 'Can I track my performance?',
    a: 'Yes. You can track performance in real-time in your dashboard with detailed charts, win rates, P&L breakdowns, and monthly reports.',
  },
  {
    q: 'Is this suitable for beginners?',
    a: 'Yes, but we recommend learning first and understanding the risks. Our copy trading feature is designed for beginners — follow expert traders and mirror their trades automatically.',
  },
  {
    q: 'How do I deposit funds?',
    a: 'Go to More → Deposit or tap Deposit on the Home dashboard. We support BTC, ETH, USDT, and SOL. Funds are credited after blockchain confirmation.',
  },
  {
    q: 'How do I withdraw funds?',
    a: 'Go to More → Withdraw, enter the amount and your destination wallet address, then confirm. Crypto withdrawals are processed within minutes. A small network fee applies.',
  },
  {
    q: 'How does copy trading work?',
    a: 'Select a verified expert trader from the Signals page and tap Follow Signal. Your account will automatically mirror their trades proportionally based on your allocated amount.',
  },
  {
    q: 'Is my account secure?',
    a: 'Yes. We use 2FA, biometric login, and end-to-end encryption. All API keys are stored securely and withdrawal access can be restricted independently.',
  },
  {
    q: 'What are the trading fees?',
    a: 'Spot trades carry a 0.1% maker/taker fee. Copy trading has no additional fee beyond the base trade fee. Premium subscribers receive a 50% fee reduction.',
  },
  {
    q: 'How do I enable Two-Factor Authentication?',
    a: 'Go to More → Security → Two-Factor Auth. Download Google Authenticator, scan the QR code shown, and enter the 6-digit code to activate.',
  },
]

function FAQItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <article className={`faq-item ${open ? 'faq-item--open' : ''}`}>
      <button type="button" onClick={() => setOpen((previous) => !previous)} aria-expanded={open}>
        <span>{item.q}</span>
        <span
          style={{
            display: 'grid',
            placeItems: 'center',
            width: '1.4rem',
            height: '1.4rem',
            borderRadius: '0.4rem',
            background: open ? 'var(--accent-dim)' : 'var(--panel)',
            flexShrink: 0,
          }}
        >
          <ChevronIcon open={open} />
        </span>
      </button>
      {open && <p>{item.a}</p>}
    </article>
  )
}

function FAQ() {
  const [search, setSearch] = useState('')

  const filtered = faqs.filter(
    (item) =>
      search.trim() === '' ||
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="faq-shell">
      <section className="faq-app" aria-label="Xentova FAQ">
        <Sidebar />

        <div className="faq-content">
          <header className="faq-header">
            <div>
              <p>Help center</p>
              <h1>FAQ</h1>
            </div>
          </header>

          <div className="faq-grid">
            <section className="faq-list" aria-label="Frequently asked questions">
              <label className="faq-search" aria-label="Search FAQs">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="search"
                  placeholder="Search FAQs…"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>

              {filtered.length === 0 ? (
                <EmptyState title="No FAQ results" message={`No answers matched "${search}". Try a different search or contact support.`} />
              ) : (
                filtered.map((item) => <FAQItem item={item} key={item.q} />)
              )}
            </section>

            <aside className="faq-contact">
              <article>
                <p>Still need help?</p>
                <strong>Contact Support</strong>
                <span>We typically respond in under 2 hours</span>
              </article>
              <Link className="faq-ticket-link" to="/support">Open a Ticket</Link>
              <div className="faq-quick-links">
                <p>Quick actions</p>
                <Link to="/deposit">Deposit Funds →</Link>
                <Link to="/withdraw">Withdraw Funds →</Link>
                <Link to="/history">View History →</Link>
                <Link to="/security">Security Settings →</Link>
              </div>
            </aside>
          </div>
        </div>

      </section>

      <BottomNavbar />
    </main>
  )
}

export default FAQ
