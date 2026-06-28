import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './shared/AuthContext.jsx'
import './Signin.css'
import './Signup.css'

const UserIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <circle cx="12" cy="8.25" r="3" />
    <path d="M5.25 19.25a6.75 6.75 0 0 1 13.5 0" />
  </svg>
)

const MailIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M4.75 6.75h14.5v10.5H4.75z" />
    <path d="m5.25 7.25 6.25 5.25a1.15 1.15 0 0 0 1.5 0l6.25-5.25" />
  </svg>
)

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

const CheckIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="m6.75 12.5 3 3 6.75-7" />
  </svg>
)

const logoUrl = `${import.meta.env.BASE_URL}xentova-logo.png`

const BrandMark = ({ compact = false }) => (
  <div className={compact ? 'auth-brand-mark auth-brand-mark--compact' : 'auth-brand-mark'} aria-hidden="true">
    <img src={logoUrl} alt="" />
  </div>
)

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', accepted: false })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const navigate = useNavigate()
  const { login } = useAuth()

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const validate = () => {
    const nextErrors = {}

    if (form.name.trim().length < 2) nextErrors.name = 'Enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (form.password.length < 8) nextErrors.password = 'Password must be at least 8 characters.'
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Passwords must match.'
    if (!form.accepted) nextErrors.accepted = 'You must accept the terms to continue.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validate()) return

    setStatus('loading')
    window.setTimeout(() => {
      login()
      navigate('/home', { replace: true })
    }, 450)
  }

  return (
    <section className="auth-app auth-app--signup" aria-label="Xentova create account">
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

      <div className="signup-panel">
        <div className="auth-mobile-brand">
          <BrandMark compact />
          <p className="auth-logo-text">XENTOVA</p>
        </div>

        <header className="auth-header signup-header">
          <h1>Create Account</h1>
          <p>Join Xentova and start your investment journey</p>
        </header>

        <form
          className="auth-form signup-form"
          onSubmit={handleSubmit}
        >
          <label className="auth-field">
            <span>Full Name</span>
            <span className="auth-input">
              <UserIcon />
              <input
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                aria-invalid={Boolean(errors.name)}
              />
            </span>
            {errors.name ? <em className="form-error">{errors.name}</em> : null}
          </label>

          <label className="auth-field">
            <span>Email</span>
            <span className="auth-input auth-input--active">
              <MailIcon />
              <input
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                aria-invalid={Boolean(errors.email)}
              />
            </span>
            {errors.email ? <em className="form-error">{errors.email}</em> : null}
          </label>

          <label className="auth-field">
            <span>Password</span>
            <span className="auth-input">
              <LockIcon />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                autoComplete="new-password"
                value={form.password}
                onChange={(event) => updateField('password', event.target.value)}
                aria-invalid={Boolean(errors.password)}
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
            {errors.password ? <em className="form-error">{errors.password}</em> : null}
          </label>

          <label className="auth-field">
            <span>Confirm Password</span>
            <span className="auth-input">
              <LockIcon />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={(event) => updateField('confirmPassword', event.target.value)}
                aria-invalid={Boolean(errors.confirmPassword)}
              />
              <button
                className="icon-button"
                type="button"
                aria-label={showConfirmPassword ? 'Hide password confirmation' : 'Show password confirmation'}
                aria-pressed={showConfirmPassword}
                onClick={() => setShowConfirmPassword((current) => !current)}
              >
                <EyeIcon />
              </button>
            </span>
            {errors.confirmPassword ? <em className="form-error">{errors.confirmPassword}</em> : null}
          </label>

          <label className="terms-row">
            <input
              className="terms-native-check"
              type="checkbox"
              checked={form.accepted}
              onChange={(event) => updateField('accepted', event.target.checked)}
            />
            <span className="terms-check">
              <CheckIcon />
            </span>
            <span>
              I agree to the <a href="#terms">Terms &amp; Conditions</a> and{' '}
              <a href="#privacy">Privacy Policy</a>
            </span>
          </label>
          {errors.accepted ? <em className="form-error">{errors.accepted}</em> : null}

          <button className="auth-submit" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch signup-switch">
          Already have an account?{' '}
          <Link to="/signin">
            Sign In
          </Link>
        </p>
        <p className="auth-footnote">Secure&nbsp;&nbsp;&bull;&nbsp;&nbsp;Transparent&nbsp;&nbsp;&bull;&nbsp;&nbsp;Trusted</p>
      </div>
    </section>
  )
}

export default Signup
