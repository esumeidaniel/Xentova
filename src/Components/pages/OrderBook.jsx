import AdvancedPage from './AdvancedPage.jsx'

const sections = [
  {
    title: 'Asks',
    items: [
      { token: 'S', title: '67,489.2', text: '0.142 BTC - Total 9,583', meta: 'Sell', tone: 'red', negative: true },
      { token: 'S', title: '67,478.6', text: '0.298 BTC - Total 20,109', meta: 'Sell', tone: 'red', negative: true },
      { token: 'S', title: '67,455.0', text: '0.412 BTC - Total 27,791', meta: 'Sell', tone: 'red', negative: true },
    ],
  },
  {
    title: 'Bids',
    items: [
      { token: 'B', title: '67,449.3', text: '0.356 BTC - Total 24,008', meta: 'Buy', tone: 'green' },
      { token: 'B', title: '67,441.7', text: '0.198 BTC - Total 13,353', meta: 'Buy', tone: 'green' },
      { token: 'B', title: '67,430.2', text: '0.487 BTC - Total 32,855', meta: 'Buy', tone: 'green' },
    ],
  },
]

function OrderBook() {
  return (
    <AdvancedPage
      title="BTC/USDT"
      eyebrow="Advanced trading"
      accent="$67,452.18"
      backTo="/trades"
      hero={{
        icon: 'order',
        kicker: 'Order book',
        title: 'Spread $2.90',
        text: 'Inspect live bid and ask depth before submitting market or limit orders.',
      }}
      metrics={[
        { label: 'Mark Price', value: '$67,452', meta: '+3.85%' },
        { label: '24h High', value: '$68,120', meta: 'BTC' },
        { label: '24h Low', value: '$64,880', meta: 'BTC' },
        { label: 'Open Orders', value: '8', meta: 'Active' },
      ]}
      sections={sections}
      cta={{ label: 'Place trade', to: '/trades' }}
    />
  )
}

export default OrderBook
