import AdvancedPage from './AdvancedPage.jsx'
import { useMockLoading } from '../shared/useMockLoading.js'

const sections = [
  {
    title: 'Market Watch',
    action: { label: 'Trade', to: '/trades' },
    items: [
      { token: 'B', title: 'Bitcoin', text: 'BTC / USDT - Volume $42.8B', meta: '+3.85%', tone: 'gold' },
      { token: 'E', title: 'Ethereum', text: 'ETH / USDT - Volume $18.1B', meta: '+2.14%', tone: 'blue' },
      { token: 'S', title: 'Solana', text: 'SOL / USDT - Volume $4.2B', meta: '-0.62%', tone: 'purple', negative: true },
    ],
  },
  {
    title: 'Trending Pairs',
    items: [
      { token: 'A', title: 'ARB / USDT', text: 'Layer 2 momentum building', meta: '+8.2%', tone: 'green' },
      { token: 'L', title: 'LINK / USDT', text: 'Oracle demand spike', meta: '+5.7%', tone: 'blue' },
      { token: 'X', title: 'XRP / USDT', text: 'Range breakout watch', meta: '+3.1%', tone: 'gold' },
    ],
  },
]

function Markets() {
  const isLoading = useMockLoading()

  return (
    <AdvancedPage
      title="Markets"
      eyebrow="Live prices"
      accent="Trades"
      backTo="/trades"
      hero={{
        icon: 'market',
        kicker: 'Global crypto markets',
        title: '$2.48T market cap',
        text: 'Track top movers, trending pairs, and market-wide momentum before opening a position.',
      }}
      isLoading={isLoading}
      metrics={[
        { label: '24h Volume', value: '$96.4B', meta: '+11.8%' },
        { label: 'BTC Dominance', value: '54.2%', meta: '+0.4%' },
        { label: 'Gainers', value: '128', meta: 'Top 500' },
        { label: 'Losers', value: '74', meta: 'Top 500', negative: true },
      ]}
      sections={sections}
      cta={{ label: 'Open order book', to: '/order-book' }}
    />
  )
}

export default Markets
