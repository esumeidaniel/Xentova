import './Header.css'

function Header({ title, eyebrow, actions }) {
  return (
    <header className="shared-header">
      <div>
        {eyebrow ? <p>{eyebrow}</p> : null}
        <h1>{title}</h1>
      </div>
      {actions ? <div className="shared-header-actions">{actions}</div> : null}
    </header>
  )
}

export default Header
