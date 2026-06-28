import AdvancedPage from './AdvancedPage.jsx'

const sections = [
  {
    title: 'Lessons',
    items: [
      { token: '01', title: 'Reading candlesticks', text: 'Understand trend, wick, and volume context', meta: '8 min', tone: 'gold' },
      { token: '02', title: 'Risk/reward basics', text: 'Set stops and targets before entering', meta: '12 min', tone: 'green' },
      { token: '03', title: 'Copy trading safely', text: 'Evaluate drawdown and sizing rules', meta: '10 min', tone: 'blue' },
    ],
  },
  {
    title: 'Learning Paths',
    items: [
      { token: 'B', title: 'Beginner trader', text: 'Markets, wallets, and first trade flow', meta: '6 modules', tone: 'green' },
      { token: 'P', title: 'Portfolio manager', text: 'Allocation, rebalancing, and reports', meta: '5 modules', tone: 'gold' },
    ],
  },
]

function Learn() {
  return (
    <AdvancedPage
      title="Learn"
      eyebrow="Education"
      accent="More"
      hero={{
        icon: 'learn',
        kicker: 'Trading academy',
        title: 'Build better habits',
        text: 'Short lessons and guided paths help you understand markets before risking capital.',
      }}
      metrics={[
        { label: 'Completed', value: '14', meta: 'Lessons' },
        { label: 'Streak', value: '7d', meta: 'Active' },
        { label: 'Next Lesson', value: '8m', meta: 'Candles' },
        { label: 'Skill Level', value: '2', meta: 'Intermediate' },
      ]}
      sections={sections}
      cta={{ label: 'Continue lesson', to: '/learn' }}
    />
  )
}

export default Learn
