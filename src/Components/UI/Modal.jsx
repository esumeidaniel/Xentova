import './Modal.css'

function Modal({ open, title, children, onClose }) {
  if (!open) return null

  return (
    <div className="ui-modal-backdrop" role="presentation" onClick={onClose}>
      <section className="ui-modal" role="dialog" aria-modal="true" aria-label={title} onClick={(event) => event.stopPropagation()}>
        <header>
          <h2>{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close">x</button>
        </header>
        {children}
      </section>
    </div>
  )
}

export default Modal
