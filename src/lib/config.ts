// API Configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://aronserver-2.onrender.com'

// Authentication Configuration
export const AUTH_COOKIE_NAME = 'aryon_token'
export const USER_COOKIE_NAME = 'aryon_user'
export const TOKEN_EXPIRY_DAYS = 7

// Feature Flags
export const USE_AUTH = process.env.NEXT_PUBLIC_USE_AUTH === 'true'

// API Endpoints
export const ENDPOINTS = {
  recommendations: '/recommendations',
  login: '/login',
  archive: (id: string) => `/recommendations/${id}/archive`,
  unarchive: (id: string) => `/recommendations/${id}/unarchive`,
}
