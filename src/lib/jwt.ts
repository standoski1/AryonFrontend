
export function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch {
    return null
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = parseJwt(token)
  if (!payload?.exp) return true
  return payload.exp * 1000 < Date.now()
}

/**
 * Get the expiry time of a JWT token in milliseconds
 */
export function getTokenExpiry(token: string): number | null {
  const payload = parseJwt(token)
  if (!payload?.exp) return null
  return payload.exp * 1000
}

/**
 * Calculate time until token expires in milliseconds
 */
export function getTimeUntilExpiry(token: string): number {
  const expiry = getTokenExpiry(token)
  if (!expiry) return 0
  return Math.max(0, expiry - Date.now())
} 