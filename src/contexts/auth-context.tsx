"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, AuthContextType } from "@/types"
import { API_URL } from "@/lib/config"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth token on mount
    const token = localStorage.getItem("aryon_token")
    const userData = localStorage.getItem("aryon_user")

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser({ ...parsedUser, token })
      } catch {
        localStorage.removeItem("aryon_token")
        localStorage.removeItem("aryon_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const data = await response.json()
        const userData = {
          id: "1",
          username,
          token: data.token,
        }

        setUser(userData)
        localStorage.setItem("aryon_token", data.token)
        localStorage.setItem("aryon_user", JSON.stringify({ id: "1", username }))
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("aryon_token")
    localStorage.removeItem("aryon_user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
