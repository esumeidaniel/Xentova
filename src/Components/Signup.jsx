import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  AuthBrandPanel,
  AuthInput,
  DemoNotice,
  EyeIcon,
  LockIcon,
  MailIcon,
  MobileBrandHeader,
  PasswordStrength,
  SecurityNote,
  TermsAgreement,
  TrustBadges,
  UserIcon,
} from './AuthShared.jsx'
import './Signin.css'
import './Signup.css'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    accepted: false,
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const navigate = useNavigate()

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
    setStatus('idle')
  }

  const passwordMeetsRequirements = (password) => (
    password.length >= 8
    && /[A-Z]/.test(password)
    && /\d/.test(password)
    && /[^A-Za-z0-9]/.test(password)
  )

  const validate = () => {
    const nextErrors = {}

    if (form.name.trim().length < 2) nextErrors.name = 'Enter your full name.'
    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!passwordMeetsRequirements(form.password)) {
      nextErrors.password = 'Password must meet all listed requirements.'
    }
    if (!form.confirmPassword) {
      nextErrors.confirmPassword = 'Confirm your password.'
    } else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = 'Passwords must match.'
    }
    if (!form.accepted) nextErrors.accepted = 'You must accept the terms to continue.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus('idle')

    if (!validate()) return

    setStatus('loading')
    window.setTimeout(() => {
      setStatus('success')
      window.setTimeout(() => {
        navigate('/verify-otp', { state: { email: form.email }, replace: true })
      }, 350)
    }, 650)
  }

  const nameReady = form.name.trim().length >= 2 && !errors.name
  const emailReady = form.email && !errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  const passwordReady = passwordMeetsRequirements(form.password) && !errors.password
  const confirmReady = form.confirmPassword && form.confirmPassword === form.password && !errors.confirmPassword

  return (
    <section className="auth-app auth-app--signup" aria-label="Xentova create account">
      <AuthBrandPanel />

      <main className="signup-panel">
        <div className="auth-form-shell auth-form-shell--signup">
          <MobileBrandHeader />

          <header className="auth-header signup-header">
            <p className="auth-kicker">Start securely</p>
            <h1>Create your Xentova account</h1>
            <p>Set up demo access for portfolio tools, market previews, and trading signals.</p>
          </header>

          <TrustBadges compact />

          <form className="auth-form signup-form" onSubmit={handleSubmit} noValidate>
            <AuthInput
              id="signup-name"
              label="Full Name"
              icon={<UserIcon />}
              error={errors.name}
              success={nameReady ? 'Name looks good.' : ''}
            >
              <input
                id="signup-name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'signup-name-error' : undefined}
              />
            </AuthInput>

            <AuthInput
              id="signup-email"
              label="Email"
              icon={<MailIcon />}
              error={errors.email}
              success={emailReady ? 'Email format looks good.' : ''}
            >
              <input
                id="signup-email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'signup-email-error' : undefined}
              />
            </AuthInput>

            <AuthInput
              id="signup-password"
              label="Password"
              icon={<LockIcon />}
              error={errors.password}
              success={passwordReady ? 'Password meets the requirements.' : ''}
            >
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a strong password"
                autoComplete="new-password"
                value={form.password}
                onChange={(event) => updateField('password', event.target.value)}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'signup-password-error' : undefined}
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

            <PasswordStrength password={form.password} />

            <AuthInput
              id="signup-confirm-password"
              label="Confirm Password"
              icon={<LockIcon />}
              error={errors.confirmPassword}
              success={confirmReady ? 'Passwords match.' : ''}
            >
              <input
                id="signup-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={(event) => updateField('confirmPassword', event.target.value)}
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={errors.confirmPassword ? 'signup-confirm-password-error' : undefined}
              />
              <button
                className="icon-button"
                type="button"
                aria-label={showConfirmPassword ? 'Hide password confirmation' : 'Show password confirmation'}
                aria-pressed={showConfirmPassword}
                onClick={() => setShowConfirmPassword((current) => !current)}
              >
                <EyeIcon hidden={!showConfirmPassword} />
              </button>
            </AuthInput>

            <TermsAgreement
              checked={form.accepted}
              error={errors.accepted}
              onChange={(value) => updateField('accepted', value)}
            />

            {status === 'success' ? (
              <div className="auth-alert auth-alert--success" role="status">
                Demo account created. Opening verification.
              </div>
            ) : null}

            <button className="auth-submit" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <DemoNotice>Account creation is frontend demo until backend integration.</DemoNotice>

          <p className="auth-switch signup-switch">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>

          <SecurityNote>
            Secure onboarding preview. Backend authentication and verification are required for production.
          </SecurityNote>
        </div>
      </main>
    </section>
  )
}

export default Signup
