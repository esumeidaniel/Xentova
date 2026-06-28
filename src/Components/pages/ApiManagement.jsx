import { useState } from 'react'
import AdvancedPage from './AdvancedPage.jsx'
import { EmptyState } from '../shared/AppState.jsx'

const sections = [
  {
    title: 'API Keys',
    items: [
      { token: 'K1', title: 'Trading Bot', text: 'Read and trade access - Last used 2h ago', meta: 'Active', tone: 'green' },
      { token: 'K2', title: 'Portfolio Sync', text: 'Read-only - Last used yesterday', meta: 'Active', tone: 'blue' },
      { token: 'K3', title: 'Tax Export', text: 'Read-only - Created May 12', meta: 'Paused', tone: 'gold' },
    ],
  },
  {
    title: 'Permissions',
    items: [
      { token: 'R', title: 'Read balances', text: 'Portfolio and history access', meta: 'Allowed', tone: 'green' },
      { token: 'T', title: 'Trade access', text: 'Spot trading only', meta: 'Limited', tone: 'gold' },
      { token: 'W', title: 'Withdrawals', text: 'Disabled by default', meta: 'Off', tone: 'red', negative: true },
    ],
  },
]

function ApiManagement() {
  const [form, setForm] = useState({ name: '', permission: 'read' })
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle')

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setMessage('')
    setStatus('idle')
  }

  const submitKey = (event) => {
    event.preventDefault()

    if (form.name.trim().length < 3) {
      setStatus('error')
      setMessage('API key name must be at least 3 characters.')
      return
    }

    setStatus('loading')
    window.setTimeout(() => {
      setStatus('success')
      setMessage(`API key "${form.name.trim()}" created with ${form.permission} access.`)
    }, 400)
  }

  return (
    <AdvancedPage
      title="API Management"
      eyebrow="Developer access"
      accent="Secure"
      hero={{
        icon: 'api',
        kicker: 'Programmatic trading',
        title: '3 API keys',
        text: 'Create scoped API keys for bots, dashboards, and reporting tools with withdrawal access locked down.',
      }}
      metrics={[
        { label: 'Active Keys', value: '3', meta: 'Scoped' },
        { label: 'Last Used', value: '2h', meta: 'Trading Bot' },
        { label: 'IP Locks', value: '2', meta: 'Enabled' },
        { label: 'Withdraw API', value: 'Off', meta: 'Protected', negative: true },
      ]}
      sections={sections}
      cta={{ label: 'Create API key', to: '/api-management' }}
    >
      <EmptyState
        title="No API keys yet"
        message="If you revoke every key, this state explains where new keys will appear."
      />
      <form className="advanced-form" onSubmit={submitKey}>
        <h2>Create API Key</h2>
        <label>
          Key Name
          <input
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            placeholder="Trading Bot"
          />
        </label>
        <label>
          Permission
          <select value={form.permission} onChange={(event) => updateField('permission', event.target.value)}>
            <option value="read">Read only</option>
            <option value="read-trade">Read and trade</option>
          </select>
        </label>
        {message ? (
          <em className={`advanced-form-message advanced-form-message--${status === 'success' ? 'success' : 'error'}`}>
            {message}
          </em>
        ) : null}
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Creating...' : 'Create Key'}
        </button>
      </form>
    </AdvancedPage>
  )
}

export default ApiManagement
