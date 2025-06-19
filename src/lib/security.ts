
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return ''
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Validate and sanitize search input
 */
export function sanitizeSearchInput(input: string): string {
  const sanitized = sanitizeInput(input.trim())
  // Limit length to prevent abuse
  return sanitized.slice(0, 100)
}

/**
 * Generate a CSRF token for API calls
 */
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

/**
 * Add CSRF protection to fetch requests
 */
export function createSecureFetch(baseUrl: string) {
  const csrfToken = generateCSRFToken()
  
  return async (endpoint: string, options: RequestInit = {}) => {
    const url = `${baseUrl}${endpoint}`
    
    // Add CSRF token to headers for state-changing requests
    const headers = {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
      ...options.headers,
    }
    
    return fetch(url, {
      ...options,
      headers,
    })
  }
}

/**
 * Validate JWT token expiry
 */
export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Date.now() / 1000
    return payload.exp < currentTime
  } catch {
    return true
  }
}

/**
 * Get token expiry time in milliseconds
 */
export function getTokenExpiry(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 // Convert to milliseconds
  } catch {
    return null
  }
}

/**
 * Calculate time until token expires in milliseconds
 */
export function getTimeUntilExpiry(token: string): number {
  const expiry = getTokenExpiry(token)
  if (!expiry) return 0
  return Math.max(0, expiry - Date.now())
} 