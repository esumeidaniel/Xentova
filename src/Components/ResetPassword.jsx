import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './Signin.css'
import './Auth.css'

const LockIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M7.5 10.25h9a1 1 0 0 1 1 1v6.25a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-6.25a1 1 0 0 1 1-1Z" />
    <path d="M9 10.25V8a3 3 0 0 1 6 0v2.25" />
  </svg>
)

const EyeIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M3.75 12s2.75-5 8.25-5 8.25 5 8.25 5-2.75 5-8.25 5-8.25-5-8.25-5Z" />
    <circle cx="12" cy="12" r="2.25" />
  </svg>
)

const ArrowLeftIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
)

const ShieldCheckIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M12 21s7-3.5 7-10V5l-7-3-7 3v6c0 6.5 7 10 7 10Z" />
    <path d="m9 12 2 2 4-4" />
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

const getStrength = (password) => {
  let score = 0
  if (password.length >= 8) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1
  const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong']
  return { score, label: labels[score] }
}

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [done, setDone] = useState(false)
  const navigate = useNavigate()

  const strength = useMemo(() => getStrength(password), [password])
  const mismatch = confirm.length > 0 && confirm !== password
  const canSubmit = password.length >= 8 && password === confirm

  if (done) {
    return (
      <section className="auth-app" aria-label="Xentova password reset complete">
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

        <div className="signin-panel auth-panel auth-success">
          <div className="auth-mobile-brand">
            <BrandMark />
            <p className="auth-logo-text">XENTOVA</p>
          </div>

          <span className="auth-icon-circle auth-icon-circle--square" aria-hidden="true">
            <ShieldCheckIcon />
          </span>

          <header className="auth-header">
            <h1>Password Reset</h1>
            <p>Your password has been changed successfully. You can now sign in with your new password.</p>
          </header>

          <button className="auth-submit" type="button" onClick={() => navigate('/signin')}>
            Back to Sign In
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="auth-app" aria-label="Xentova reset password">
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
          <LockIcon />
        </span>

        <header className="auth-header">
          <h1>Set New Password</h1>
          <p>Create a new password that's at least 8 characters long and easy for you to remember.</p>
        </header>

        <form
          className="auth-form"
          onSubmit={(event) => {
            event.preventDefault()
            if (canSubmit) setDone(true)
          }}
        >
          <label className="auth-field">
            <span>New Password</span>
            <span className="auth-input auth-input--active">
              <LockIcon />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                className="icon-button"
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((current) => !current)}
              >
                <EyeIcon />
              </button>
            </span>
          </label>

          {password && (
            <div className="password-strength" aria-live="polite">
              <div className="password-strength-row">
                <span>Password Strength</span>
                <span>{strength.label}</span>
              </div>
              <div className="password-strength-bar">
                <i style={{ width: `${(strength.score / 4) * 100}%` }} />
              </div>
            </div>
          )}

          <label className="auth-field">
            <span>Confirm Password</span>
            <span className="auth-input">
              <LockIcon />
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Re-enter new password"
                autoComplete="new-password"
                required
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
              />
              <button
                className="icon-button"
                type="button"
                aria-label={showConfirm ? 'Hide password confirmation' : 'Show password confirmation'}
                aria-pressed={showConfirm}
                onClick={() => setShowConfirm((current) => !current)}
              >
                <EyeIcon />
              </button>
            </span>
          </label>

          {mismatch && (
            <p className="auth-resend" style={{ color: 'var(--sell)', textAlign: 'left' }}>
              Passwords do not match.
            </p>
          )}

          <button className="auth-submit" type="submit" disabled={!canSubmit}>
            Reset Password
          </button>
        </form>

        <p className="auth-footnote">Secure&nbsp;&nbsp;&bull;&nbsp;&nbsp;Transparent&nbsp;&nbsp;&bull;&nbsp;&nbsp;Trusted</p>

        <div className="auth-footer-badge" aria-hidden="true">
          <div className="auth-footer-badge-circle">
            <span><ShieldCheckIcon /></span>
            <span className="auth-footer-badge-check"><CheckIcon /></span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResetPassword
