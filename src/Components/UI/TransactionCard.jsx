import './TransactionCard.css'

function TransactionCard({ title, detail, amount, status, positive = true }) {
  return (
    <article className="transaction-card">
      <div>
        <strong>{title}</strong>
        <p>{detail}</p>
      </div>
      <div>
        <strong className={positive ? 'positive' : 'negative'}>{amount}</strong>
        <em>{status}</em>
      </div>
    </article>
  )
}

export default TransactionCard
