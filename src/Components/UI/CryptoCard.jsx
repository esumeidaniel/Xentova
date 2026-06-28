import './CryptoCard.css'

function CryptoCard({ token, name, meta, value, change, negative = false }) {
  return (
    <article className="crypto-card">
      <span>{token}</span>
      <div>
        <strong>{name}</strong>
        <p>{meta}</p>
      </div>
      <div>
        <strong>{value}</strong>
        <em className={negative ? 'negative' : ''}>{change}</em>
      </div>
    </article>
  )
}

export default CryptoCard
