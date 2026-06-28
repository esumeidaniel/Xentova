import './Card.css'

function Card({ title, action, children, className = '' }) {
  return (
    <section className={`ui-card ${className}`}>
      {(title || action) ? (
        <header>
          {title ? <h2>{title}</h2> : null}
          {action}
        </header>
      ) : null}
      {children}
    </section>
  )
}

export default Card
