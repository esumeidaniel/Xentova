import { useState } from 'react'
import AdvancedPage from './AdvancedPage.jsx'
import { EmptyState } from '../shared/AppState.jsx'

const sections = [
  {
    title: 'Cards',
    items: [
      { token: 'MC', title: 'Mastercard ending 4582', text: 'John Doe - Expires 09/27', meta: 'Default', tone: 'gold' },
      { token: 'VI', title: 'Visa ending 1029', text: 'Expires 03/26', meta: 'Active', tone: 'blue' },
    ],
  },
  {
    title: 'Linked Accounts',
    items: [
      { token: 'CH', title: 'Chase Bank ending 7731', text: 'Checking - Verified', meta: 'Bank', tone: 'blue' },
      { token: 'MM', title: 'MetaMask', text: '0x7a2f...9c3d', meta: 'Linked', tone: 'green' },
    ],
  },
]

function PaymentMethods() {
  const [form, setForm] = useState({ cardNumber: '', name: '', expiry: '' })
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle')

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setError('')
    setStatus('idle')
  }

  const submitPayment = (event) => {
    event.preventDefault()
    const cardDigits = form.cardNumber.replace(/\D/g, '')

    if (cardDigits.length < 12) {
      setError('Enter a valid card number.')
      return
    }

    if (form.name.trim().length < 2) {
      setError('Enter the cardholder name.')
      return
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) {
      setError('Use MM/YY for the expiry date.')
      return
    }

    setStatus('loading')
    window.setTimeout(() => {
      if (cardDigits.endsWith('0000')) {
        setStatus('error')
        setError('Network error. Payment method was not saved.')
        return
      }

      setStatus('success')
    }, 450)
  }

  return (
    <AdvancedPage
      title="Payment Methods"
      eyebrow="Funding"
      accent="More"
      hero={{
        icon: 'payment',
        kicker: 'Cards, banks, and wallets',
        title: '4 saved methods',
        text: 'Manage verified cards, bank accounts, and crypto wallets for deposits and withdrawals.',
      }}
      metrics={[
        { label: 'Default Card', value: '4582', meta: 'Mastercard' },
        { label: 'Banks', value: '1', meta: 'Verified' },
        { label: 'Wallets', value: '1', meta: 'Linked' },
        { label: 'Limits', value: '$25K', meta: 'Daily' },
      ]}
      sections={sections}
      cta={{ label: 'Add payment method', to: '/payment-methods' }}
    >
      <EmptyState
        title="No saved payment methods yet"
        message="If you remove every card, bank, and wallet, this empty state keeps the page clear."
      />
      <form className="advanced-form" onSubmit={submitPayment}>
        <h2>Add Card</h2>
        <label>
          Card Number
          <input value={form.cardNumber} onChange={(event) => updateField('cardNumber', event.target.value)} placeholder="4242 4242 4242 4242" inputMode="numeric" />
        </label>
        <label>
          Cardholder Name
          <input value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="John Doe" autoComplete="cc-name" />
        </label>
        <label>
          Expiry
          <input value={form.expiry} onChange={(event) => updateField('expiry', event.target.value)} placeholder="09/27" autoComplete="cc-exp" />
        </label>
        {error ? <em className="advanced-form-message advanced-form-message--error">{error}</em> : null}
        {status === 'success' ? <em className="advanced-form-message advanced-form-message--success">Payment method saved.</em> : null}
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Saving...' : 'Save Payment Method'}
        </button>
      </form>
    </AdvancedPage>
  )
}

export default PaymentMethods
