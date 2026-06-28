export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function isPositiveAmount(value) {
  return Number(value) > 0
}

export function isCardExpiry(value) {
  return /^(0[1-9]|1[0-2])\/\d{2}$/.test(value)
}
