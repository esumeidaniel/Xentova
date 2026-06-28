import AdvancedPage from './AdvancedPage.jsx'

const sections = [
  {
    title: 'Key Metrics',
    items: [
      { token: 'WR', title: 'Win rate', text: '68.7% over the last 90 days', meta: '+5.4%', tone: 'green' },
      { token: 'RR', title: 'Average risk/reward', text: 'Targeting asymmetric setups', meta: '1.82:1', tone: 'gold' },
      { token: 'DD', title: 'Max drawdown', text: 'Peak-to-trough portfolio pullback', meta: '6.2%', tone: 'blue' },
    ],
  },
  {
    title: 'Reports',
    items: [
      { token: 'M', title: 'May 2024 Performance Report', text: 'Portfolio attribution and trade analysis', meta: 'Ready', tone: 'green' },
      { token: 'A', title: 'April 2024 Performance Report', text: 'Monthly PnL, fees, and risk notes', meta: 'PDF', tone: 'gold' },
    ],
  },
]

function Performance() {
  return (
    <AdvancedPage
      title="Performance"
      eyebrow="Portfolio analytics"
      accent="Reports"
      backTo="/portfolio"
      hero={{
        icon: 'performance',
        kicker: 'Performance overview',
        title: '+12.45% this month',
        text: 'Review returns, drawdowns, win rate, and monthly reports for your Xentova portfolio.',
      }}
      metrics={[
        { label: 'Monthly Return', value: '+12.45%', meta: '+$8,742' },
        { label: 'Win Rate', value: '68.7%', meta: '+5.4%' },
        { label: 'Avg R/R', value: '1.82:1', meta: '+0.1' },
        { label: 'AUM', value: '$78.62M', meta: '+6.33%' },
      ]}
      sections={sections}
      cta={{ label: 'Open history', to: '/history' }}
    />
  )
}

export default Performance
