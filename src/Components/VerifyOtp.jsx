import { useRef, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import './Signin.css'
import './Auth.css'

const ArrowLeftIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
)

const ShieldIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M12 21s7-3.5 7-10V5l-7-3-7 3v6c0 6.5 7 10 7 10Z" />
  </svg>
)

const BackspaceIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
    <line x1="18" y1="9" x2="12" y2="15" />
    <line x1="12" y1="9" x2="18" y2="15" />
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

const OTP_LENGTH = 4
const RESEND_SECONDS = 30

const KEYPAD_KEYS = [
  { num: '1', alpha: '' },
  { num: '2', alpha: 'ABC' },
  { num: '3', alpha: 'DEF' },
  { num: '4', alpha: 'GHI' },
  { num: '5', alpha: 'JKL' },
  { num: '6', alpha: 'MNO' },
  { num: '7', alpha: 'PQRS' },
  { num: '8', alpha: 'TUV' },
  { num: '9', alpha: 'WXYZ' },
  { special: true },
  { num: '0', alpha: '' },
  { special: true, backspace: true },
]

const VerifyOtp = () => {
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''))
  const [, setActiveIndex] = useState(0)
  const [seconds, setSeconds] = useState(RESEND_SECONDS)
  const inputsRef = useRef([])
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email

  useEffect(() => {
    if (seconds <= 0) return undefined
    const timer = setInterval(() => setSeconds((value) => value - 1), 1000)
    return () => clearInterval(timer)
  }, [seconds])

  const setDigitAt = (index, value) => {
    setDigits((current) => {
      const next = [...current]
      next[index] = value
      return next
    })
  }

  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    setDigitAt(index, digit)
    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus()
      setActiveIndex(index + 1)
    }
  }

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
      setActiveIndex(index - 1)
    }
  }

  const handlePaste = (event) => {
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (!pasted) return
    event.preventDefault()
    setDigits((current) => {
      const next = [...current]
      pasted.split('').forEach((char, i) => { next[i] = char })
      return next
    })
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1)
    inputsRef.current[focusIndex]?.focus()
    setActiveIndex(focusIndex)
  }

  // On-screen keypad helpers (handy for touch/app users)
  const pressDigit = (digit) => {
    const target = digits.findIndex((value) => !value)
    const index = target === -1 ? OTP_LENGTH - 1 : target
    setDigitAt(index, digit)
    const nextIndex = Math.min(index + 1, OTP_LENGTH - 1)
    inputsRef.current[nextIndex]?.focus()
    setActiveIndex(nextIndex)
  }

  const pressBackspace = () => {
    let index = digits.map((d) => !!d).lastIndexOf(true)
    if (index === -1) index = 0
    setDigitAt(index, '')
    inputsRef.current[index]?.focus()
    setActiveIndex(index)
  }

  const code = digits.join('')
  const isComplete = code.length === OTP_LENGTH

  return (
    <section className="auth-app" aria-label="Xentova verify OTP">
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

        <Link className="auth-back" to="/forgot-password">
          <ArrowLeftIcon />
          Back
        </Link>

        <span className="auth-icon-circle auth-icon-circle--square" aria-hidden="true">
          <ShieldIcon />
        </span>

        <header className="auth-header">
          <h1>Verify OTP</h1>
          <p>
            Enter the {OTP_LENGTH}-digit code sent to{' '}
            {email ? <strong>{email}</strong> : 'your registered email address'}.
          </p>
        </header>

        <form
          className="auth-form"
          onSubmit={(event) => {
            event.preventDefault()
            if (isComplete) navigate('/reset-password')
          }}
        >
          <div className="otp-row" onPaste={handlePaste}>
            {digits.map((digit, index) => (
              <input
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                ref={(el) => { inputsRef.current[index] = el }}
                className={`otp-box ${digit ? 'filled' : ''}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                aria-label={`Digit ${index + 1}`}
                onFocus={() => setActiveIndex(index)}
                onChange={(event) => handleChange(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
              />
            ))}
          </div>

          <p className="auth-resend">
            {seconds > 0 ? (
              <>Resend code in <strong>00:{String(seconds).padStart(2, '0')}</strong></>
            ) : (
              <button type="button" onClick={() => setSeconds(RESEND_SECONDS)}>Resend Code</button>
            )}
          </p>

          {/* On-screen numeric keypad */}
          <div className="auth-keypad" role="group" aria-label="On-screen number pad">
            {KEYPAD_KEYS.map((key, index) => {
              if (key.backspace) {
                return (
                  <button
                    key="backspace"
                    type="button"
                    className="auth-key"
                    aria-label="Delete digit"
                    onClick={pressBackspace}
                  >
                    <BackspaceIcon />
                  </button>
                )
              }
              if (key.special) {
                // eslint-disable-next-line react/no-array-index-key
                return <span key={`spacer-${index}`} className="auth-key" style={{ background: 'transparent', border: 'none' }} aria-hidden="true" />
              }
              return (
                <button
                  key={key.num}
                  type="button"
                  className="auth-key"
                  aria-label={`Digit ${key.num}`}
                  onClick={() => pressDigit(key.num)}
                >
                  <span className="auth-key-num">{key.num}</span>
                  {key.alpha ? <span className="auth-key-alpha">{key.alpha}</span> : null}
                </button>
              )
            })}
          </div>

          <button className="auth-submit" type="submit" disabled={!isComplete}>
            Verify
          </button>
        </form>
      </div>
    </section>
  )
}

export default VerifyOtp
