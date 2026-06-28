import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './Signin.css'
import './Auth.css'

const MailIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M4.75 6.75h14.5v10.5H4.75z" />
    <path d="m5.25 7.25 6.25 5.25a1.15 1.15 0 0 0 1.5 0l6.25-5.25" />
  </svg>
)

const ArrowLeftIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
)

const LockBadgeIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const CheckIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const BrandMark = () => (
  <div className="auth-brand-mark" aria-hidden="true">
    <svg viewBox="0 0 48 48">
      <path d="M12 13.5 36 37.5" />
      <path d="M36 13.5 12 37.5" />
      <path d="M16 8.5a18 18 0 0 1 16 0" />
      <path d="M16 42.5a18 18 0 0 0 16 0" />
      <path d="M24 5.5v7" />
      <path d="M24 35.5v7" />
    </svg>
  </div>
)

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  return (
    <section className="auth-app" aria-label="Xentova forgot password">
      <aside className="auth-hero" aria-label="Xentova brand">
        <BrandMark />
        <p className="auth-logo-text">XENTOVA</p>
        <p className="auth-tagline">Crypto&nbsp;&nbsp;&bull;&nbsp;&nbsp;Invest&nbsp;&nbsp;&bull;&nbsp;&nbsp;Grow</p>
        <div className="auth-hero-metrics" aria-hidden="true">
          <span>Secure</span>
          <span>Transparent</span>
          <span>Trusted</span>
        </div>
      </aside>

      <div className="signin-panel auth-panel">
        <div className="auth-mobile-brand">
          <BrandMark />
          <p className="auth-logo-text">XENTOVA</p>
        </div>

        <Link className="auth-back" to="/signin">
          <ArrowLeftIcon />
          Back to Sign In
        </Link>

        <span className="auth-icon-circle auth-icon-circle--square" aria-hidden="true">
          <MailIcon />
        </span>

        <header className="auth-header">
          <h1>Forgot Password?</h1>
          <p>No worries! Enter the email address linked to your account and we'll send you a reset link.</p>
        </header>

        <form
          className="auth-form"
          onSubmit={(event) => {
            event.preventDefault()
            navigate('/verify-otp', { state: { email } })
          }}
        >
          <label className="auth-field">
            <span>Email Address</span>
            <span className="auth-input auth-input--active">
              <MailIcon />
              <input
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </span>
          </label>

          <button className="auth-submit" type="submit">
            Send Reset Link
          </button>
        </form>

        <p className="auth-switch">
          Remember your password? <Link to="/signin">Sign In</Link>
        </p>
        <p className="auth-footnote">Secure&nbsp;&nbsp;&bull;&nbsp;&nbsp;Transparent&nbsp;&nbsp;&bull;&nbsp;&nbsp;Trusted</p>

        <div className="auth-footer-badge" aria-hidden="true">
          <div className="auth-footer-badge-circle">
            <span><LockBadgeIcon /></span>
            <span className="auth-footer-badge-check"><CheckIcon /></span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword
