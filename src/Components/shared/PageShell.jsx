import ButtomNavbar from '../Buttom-navbar.jsx'
import Sidebar from './Sidebar.jsx'
import './PageShell.css'

function PageShell({ title, eyebrow, actions, children, className = '' }) {
  return (
    <main className={`page-shell ${className}`}>
      <section className="page-shell-app">
        <Sidebar />
        <div className="page-shell-content">
          <header className="page-shell-header">
            <div>
              {eyebrow ? <p>{eyebrow}</p> : null}
              <h1>{title}</h1>
            </div>
            {actions ? <div className="page-shell-actions">{actions}</div> : null}
          </header>
          <div className="page-shell-body">
            {children}
          </div>
        </div>
      </section>
      <ButtomNavbar />
    </main>
  )
}

export default PageShell
