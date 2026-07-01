import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  AuthBrandPanel,
  AuthInput,
  DemoNotice,
  EyeIcon,
  LockIcon,
  MailIcon,
  MobileBrandHeader,
  SecurityNote,
  SocialAuthButtons,
  TrustBadges,
} from './AuthShared.jsx'
import { useAuth } from './shared/AuthContext.jsx'

import './Signin.css'

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
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
      nextErrors.password = 'Use at least 6 characters for this demo sign in.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus('idle')

    if (!validate()) return

    setStatus('loading')
    window.setTimeout(() => {
      if (form.email.toLowerCase() === 'wrong@example.com') {
        setStatus('error')
        return
      }

      setStatus('success')
      window.setTimeout(() => {
        login()
        navigate(location.state?.from?.pathname || '/home', { replace: true })
      }, 350)
    }, 650)
  }

  const handleSocialLogin = () => {
    setStatus('loading')
    window.setTimeout(() => {
      login()
      navigate('/home', { replace: true })
    }, 450)
  }

  const emailReady = form.email && !errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  const passwordReady = form.password.length >= 6 && !errors.password

  return (
    <section className="auth-app" aria-label="Xentova sign in">
      <AuthBrandPanel />

      <main className="signin-panel">
        <div className="auth-form-shell">
          <MobileBrandHeader />

          <header className="auth-header">
            <p className="auth-kicker">Protected account access</p>
            <h1>Sign in to Xentova</h1>
            <p>Access your portfolio, markets, signals, and trading dashboard.</p>
          </header>

          <TrustBadges compact />

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <AuthInput
              id="signin-email"
              label="Email"
              icon={<MailIcon />}
              error={errors.email}
              success={emailReady ? 'Email format looks good.' : ''}
            >
              <input
                id="signin-email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'signin-email-error' : undefined}
              />
            </AuthInput>

            <AuthInput
              id="signin-password"
              label="Password"
              icon={<LockIcon />}
              error={errors.password}
              success={passwordReady ? 'Password ready.' : ''}
            >
              <input
                id="signin-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={(event) => updateField('password', event.target.value)}
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'signin-password-error' : undefined}
              />
              <button
                className="icon-button"
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((current) => !current)}
              >
                <EyeIcon hidden={!showPassword} />
              </button>
            </AuthInput>

            <div className="auth-options-row">
              <label className="remember-row">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <Link className="auth-link" to="/forgot-password">
                Forgot Password?
              </Link>
            </div>

            {status === 'error' ? (
              <div className="auth-alert" role="alert">
                Wrong login details. Try another email or password.
              </div>
            ) : null}

            {status === 'success' ? (
              <div className="auth-alert auth-alert--success" role="status">
                Demo sign in accepted. Opening your dashboard.
              </div>
            ) : null}

            <button className="auth-submit" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <SocialAuthButtons onClick={handleSocialLogin} />
          <DemoNotice>Social login is demo UI until backend integration.</DemoNotice>

          <p className="auth-switch">
            Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
          </p>

          <SecurityNote>
            Protected account access. Backend authentication required for production.
          </SecurityNote>
        </div>
      </main>
    </section>
  )
}

export default Signin
