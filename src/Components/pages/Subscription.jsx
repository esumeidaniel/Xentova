import AdvancedPage from './AdvancedPage.jsx'

const sections = [
  {
    title: 'Plans',
    items: [
      { token: 'B', title: 'Basic', text: 'Portfolio tracking and core trading', meta: '$0/mo', tone: 'blue' },
      { token: 'P', title: 'Pro', text: 'Premium signals, copy trading, and reports', meta: '$29/mo', tone: 'gold' },
      { token: 'E', title: 'Elite', text: 'Priority support and advanced automation', meta: '$99/mo', tone: 'purple' },
    ],
  },
  {
    title: 'Included in Pro',
    items: [
      { token: 'S', title: 'Premium signals', text: 'Top analyst trade ideas with targets', meta: 'Unlimited', tone: 'green' },
      { token: 'R', title: 'Performance reports', text: 'Monthly trading and portfolio analysis', meta: 'Included', tone: 'gold' },
    ],
  },
]

function Subscription() {
  return (
    <AdvancedPage
      title="Choose Plan"
      eyebrow="Subscription"
      accent="Upgrade"
      hero={{
        icon: 'subscription',
        kicker: 'Unlock premium tools',
        title: 'Pro plan recommended',
        text: 'Upgrade for premium signals, copy trading insights, monthly reports, and priority support.',
      }}
      metrics={[
        { label: 'Current Plan', value: 'Basic', meta: '$0/mo' },
        { label: 'Best Value', value: 'Pro', meta: '$29/mo' },
        { label: 'Signals', value: 'Unlimited', meta: 'Pro' },
        { label: 'Trial', value: '7 days', meta: 'Available' },
      ]}
      sections={sections}
      cta={{ label: 'Upgrade to Pro', to: '/subscription' }}
    />
  )
}

export default Subscription
