import AdvancedPage from './AdvancedPage.jsx'

const pageContent = {
  buyCrypto: {
    title: 'Buy Crypto',
    eyebrow: 'Funding preview',
    icon: 'wallet',
    kicker: 'Demo purchase flow',
    headline: 'Buy BTC, ETH, SOL, and USDT',
    text: 'Preview card, bank, and wallet funding options before payment provider integration is connected.',
    cta: { label: 'Preview deposit flow', to: '/deposit' },
    warning: 'Preview only. Crypto purchases require payment provider, wallet, compliance, and backend integration.',
    metrics: [
      { label: 'Assets', value: '12+', meta: 'Demo list' },
      { label: 'Providers', value: 'Pending', meta: 'Backend required' },
      { label: 'Limits', value: '$0', meta: 'Not live' },
      { label: 'Fees', value: 'Demo', meta: 'Provider based' },
    ],
    sections: [
      {
        title: 'Funding Methods',
        items: [
          { token: 'C', title: 'Card Purchase', text: 'Visa/Mastercard provider placeholder', meta: 'Preview', tone: 'gold' },
          { token: 'B', title: 'Bank Transfer', text: 'ACH/wire connection placeholder', meta: 'Backend', tone: 'blue' },
          { token: 'W', title: 'Wallet Transfer', text: 'External wallet funding preview', meta: 'Demo', tone: 'green' },
        ],
      },
    ],
  },
  wallet: {
    title: 'Wallet Overview',
    eyebrow: 'Funding hub',
    icon: 'wallet',
    kicker: 'Balances and funding routes',
    headline: '$12,840 available balance',
    text: 'Review available, locked, pending, and demo wallet balances from one funding workspace.',
    cta: { label: 'Deposit funds', to: '/deposit' },
    warning: 'Wallet balances are demo data. Real custody and ledger updates require backend/wallet infrastructure.',
    metrics: [
      { label: 'Available', value: '$12,840', meta: 'Demo' },
      { label: 'Locked', value: '$2,410', meta: 'Open orders' },
      { label: 'Pending', value: '$500', meta: 'Review' },
      { label: 'Networks', value: '5', meta: 'Preview' },
    ],
    sections: [
      {
        title: 'Funding Actions',
        items: [
          { token: '+', title: 'Deposit', text: 'Select asset, network, and address', meta: 'Open', tone: 'green' },
          { token: '-', title: 'Withdraw', text: 'Address, fee, and approval preview', meta: 'Review', tone: 'red' },
          { token: 'H', title: 'History', text: 'Track deposits, withdrawals, and transfers', meta: 'View', tone: 'gold' },
        ],
      },
    ],
  },
  bot: {
    title: 'Trading Bot',
    eyebrow: 'Automation demo',
    icon: 'bot',
    kicker: 'Strategy builder preview',
    headline: 'Grid, DCA, and signal-based bots',
    text: 'Build a frontend preview of automated strategies with risk limits and stop rules before execution APIs exist.',
    cta: { label: 'Open trade terminal', to: '/trades' },
    warning: 'Bot execution is disabled. Automated trading requires exchange APIs, risk engine, and backend controls.',
    metrics: [
      { label: 'Bot Types', value: '3', meta: 'Preview' },
      { label: 'Active Bots', value: '0', meta: 'Demo only' },
      { label: 'Risk Guard', value: 'On', meta: 'UI only' },
      { label: 'Execution', value: 'Off', meta: 'Backend required' },
    ],
    sections: [
      {
        title: 'Bot Templates',
        items: [
          { token: 'G', title: 'Grid Bot', text: 'Range-based buy/sell ladder preview', meta: 'Demo', tone: 'gold' },
          { token: 'D', title: 'DCA Bot', text: 'Scheduled accumulation preview', meta: 'Demo', tone: 'blue' },
          { token: 'S', title: 'Signal Bot', text: 'Mirror approved signal rules', meta: 'Locked', tone: 'purple' },
        ],
      },
    ],
  },
  risk: {
    title: 'Risk Disclosure',
    eyebrow: 'Legal',
    icon: 'alert',
    kicker: 'Crypto involves risk',
    headline: 'No guaranteed returns',
    text: 'Xentova screens are demo UI. Market prices can move quickly, and users should understand risk before trading or investing.',
    warning: 'This frontend is not financial advice and does not execute real trades.',
    sections: [
      {
        title: 'Key Risks',
        items: [
          { token: '1', title: 'Market Volatility', text: 'Crypto assets can gain or lose value quickly.', meta: 'Risk', tone: 'red' },
          { token: '2', title: 'Execution Risk', text: 'Real trading depends on backend and exchange APIs.', meta: 'Backend', tone: 'gold' },
          { token: '3', title: 'Security Risk', text: 'Wallets, withdrawals, and KYC require audited systems.', meta: 'Required', tone: 'blue' },
        ],
      },
    ],
  },
  terms: {
    title: 'Terms',
    eyebrow: 'Legal',
    icon: 'receipt',
    kicker: 'Platform terms placeholder',
    headline: 'Terms of use draft',
    text: 'Add reviewed legal language before public launch. This page is a frontend placeholder for final terms.',
    warning: 'Legal content should be reviewed by a qualified professional before launch.',
    sections: [
      {
        title: 'Draft Sections',
        items: [
          { token: 'A', title: 'Account Use', text: 'Eligibility, access, and user responsibilities.', meta: 'Draft', tone: 'gold' },
          { token: 'R', title: 'Risk Acceptance', text: 'Crypto and investment risk acknowledgement.', meta: 'Draft', tone: 'red' },
          { token: 'S', title: 'Service Limits', text: 'Backend availability and third-party dependencies.', meta: 'Draft', tone: 'blue' },
        ],
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    eyebrow: 'Legal',
    icon: 'security',
    kicker: 'Data handling placeholder',
    headline: 'Privacy policy draft',
    text: 'Prepare user data, KYC, analytics, and support data disclosures before backend collection begins.',
    warning: 'Do not collect real sensitive data until privacy, compliance, and security controls are ready.',
    sections: [
      {
        title: 'Data Categories',
        items: [
          { token: 'P', title: 'Profile Data', text: 'Name, email, preferences, and account status.', meta: 'Future' },
          { token: 'K', title: 'KYC Data', text: 'Document verification needs protected storage.', meta: 'Backend', tone: 'blue' },
          { token: 'A', title: 'Activity Data', text: 'Trading, wallet, support, and security events.', meta: 'Future', tone: 'gold' },
        ],
      },
    ],
  },
  about: {
    title: 'About Xentova',
    eyebrow: 'Company',
    icon: 'market',
    kicker: 'Crypto, invest, grow',
    headline: 'A premium crypto dashboard demo',
    text: 'Xentova is being shaped as a modern frontend for portfolio tracking, trading previews, signals, copy trading, and funding flows.',
    cta: { label: 'Start demo', to: '/signup' },
    warning: 'This version is a frontend demo. Backend, compliance, and real market integrations come next.',
    metrics: [
      { label: 'Pages', value: '30+', meta: 'Frontend' },
      { label: 'Theme', value: 'Gold', meta: 'Premium dark' },
      { label: 'Backend', value: 'Next', meta: 'Not built' },
      { label: 'Status', value: 'Demo', meta: 'Review ready' },
    ],
    sections: [
      {
        title: 'Platform Areas',
        items: [
          { token: 'M', title: 'Markets', text: 'Watchlist, movers, gainers, and losers.', meta: 'Demo' },
          { token: 'T', title: 'Trading', text: 'Order preview, positions, and order book UI.', meta: 'Demo', tone: 'blue' },
          { token: 'S', title: 'Signals', text: 'Signal cards with risk and confidence labels.', meta: 'Demo', tone: 'gold' },
        ],
      },
    ],
  },
}

function DemoInfoPage({ type }) {
  const content = pageContent[type] || pageContent.about

  return (
    <AdvancedPage
      title={content.title}
      eyebrow={content.eyebrow}
      accent="Demo UI"
      backTo="/more"
      hero={{
        icon: content.icon,
        kicker: content.kicker,
        title: content.headline,
        text: content.text,
      }}
      metrics={content.metrics || []}
      sections={content.sections || []}
      cta={content.cta}
    >
      <section className="advanced-warning" role="note">
        <strong>Preview only</strong>
        <p>{content.warning}</p>
      </section>
    </AdvancedPage>
  )
}

export default DemoInfoPage
