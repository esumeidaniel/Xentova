export const apiStatus = {
  mode: 'frontend-demo',
  backendConnected: false,
}

export async function demoDelay(value, delay = 250) {
  await new Promise((resolve) => window.setTimeout(resolve, delay))
  return value
}
