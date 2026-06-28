import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './shared/AuthContext.jsx'

import './Signin.css'

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

const AppleIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M16.8 12.4c0-2 1.6-3 1.7-3.1-1-.1-2.1.5-2.6.5-.6 0-1.4-.5-2.3-.5-1.8 0-3.5 1.5-3.5 4 0 1.2.4 2.5 1 3.5.5.9 1.2 1.9 2 1.9.8 0 1.1-.5 2.1-.5s1.3.5 2.1.5c.9 0 1.5-.9 2-1.8.6-.9.8-1.8.8-1.9-.1 0-2-.7-2.1-2.5Z" />
    <path d="M15.4 7.6c.4-.5.7-1.2.6-1.9-.6 0-1.3.4-1.8.9-.4.5-.7 1.2-.6 1.8.7.1 1.4-.3 1.8-.8Z" />
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

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
    setStatus('idle')
  }

  const validate = () => {
    const nextErrors = {}

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!form.password) {
      nextErrors.password = 'Password is required.'
    } else if (form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validate()) return

    setStatus('loading')
    window.setTimeout(() => {
      if (form.email.toLowerCase() === 'wrong@example.com') {
        setStatus('error')
        return
      }

      login()
      navigate(location.state?.from?.pathname || '/home', { replace: true })
    }, 450)
  }

  const handleSocialLogin = () => {
    login()
    navigate('/home', { replace: true })
  }

  return (
    <section className="auth-app" aria-label="Xentova sign in">
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

      <div className="signin-panel">
        <div className="auth-mobile-brand">
          <BrandMark />
          <p className="auth-logo-text">XENTOVA</p>
        </div>

        <header className="auth-header">
          <h1>Welcome Back!</h1>
          <p>Sign in to continue to your account</p>
        </header>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <label className="auth-field">
            <span>Email</span>
            <span className="auth-input">
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
            <span className="auth-input auth-input--active">
              <LockIcon />
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(event) => updateField('password', event.target.value)}
                aria-label="Password"
                autoComplete="current-password"
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

          {status === 'error' ? (
            <div className="auth-alert" role="alert">
              Wrong login details. Try another email or password.
            </div>
          ) : null}

          <Link className="auth-link auth-forgot" to="/forgot-password">
            Forgot Password?
          </Link>

          <button className="auth-submit" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-divider">
          <span />
          <p>Or continue with</p>
          <span />
        </div>

        <div className="social-row">
          <button type="button" onClick={handleSocialLogin}>
            <span className="google-mark">G</span>
            Google
          </button>
          <button type="button" onClick={handleSocialLogin}>
            <span className="apple-mark">
              <AppleIcon />
            </span>
            Apple
          </button>
        </div>

        <p className="auth-switch">
          Don't have an account?{' '}
          <Link to="/signup">
            Sign Up
          </Link>
        </p>
        <p className="auth-footnote">Secure&nbsp;&nbsp;&bull;&nbsp;&nbsp;Transparent&nbsp;&nbsp;&bull;&nbsp;&nbsp;Trusted</p>
      </div>
    </section>
  )
}

export default Signin;
