import { Link } from 'react-router-dom'

const logoUrl = `${import.meta.env.BASE_URL}xentova-logo.png`

export const MailIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M4.75 6.75h14.5v10.5H4.75z" />
    <path d="m5.25 7.25 6.25 5.25a1.15 1.15 0 0 0 1.5 0l6.25-5.25" />
  </svg>
)

export const LockIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M7.5 10.25h9a1 1 0 0 1 1 1v6.25a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-6.25a1 1 0 0 1 1-1Z" />
    <path d="M9 10.25V8a3 3 0 0 1 6 0v2.25" />
  </svg>
)

export const UserIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <circle cx="12" cy="8.25" r="3" />
    <path d="M5.25 19.25a6.75 6.75 0 0 1 13.5 0" />
  </svg>
)

export const EyeIcon = ({ hidden = false }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M3.75 12s2.75-5 8.25-5 8.25 5 8.25 5-2.75 5-8.25 5-8.25-5-8.25-5Z" />
    <circle cx="12" cy="12" r="2.25" />
    {hidden ? <path d="M4.5 4.5 19.5 19.5" /> : null}
  </svg>
)

const AppleIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M16.8 12.4c0-2 1.6-3 1.7-3.1-1-.1-2.1.5-2.6.5-.6 0-1.4-.5-2.3-.5-1.8 0-3.5 1.5-3.5 4 0 1.2.4 2.5 1 3.5.5.9 1.2 1.9 2 1.9.8 0 1.1-.5 2.1-.5s1.3.5 2.1.5c.9 0 1.5-.9 2-1.8.6-.9.8-1.8.8-1.9-.1 0-2-.7-2.1-2.5Z" />
    <path d="M15.4 7.6c.4-.5.7-1.2.6-1.9-.6 0-1.3.4-1.8.9-.4.5-.7 1.2-.6 1.8.7.1 1.4-.3 1.8-.8Z" />
  </svg>
)

const CheckIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="m6.75 12.5 3 3 6.75-7" />
  </svg>
)

export const BrandMark = ({ compact = false }) => (
  <div className={compact ? 'auth-brand-mark auth-brand-mark--compact' : 'auth-brand-mark'} aria-hidden="true">
    <img src={logoUrl} alt="" />
  </div>
)

export const TrustBadges = ({ compact = false }) => {
  const badges = ['Secure', 'Transparent', 'Risk-aware', 'Demo UI', 'Backend-ready']

  return (
    <div className={compact ? 'auth-trust-badges auth-trust-badges--compact' : 'auth-trust-badges'} aria-label="Platform trust badges">
      {badges.map((badge) => (
        <span key={badge}>{badge}</span>
      ))}
    </div>
  )
}

export const MiniDashboardPreview = () => (
  <div className="mini-dashboard-preview" aria-label="Demo market dashboard preview">
    <div className="mini-dashboard-card mini-dashboard-card--balance">
      <span>Portfolio Balance</span>
      <strong>$48,920.45</strong>
      <em>+12.4% this month</em>
    </div>

    <div className="mini-dashboard-grid">
      <div className="mini-dashboard-card mini-dashboard-card--price">
        <span>BTC/USDT</span>
        <strong>$67,842</strong>
        <em>+2.18%</em>
      </div>
      <div className="mini-dashboard-card mini-dashboard-card--signal">
        <span>Signal</span>
        <strong>Risk-aware long</strong>
        <em>Confidence 82%</em>
      </div>
    </div>

    <div className="mini-dashboard-row">
      <span>KYC-ready</span>
      <span>Market +1.9%</span>
    </div>
  </div>
)

export const AuthBrandPanel = () => (
  <aside className="auth-hero" aria-label="Xentova brand and market preview">
    <div className="auth-hero-inner">
      <div className="auth-brand-lockup">
        <BrandMark />
        <div>
          <p className="auth-logo-text">XENTOVA</p>
          <p className="auth-tagline">Crypto&nbsp;&nbsp;&bull;&nbsp;&nbsp;Invest&nbsp;&nbsp;&bull;&nbsp;&nbsp;Grow</p>
        </div>
      </div>

      <MiniDashboardPreview />
      <TrustBadges />

      <div className="auth-market-ticker" aria-hidden="true">
        <span>BTC +2.18%</span>
        <span>ETH +1.42%</span>
        <span>SOL +4.03%</span>
        <span>Signals live</span>
      </div>
    </div>
  </aside>
)

export const MobileBrandHeader = () => (
  <div className="auth-mobile-brand">
    <BrandMark compact />
    <div>
      <p className="auth-logo-text">XENTOVA</p>
      <p className="auth-mobile-tagline">Portfolio, markets, signals</p>
    </div>
  </div>
)

export const AuthInput = ({
  id,
  label,
  icon,
  error,
  success,
  children,
}) => (
  <label className="auth-field" htmlFor={id}>
    <span>{label}</span>
    <span className={error ? 'auth-input auth-input--error' : 'auth-input'}>
      {icon}
      {children}
    </span>
    {error ? <em className="form-error" id={`${id}-error`}>{error}</em> : null}
    {!error && success ? <em className="form-success">{success}</em> : null}
  </label>
)

export const DemoNotice = ({ children }) => (
  <p className="auth-demo-notice">{children}</p>
)

export const SecurityNote = ({ children }) => (
  <div className="auth-security-note" role="note">
    <span aria-hidden="true">✓</span>
    <p>{children}</p>
  </div>
)

export const SocialAuthButtons = ({ onClick }) => (
  <>
    <div className="auth-divider">
      <span />
      <p>Or continue with</p>
      <span />
    </div>

    <div className="social-row">
      <button type="button" onClick={onClick}>
        <span className="google-mark">G</span>
        <span>Google</span>
      </button>
      <button type="button" onClick={onClick}>
        <span className="apple-mark">
          <AppleIcon />
        </span>
        <span>Apple</span>
      </button>
    </div>
  </>
)

export const PasswordStrength = ({ password }) => {
  const requirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One number', met: /\d/.test(password) },
    { label: 'One special character', met: /[^A-Za-z0-9]/.test(password) },
  ]
  const metCount = requirements.filter((item) => item.met).length
  const labels = ['Empty', 'Weak', 'Fair', 'Good', 'Strong']
  const strengthLabel = labels[metCount]

  return (
    <div className="password-strength" aria-live="polite">
      <div className="password-strength-row">
        <span>Password strength</span>
        <span>{strengthLabel}</span>
      </div>
      <div className="password-strength-bar" aria-hidden="true">
        <i style={{ width: `${Math.max(metCount, password ? 1 : 0) * 25}%` }} />
      </div>
      <ul className="password-checklist">
        {requirements.map((item) => (
          <li key={item.label} className={item.met ? 'met' : ''}>
            <CheckIcon />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const TermsAgreement = ({ checked, error, onChange }) => (
  <>
    <label className="terms-row">
      <input
        className="terms-native-check"
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        aria-invalid={Boolean(error)}
      />
      <span className="terms-check">
        <CheckIcon />
      </span>
      <span>
        I agree to the <Link to="/terms">Terms &amp; Conditions</Link> and{' '}
        <Link to="/privacy">Privacy Policy</Link>
      </span>
    </label>
    {error ? <em className="form-error">{error}</em> : null}
  </>
)
