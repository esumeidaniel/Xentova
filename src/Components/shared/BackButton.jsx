import { useNavigate } from 'react-router-dom'

function BackButton({ fallback = '/home', className = 'icon-shell', label = 'Back', children }) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }

    navigate(fallback)
  }

  return (
    <button className={className} type="button" aria-label={label} onClick={handleBack}>
      {children || (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      )}
    </button>
  )
}

export default BackButton
