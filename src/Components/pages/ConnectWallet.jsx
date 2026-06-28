import AdvancedPage from './AdvancedPage.jsx'

const sections = [
  {
    title: 'Wallet Options',
    items: [
      { token: 'MM', title: 'MetaMask', text: 'Browser and mobile wallet', meta: 'Popular', tone: 'gold' },
      { token: 'CW', title: 'Coinbase Wallet', text: 'Secure self-custody wallet', meta: 'Ready', tone: 'blue' },
      { token: 'WC', title: 'WalletConnect', text: 'Connect hundreds of wallets by QR', meta: 'QR', tone: 'green' },
    ],
  },
  {
    title: 'Connection Safety',
    items: [
      { token: 'R', title: 'Read-only by default', text: 'Xentova cannot move funds without approval', meta: 'Safe', tone: 'green' },
      { token: 'A', title: 'Approve each action', text: 'Confirm deposits or transfers in wallet', meta: 'Manual', tone: 'gold' },
    ],
  },
]

function ConnectWallet() {
  return (
    <AdvancedPage
      title="Connect Wallet"
      eyebrow="Crypto wallet"
      accent="Secure"
      hero={{
        icon: 'wallet',
        kicker: 'Link self-custody',
        title: 'Connect in seconds',
        text: 'Connect a wallet to deposit crypto, verify holdings, and manage on-chain transfers.',
      }}
      metrics={[
        { label: 'Linked Wallets', value: '1', meta: 'MetaMask' },
        { label: 'Networks', value: '6', meta: 'Supported' },
        { label: 'Permissions', value: 'Read', meta: 'Default' },
        { label: 'Last Sync', value: '2h', meta: 'Ago' },
      ]}
      sections={sections}
      cta={{ label: 'Connect MetaMask', to: '/connect-wallet' }}
    />
  )
}

export default ConnectWallet
