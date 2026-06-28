import { useState } from 'react'
import AdvancedPage from './AdvancedPage.jsx'

const sections = [
  {
    title: 'Verification Steps',
    items: [
      { token: '1', title: 'Personal information', text: 'Legal name, date of birth, and address', meta: 'Done', tone: 'green' },
      { token: '2', title: 'Government ID', text: 'Passport or driver license scan', meta: 'Pending', tone: 'gold' },
      { token: '3', title: 'Proof of address', text: 'Recent bank statement or utility bill', meta: 'Needed', tone: 'blue' },
    ],
  },
  {
    title: 'Benefits',
    items: [
      { token: 'L', title: 'Higher limits', text: 'Increase daily withdrawals to $100K', meta: 'Unlocked', tone: 'green' },
      { token: 'S', title: 'Secure withdrawals', text: 'Protect account transfers with verified identity', meta: 'Safer', tone: 'blue' },
    ],
  },
]

function Kyc() {
  const [form, setForm] = useState({ documentType: '', documentNumber: '', uploadName: '' })
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle')

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setError('')
    setStatus('idle')
  }

  const submitKyc = (event) => {
    event.preventDefault()

    if (!form.documentType) {
      setError('Choose a document type.')
      return
    }

    if (form.documentNumber.trim().length < 6) {
      setError('Enter a valid document number.')
      return
    }

    if (!form.uploadName.trim()) {
      setError('Enter the file name you uploaded.')
      return
    }

    setStatus('loading')
    window.setTimeout(() => {
      if (form.uploadName.toLowerCase().includes('fail')) {
        setStatus('error')
        setError('KYC upload failed. Re-upload a clearer document.')
        return
      }

      setStatus('success')
    }, 450)
  }

  return (
    <AdvancedPage
      title="Verify Identity"
      eyebrow="KYC"
      accent="Required"
      hero={{
        icon: 'kyc',
        kicker: 'Identity verification',
        title: '2 steps remaining',
        text: 'Complete verification to unlock higher withdrawal limits, card funding, and advanced trading features.',
      }}
      metrics={[
        { label: 'Current Tier', value: 'Basic', meta: '$5K limit' },
        { label: 'Next Tier', value: 'Pro', meta: '$100K limit' },
        { label: 'Review Time', value: '8 min', meta: 'Average' },
        { label: 'Progress', value: '45%', meta: 'In review' },
      ]}
      sections={sections}
      cta={{ label: 'Continue verification', to: '/kyc' }}
    >
      <form className="advanced-form" onSubmit={submitKyc}>
        <h2>KYC Upload</h2>
        <label>
          Document Type
          <select value={form.documentType} onChange={(event) => updateField('documentType', event.target.value)}>
            <option value="">Select document</option>
            <option value="passport">Passport</option>
            <option value="drivers-license">Driver license</option>
            <option value="national-id">National ID</option>
          </select>
        </label>
        <label>
          Document Number
          <input value={form.documentNumber} onChange={(event) => updateField('documentNumber', event.target.value)} placeholder="Enter document number" />
        </label>
        <label>
          Uploaded File Name
          <input value={form.uploadName} onChange={(event) => updateField('uploadName', event.target.value)} placeholder="passport-front.jpg" />
        </label>
        {error ? <em className="advanced-form-message advanced-form-message--error">{error}</em> : null}
        {status === 'success' ? <em className="advanced-form-message advanced-form-message--success">KYC documents submitted for review.</em> : null}
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Uploading...' : 'Submit KYC'}
        </button>
      </form>
    </AdvancedPage>
  )
}

export default Kyc
