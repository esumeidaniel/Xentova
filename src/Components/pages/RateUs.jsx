import AdvancedPage from './AdvancedPage.jsx'

function RateUs() {
  return (
    <AdvancedPage
      title="Rate Us"
      eyebrow="Feedback"
      accent="More"
      hero={{
        icon: 'rate',
        kicker: 'Your opinion matters',
        title: 'How is Xentova working for you?',
        text: 'Share a quick rating so the trading experience can keep improving.',
      }}
      metrics={[
        { label: 'Average Rating', value: '4.8', meta: 'App users' },
        { label: 'Reviews', value: '12.4K', meta: '+320 this week' },
        { label: 'Support SLA', value: '8m', meta: 'Median reply' },
        { label: 'Resolved', value: '98%', meta: 'Tickets' },
      ]}
      sections={[
        {
          title: 'Quick Prompts',
          items: [
            { token: '5', title: 'Trading is smooth', text: 'Orders, charts, and signals feel fast.', meta: 'Excellent', tone: 'gold' },
            { token: '4', title: 'Portfolio is clear', text: 'Balances and allocation are easy to scan.', meta: 'Good', tone: 'green' },
            { token: '3', title: 'I need help', text: 'Send feedback to support for follow-up.', meta: 'Support', tone: 'blue' },
          ],
        },
      ]}
      cta={{ label: 'Send feedback', to: '/support' }}
    />
  )
}

export default RateUs
