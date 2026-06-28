import './Input.css'

function Input({ label, error, helper, ...props }) {
  return (
    <label className="ui-input">
      {label ? <span>{label}</span> : null}
      <input aria-invalid={Boolean(error)} {...props} />
      {error ? <em>{error}</em> : helper ? <small>{helper}</small> : null}
    </label>
  )
}

export default Input
