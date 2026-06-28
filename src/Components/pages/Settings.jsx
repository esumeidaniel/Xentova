import { useState } from 'react'
import AdvancedPage from './AdvancedPage.jsx'

const sections = [
  {
    title: 'Preferences',
    items: [
      { token: 'D', title: 'Display currency', text: 'Show balances in USD', meta: 'USD', tone: 'green' },
      { token: 'N', title: 'Notifications', text: 'Push, email, and price alert delivery', meta: 'On', tone: 'blue' },
      { token: 'T', title: 'Theme', text: 'Dark trading interface', meta: 'Dark', tone: 'gold' },
    ],
  },
  {
    title: 'Privacy',
    items: [
      { token: 'P', title: 'Profile visibility', text: 'Hide portfolio and follower data', meta: 'Private', tone: 'green' },
      { token: 'S', title: 'Session timeout', text: 'Auto-lock after inactivity', meta: '15 min', tone: 'blue' },
    ],
  },
]

function Settings() {
  const [form, setForm] = useState({ currency: 'USD', language: 'EN', timeout: '15' })
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle')

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setMessage('')
    setStatus('idle')
  }

  const submitSettings = (event) => {
    event.preventDefault()

    if (!form.currency || !form.language) {
      setStatus('error')
      setMessage('Choose a currency and language.')
      return
    }

    if (Number(form.timeout) < 5) {
      setStatus('error')
      setMessage('Auto-lock must be at least 5 minutes.')
      return
    }

    setStatus('loading')
    window.setTimeout(() => {
      setStatus('success')
      setMessage('Settings updated successfully.')
    }, 400)
  }

  return (
    <AdvancedPage
      title="Settings"
      eyebrow="Account preferences"
      accent="More"
      hero={{
        icon: 'settings',
        kicker: 'Personalize Xentova',
        title: 'Your workspace rules',
        text: 'Control currency, notifications, privacy, and trading interface preferences.',
      }}
      metrics={[
        { label: 'Currency', value: 'USD', meta: 'Default' },
        { label: 'Language', value: 'EN', meta: 'System' },
        { label: 'Theme', value: 'Dark', meta: 'Active' },
        { label: 'Auto-lock', value: '15m', meta: 'Enabled' },
      ]}
      sections={sections}
      cta={{ label: 'Review security', to: '/security' }}
    >
      <form className="advanced-form" onSubmit={submitSettings}>
        <h2>Update Preferences</h2>
        <label>
          Display Currency
          <select value={form.currency} onChange={(event) => updateField('currency', event.target.value)}>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="EUR">EUR</option>
            <option value="NGN">NGN</option>
          </select>
        </label>
        <label>
          Language
          <select value={form.language} onChange={(event) => updateField('language', event.target.value)}>
            <option value="EN">English</option>
            <option value="FR">French</option>
            <option value="ES">Spanish</option>
          </select>
        </label>
        <label>
          Auto-lock Timeout (minutes)
          <input
            type="number"
            min="5"
            value={form.timeout}
            onChange={(event) => updateField('timeout', event.target.value)}
          />
        </label>
        {message ? (
          <em className={`advanced-form-message advanced-form-message--${status === 'success' ? 'success' : 'error'}`}>
            {message}
          </em>
        ) : null}
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </AdvancedPage>
  )
}

export default Settings
