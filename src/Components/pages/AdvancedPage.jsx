import { Link } from 'react-router-dom'
import ButtomNavbar from '../Buttom-navbar.jsx'
import Sidebar from '../shared/Sidebar.jsx'
import BackButton from '../shared/BackButton.jsx'
import { ErrorState, LoadingState } from '../shared/AppState.jsx'
import './AdvancedPage.css'

const icons = {
  market: 'M',
  trader: 'T',
  payment: '$',
  receipt: '#',
  order: 'OB',
  rate: '*',
  kyc: 'OK',
  alert: '!',
  learn: 'L',
  news: 'N',
  api: '{}',
  referral: '%',
  support: '?',
  settings: 'S',
  subscription: 'P',
  wallet: 'W',
  copy: 'C',
  performance: 'P',
}

function AdvancedPage({ title, eyebrow, accent = 'More', hero, metrics = [], sections = [], cta, backTo = '/more', children, isLoading = false, errorMessage = '' }) {
  return (
    <main className="advanced-shell">
      <section className="advanced-app" aria-label={`Xentova ${title}`}>
        <Sidebar />

        <div className="advanced-content">
          <header className="advanced-header">
            <BackButton className="advanced-back" fallback={backTo}>&lt;</BackButton>
            <div>
              <p>{eyebrow}</p>
              <h1>{title}</h1>
            </div>
            <span className="advanced-badge">{accent}</span>
          </header>

          <div className="advanced-body">
            {isLoading ? (
              <LoadingState title={`Loading ${title}`} message="Preparing your latest account data..." />
            ) : errorMessage ? (
              <ErrorState title="Network error" message={errorMessage} />
            ) : (
              <>
            <section className="advanced-hero">
              <span className="advanced-hero-icon">{icons[hero.icon] || title.charAt(0)}</span>
              <div>
                <p>{hero.kicker}</p>
                <h2>{hero.title}</h2>
                <span>{hero.text}</span>
              </div>
            </section>

            {metrics.length ? (
              <section className="advanced-metrics" aria-label={`${title} metrics`}>
                {metrics.map((metric) => (
                  <article key={metric.label}>
                    <p>{metric.label}</p>
                    <strong>{metric.value}</strong>
                    <span className={metric.negative ? 'negative' : ''}>{metric.meta}</span>
                  </article>
                ))}
              </section>
            ) : null}

            <div className="advanced-grid">
              {sections.map((section) => (
                <section className="advanced-card" key={section.title}>
                  <div className="advanced-card-head">
                    <h2>{section.title}</h2>
                    {section.action ? <Link to={section.action.to}>{section.action.label}</Link> : null}
                  </div>
                  <div className="advanced-list">
                    {section.items.map((item) => (
                      <article className="advanced-row" key={item.title}>
                        <span className={`advanced-dot advanced-dot--${item.tone || 'gold'}`}>{item.token}</span>
                        <div>
                          <strong>{item.title}</strong>
                          <p>{item.text}</p>
                        </div>
                        <em className={item.negative ? 'negative' : ''}>{item.meta}</em>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {children}

            {cta ? (
              <Link className="advanced-cta" to={cta.to}>
                {cta.label}
              </Link>
            ) : null}
              </>
            )}
          </div>
        </div>
      </section>

      <ButtomNavbar />
    </main>
  )
}

export default AdvancedPage
