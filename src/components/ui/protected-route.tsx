"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()


  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div 
        role="alert" 
        aria-busy="true" 
        aria-label="Loading authentication status"
        className="flex items-center justify-center min-h-screen"
      >
        <div 
          className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"
          role="progressbar"
          aria-label="Loading"
        />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div role="main" aria-label="Protected content">
      {children}
    </div>
  )
}
