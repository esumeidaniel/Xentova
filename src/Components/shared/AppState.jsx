import './AppState.css'

export function EmptyState({ title, message, action }) {
  return (
    <div className="app-state app-state--empty">
      <span aria-hidden="true">--</span>
      <strong>{title}</strong>
      <p>{message}</p>
      {action}
    </div>
  )
}

export function LoadingState({ title = 'Loading', message = 'Fetching the latest data...' }) {
  return (
    <div className="app-state app-state--loading" role="status" aria-live="polite">
      <span aria-hidden="true" />
      <strong>{title}</strong>
      <p>{message}</p>
    </div>
  )
}

export function ErrorState({ title = 'Something went wrong', message, action }) {
  return (
    <div className="app-state app-state--error" role="alert">
      <span aria-hidden="true">!</span>
      <strong>{title}</strong>
      <p>{message}</p>
      {action}
    </div>
  )
}

export function SuccessState({ title = 'Success', message, action }) {
  return (
    <div className="app-state app-state--success" role="status">
      <span aria-hidden="true">OK</span>
      <strong>{title}</strong>
      <p>{message}</p>
      {action}
    </div>
  )
}
