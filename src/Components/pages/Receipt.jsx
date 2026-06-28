import AdvancedPage from './AdvancedPage.jsx'

const sections = [
  {
    title: 'Transaction Details',
    items: [
      { token: 'ID', title: 'Transaction ID', text: 'TX8K2M9X3Q', meta: 'Copied', tone: 'blue' },
      { token: 'TR', title: 'Network', text: 'USDT deposit via TRC-20', meta: '$0 fee', tone: 'green' },
      { token: 'ST', title: 'Status', text: 'May 17, 2024 - 4:30 PM', meta: 'Completed', tone: 'gold' },
    ],
  },
]

function Receipt() {
  return (
    <AdvancedPage
      title="Receipt"
      eyebrow="Transaction complete"
      accent="Portfolio"
      backTo="/portfolio"
      hero={{
        icon: 'receipt',
        kicker: 'Deposit confirmed',
        title: '+$2,000.00',
        text: 'Your USDT deposit has been confirmed and added to your available portfolio balance.',
      }}
      metrics={[
        { label: 'Amount', value: '$2,000', meta: 'USDT' },
        { label: 'Network Fee', value: '$0.00', meta: 'TRC-20' },
        { label: 'Confirmations', value: '24', meta: 'Final' },
        { label: 'Balance', value: '$78,623', meta: 'Updated' },
      ]}
      sections={sections}
      cta={{ label: 'Back to portfolio', to: '/portfolio' }}
    />
  )
}

export default Receipt
