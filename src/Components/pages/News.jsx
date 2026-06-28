import AdvancedPage from './AdvancedPage.jsx'

const sections = [
  {
    title: 'Top Stories',
    items: [
      { token: 'B', title: 'Bitcoin ETF inflows accelerate', text: 'Institutional demand lifts market sentiment', meta: '2h ago', tone: 'gold' },
      { token: 'E', title: 'Ethereum staking yields steady', text: 'Validators maintain strong participation', meta: '4h ago', tone: 'blue' },
      { token: 'S', title: 'Solana ecosystem volume rises', text: 'DEX activity trends higher week over week', meta: '6h ago', tone: 'purple' },
    ],
  },
  {
    title: 'Market Notes',
    items: [
      { token: 'M', title: 'Macro watch', text: 'Dollar strength remains key for risk assets', meta: 'Daily', tone: 'green' },
      { token: 'R', title: 'Risk calendar', text: 'High impact events this week', meta: '3 events', tone: 'red' },
    ],
  },
]

function News() {
  return (
    <AdvancedPage
      title="News"
      eyebrow="Market intelligence"
      accent="Live"
      hero={{
        icon: 'news',
        kicker: 'Crypto news feed',
        title: 'Stay ahead of catalysts',
        text: 'Follow market-moving headlines, macro notes, and asset-specific updates in one place.',
      }}
      metrics={[
        { label: 'New Today', value: '28', meta: 'Stories' },
        { label: 'Watchlist', value: '9', meta: 'Assets' },
        { label: 'Sentiment', value: 'Bullish', meta: '+12 pts' },
        { label: 'Risk Events', value: '3', meta: 'This week', negative: true },
      ]}
      sections={sections}
      cta={{ label: 'Open alerts', to: '/price-alerts' }}
    />
  )
}

export default News
