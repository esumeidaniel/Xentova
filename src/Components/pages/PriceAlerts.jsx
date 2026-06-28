import { useState } from 'react'
import AdvancedPage from './AdvancedPage.jsx'
import { EmptyState } from '../shared/AppState.jsx'

const sections = [
  {
    title: 'Active Alerts',
    items: [
      { token: 'B', title: 'BTC above $70,000', text: 'Push and email notification', meta: 'Armed', tone: 'gold' },
      { token: 'E', title: 'ETH below $2,500', text: 'Risk rebalance trigger', meta: 'Armed', tone: 'blue' },
      { token: 'S', title: 'SOL moves 5%', text: 'Any direction in 1 hour', meta: 'Armed', tone: 'purple' },
    ],
  },
  {
    title: 'Suggested Alerts',
    items: [
      { token: 'V', title: 'BTC volume spike', text: 'Notify above 2x average volume', meta: 'Add', tone: 'green' },
      { token: 'F', title: 'Funding rate warning', text: 'Notify when futures funding overheats', meta: 'Add', tone: 'red' },
    ],
  },
]

function PriceAlerts() {
  const [form, setForm] = useState({ pair: 'BTC/USDT', condition: 'above', price: '' })
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle')

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setMessage('')
    setStatus('idle')
  }

  const submitAlert = (event) => {
    event.preventDefault()

    if (!form.pair.trim()) {
      setStatus('error')
      setMessage('Choose a market pair.')
      return
    }

    if (Number(form.price) <= 0) {
      setStatus('error')
      setMessage('Alert price must be greater than 0.')
      return
    }

    setStatus('loading')
    window.setTimeout(() => {
      setStatus('success')
      setMessage(`Alert created for ${form.pair} ${form.condition} $${Number(form.price).toLocaleString()}.`)
    }, 400)
  }

  return (
    <AdvancedPage
      title="Price Alerts"
      eyebrow="Notifications"
      accent="Live"
      backTo="/notifications"
      hero={{
        icon: 'alert',
        kicker: 'Never miss key levels',
        title: '6 active alerts',
        text: 'Create price, volume, and volatility alerts for markets you follow most.',
      }}
      metrics={[
        { label: 'Triggered Today', value: '3', meta: '2 profitable' },
        { label: 'Active', value: '6', meta: 'Across 4 assets' },
        { label: 'Muted', value: '1', meta: 'ETH below $2K' },
        { label: 'Delivery', value: 'Push', meta: 'Primary' },
      ]}
      sections={sections}
      cta={{ label: 'Create alert', to: '/price-alerts' }}
    >
      <EmptyState
        title="No alerts yet"
        message="If you delete all price alerts, this empty state keeps the alerts page helpful."
      />
      <form className="advanced-form" onSubmit={submitAlert}>
        <h2>Create Price Alert</h2>
        <label>
          Market Pair
          <select value={form.pair} onChange={(event) => updateField('pair', event.target.value)}>
            <option value="BTC/USDT">BTC/USDT</option>
            <option value="ETH/USDT">ETH/USDT</option>
            <option value="SOL/USDT">SOL/USDT</option>
          </select>
        </label>
        <label>
          Condition
          <select value={form.condition} onChange={(event) => updateField('condition', event.target.value)}>
            <option value="above">Above</option>
            <option value="below">Below</option>
          </select>
        </label>
        <label>
          Target Price
          <input
            type="number"
            min="0"
            inputMode="decimal"
            placeholder="70000"
            value={form.price}
            onChange={(event) => updateField('price', event.target.value)}
          />
        </label>
        {message ? (
          <em className={`advanced-form-message advanced-form-message--${status === 'success' ? 'success' : 'error'}`}>
            {message}
          </em>
        ) : null}
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Creating...' : 'Create Alert'}
        </button>
      </form>
    </AdvancedPage>
  )
}

export default PriceAlerts
