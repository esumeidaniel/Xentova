import AdvancedPage from './AdvancedPage.jsx'
import { EmptyState } from '../shared/AppState.jsx'
import { useMockLoading } from '../shared/useMockLoading.js'

const sections = [
  {
    title: 'Active Copy Trades',
    action: { label: 'Trader profile', to: '/trader-profile' },
    items: [
      { token: 'RC', title: 'Rei-CryptoPro', text: 'BTC momentum strategy - 87.4% win rate', meta: '+18.7%', tone: 'gold' },
      { token: 'AS', title: 'Asha Swing', text: 'ETH and SOL swing basket', meta: '+11.3%', tone: 'purple' },
      { token: 'MK', title: 'Macro Kai', text: 'Low leverage macro crypto pairs', meta: '+7.8%', tone: 'blue' },
    ],
  },
  {
    title: 'Top Traders',
    items: [
      { token: '1', title: 'Dara Alpha', text: '12 month return +148%', meta: 'Copy', tone: 'green' },
      { token: '2', title: 'Nora Quant', text: 'Sharpe 2.8 - drawdown 4.1%', meta: 'Copy', tone: 'gold' },
    ],
  },
]

function CopyTrading() {
  const isLoading = useMockLoading()

  return (
    <AdvancedPage
      title="Copy Trading"
      eyebrow="Follow experts"
      accent="Trades"
      backTo="/trades"
      hero={{
        icon: 'copy',
        kicker: 'Follow expert traders',
        title: '$18,420 copied PnL',
        text: 'Automatically mirror proven trader strategies with custom risk limits and transparent performance data.',
      }}
      isLoading={isLoading}
      metrics={[
        { label: 'Copied Traders', value: '3', meta: 'Active' },
        { label: 'Monthly PnL', value: '+$3,820', meta: '+14.2%' },
        { label: 'Risk Limit', value: '8%', meta: 'Max drawdown' },
        { label: 'Followers', value: '42K', meta: 'Across top traders' },
      ]}
      sections={sections}
      cta={{ label: 'Browse traders', to: '/trader-profile' }}
    >
      <EmptyState
        title="No copied traders yet"
        message="When you pause all copied strategies, this is where an empty copy-trading state appears."
      />
    </AdvancedPage>
  )
}

export default CopyTrading
