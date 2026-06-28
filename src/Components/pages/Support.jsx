import AdvancedPage from './AdvancedPage.jsx'

const sections = [
  {
    title: 'Help Channels',
    items: [
      { token: 'C', title: 'Live chat', text: 'Average first reply under 8 minutes', meta: 'Online', tone: 'green' },
      { token: 'T', title: 'Ticket center', text: 'Deposits, trading, and account support', meta: '24/7', tone: 'blue' },
      { token: 'F', title: 'FAQ', text: 'Find answers to common account questions', meta: 'Open', tone: 'gold' },
    ],
  },
  {
    title: 'Recent Tickets',
    items: [
      { token: '01', title: 'Withdrawal review', text: 'Resolved by Maya - May 17', meta: 'Closed', tone: 'green' },
      { token: '02', title: 'API key limit', text: 'Waiting for your response', meta: 'Open', tone: 'gold' },
    ],
  },
]

function Support() {
  return (
    <AdvancedPage
      title="Support"
      eyebrow="Help center"
      accent="24/7"
      hero={{
        icon: 'support',
        kicker: 'We are here to help',
        title: '8 minute median reply',
        text: 'Contact support, continue recent tickets, or browse help articles for account and trading questions.',
      }}
      metrics={[
        { label: 'Open Tickets', value: '1', meta: 'Waiting' },
        { label: 'Resolved', value: '12', meta: 'This year' },
        { label: 'Response Time', value: '8m', meta: 'Median' },
        { label: 'Satisfaction', value: '98%', meta: '+2%' },
      ]}
      sections={sections}
      cta={{ label: 'Start live chat', to: '/support' }}
    />
  )
}

export default Support
