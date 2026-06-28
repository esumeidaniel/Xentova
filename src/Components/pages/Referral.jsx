import { useState } from 'react'
import AdvancedPage from './AdvancedPage.jsx'
import { EmptyState } from '../shared/AppState.jsx'
import { referralCode } from '../../data/demoData.js'

const sections = [
  {
    title: 'Rewards',
    items: [
      { token: '$', title: 'Commission earned', text: 'From 18 active referrals', meta: '$1,240', tone: 'green' },
      { token: 'R', title: 'Referral code', text: 'XENTOVA-JD-24', meta: 'Copy', tone: 'gold' },
      { token: 'B', title: 'Next bonus', text: '2 more active users unlock bonus', meta: '$250', tone: 'blue' },
    ],
  },
  {
    title: 'Friends',
    items: [
      { token: 'AM', title: 'Amara K.', text: 'Joined May 12 - Active trader', meta: '$320', tone: 'green' },
      { token: 'NO', title: 'Noah S.', text: 'Joined May 6 - Portfolio funded', meta: '$180', tone: 'gold' },
    ],
  },
]

function Referral() {
  const [copied, setCopied] = useState(false)

  const copyReferral = async () => {
    try {
      await navigator.clipboard.writeText(referralCode)
    } catch {
      // clipboard unavailable, still show demo feedback
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <AdvancedPage
      title="Referral & Rewards"
      eyebrow="Invite friends"
      accent="Earn"
      hero={{
        icon: 'referral',
        kicker: 'Grow together',
        title: '$1,240 earned',
        text: 'Share Xentova with friends and earn commission when they trade or subscribe.',
      }}
      metrics={[
        { label: 'Invites', value: '42', meta: 'Sent' },
        { label: 'Joined', value: '18', meta: 'Active' },
        { label: 'Conversion', value: '42.8%', meta: '+6.1%' },
        { label: 'Pending', value: '$310', meta: 'Next payout' },
      ]}
      sections={sections}
    >
      <EmptyState
        title="No referrals yet"
        message="If you have not invited anyone, this state will show your referral link and next steps."
      />
      <form className="advanced-form" onSubmit={(event) => event.preventDefault()}>
        <h2>Share Referral Code</h2>
        <label>
          Your Code
          <input value={referralCode} readOnly />
        </label>
        {copied ? <em className="advanced-form-message advanced-form-message--success">Referral copied.</em> : null}
        <button type="button" onClick={copyReferral}>
          Copy Referral Code
        </button>
      </form>
    </AdvancedPage>
  )
}

export default Referral
