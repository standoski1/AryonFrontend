"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { API_URL } from "@/lib/config"
import { getTimeUntilExpiry } from "@/lib/jwt"
import { setCookie, getCookie, deleteCookie } from "@/lib/utils"
import type { User } from "@/types"

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = getCookie("aryon_token")
    const userData = getCookie("aryon_user")

    let cleanupTimer: NodeJS.Timeout | null = null

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        const timeUntilExpiry = getTimeUntilExpiry(token)

        if (timeUntilExpiry > 0) {
          setUser({ ...parsedUser, token })
          cleanupTimer = setTimeout(logout, timeUntilExpiry)
        } else {
          // Token already expired
          logout()
        }
      } catch {
        // Invalid token or user data
        logout()
      }
    }
    
    setIsLoading(false)

    return () => {
      if (cleanupTimer) {
        clearTimeout(cleanupTimer)
      }
    }
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        const userData = {
          id: "1",
          username,
          token: data.token,
        }

        const timeUntilExpiry = getTimeUntilExpiry(data.token)
        if (timeUntilExpiry > 0) {
          setUser(userData)
          setCookie("aryon_token", data.token)
          setCookie("aryon_user", JSON.stringify({ id: "1", username }))
          setTimeout(logout, timeUntilExpiry)
          return true
        }
      }
      return false
    } catch {
      return false
    }
  }

  const logout = () => {
    setUser(null)
    deleteCookie("aryon_token")
    deleteCookie("aryon_user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      <div role="status" aria-live="polite" className="sr-only">
        {isLoading ? "Checking authentication..." : user ? "Authenticated" : "Not authenticated"}
      </div>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
