import AdvancedPage from './AdvancedPage.jsx'

const sections = [
  {
    title: 'Strategy',
    items: [
      { token: 'S', title: 'Swing momentum', text: 'BTC, ETH, and SOL with 3-8 day holds', meta: 'Medium risk', tone: 'gold' },
      { token: 'R', title: 'Risk control', text: '2.4% average position risk', meta: 'Strict', tone: 'green' },
      { token: 'C', title: 'Copy settings', text: 'Auto-scale positions by wallet size', meta: 'Active', tone: 'blue' },
    ],
  },
  {
    title: 'Recent Wins',
    items: [
      { token: 'B', title: 'BTC long', text: 'Entry $64,980 - Exit $67,420', meta: '+3.75%', tone: 'gold' },
      { token: 'E', title: 'ETH breakout', text: 'Entry $2,612 - Exit $2,760', meta: '+5.66%', tone: 'blue' },
      { token: 'S', title: 'SOL scalp', text: 'Entry $170.20 - Exit $175.10', meta: '+2.88%', tone: 'purple' },
    ],
  },
]

function TraderProfile() {
  return (
    <AdvancedPage
      title="Trader Profile"
      eyebrow="Copy trader"
      accent="Top 1%"
      backTo="/copy-trading"
      hero={{
        icon: 'trader',
        kicker: 'Rei-CryptoPro',
        title: '87.4% win rate',
        text: 'Review trader history, risk profile, and recent executions before copying the strategy.',
      }}
      metrics={[
        { label: 'Followers', value: '12.8K', meta: '+418 this week' },
        { label: 'Monthly Return', value: '+18.7%', meta: '+$42.1K copied' },
        { label: 'Max Drawdown', value: '6.2%', meta: 'Controlled' },
        { label: 'AUM Copied', value: '$8.7M', meta: '+9.1%' },
      ]}
      sections={sections}
      cta={{ label: 'Start copying', to: '/copy-trading' }}
    />
  )
}

export default TraderProfile
