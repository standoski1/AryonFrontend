"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import type { Recommendation, AvailableTags } from "@/types"
import { useAuth } from "@/contexts/auth-context"
import { useFilters } from "@/contexts/filter-context"
import { API_URL, ENDPOINTS } from "@/lib/config"

export function useRecommendations(isArchived = false) {
  const { user, isLoading: authLoading } = useAuth()
  const { filters } = useFilters()
  const router = useRouter()
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [cursor, setCursor] = useState<string | null>(null)
  const [totalItems, setTotalItems] = useState(0)
  const [availableTags, setAvailableTags] = useState<AvailableTags>({
    frameworks: [],
    reasons: [],
    providers: [],
    classes: [],
  })

  // Use ref to track previous filters to prevent unnecessary re-fetches
  const prevFiltersRef = useRef<string>("")
  const isInitialMount = useRef(true)

  const fetchRecommendations = useCallback(
    async (reset = false, customCursor?: string | null) => {
      if (!user?.token) {
        router.push("/login")
        return
      }

      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams()
        const currentCursor = customCursor !== undefined ? customCursor : cursor

        if (currentCursor) params.append("cursor", currentCursor)
        params.append("limit", "10")

        if (filters.search) params.append("search", filters.search)

        const tags = [...filters.frameworks, ...filters.providers, ...filters.classes, ...filters.reasons]
        if (tags.length > 0) {
          params.append("tags", tags.join(","))
        }

        const endpoint = isArchived
          ? `${API_URL}/recommendations/archive?${params.toString()}`
          : `${API_URL}${ENDPOINTS.recommendations}?${params.toString()}`

        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch recommendations: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()

        if (reset) {
          setRecommendations(data.data)
        } else {
          const uniqueRecommendations = new Map(
            [...recommendations, ...data.data].map(rec => [rec.recommendationId, rec])
          )
          setRecommendations(Array.from(uniqueRecommendations.values()))
        }

        setHasMore(!!(data.pagination && data.pagination.cursor && data.pagination.cursor.next))
        setCursor(data.pagination && data.pagination.cursor ? data.pagination.cursor.next : null)
        setTotalItems(data.pagination && typeof data.pagination.totalItems === 'number' ? data.pagination.totalItems : 0)
        setAvailableTags(data.availableTags || { frameworks: [], reasons: [], providers: [], classes: [] })
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching recommendations")
      } finally {
        setLoading(false)
      }
    },
    [
      user?.token,
      cursor,
      filters.search,
      filters.frameworks,
      filters.providers,
      filters.classes,
      filters.reasons,
      isArchived,
      recommendations,
      router,
    ],
  )

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchRecommendations(false)
    }
  }, [loading, hasMore, fetchRecommendations])

  const refresh = useCallback(() => {
    setCursor(null)
    setRecommendations([])
    setHasMore(true)
    fetchRecommendations(true, null)
  }, [fetchRecommendations])

  const archiveRecommendation = useCallback(
    async (id: string) => {
      if (!user?.token) {
        router.push("/login")
        return
      }

      try {
        const response = await fetch(`${API_URL}${ENDPOINTS.archive(id)}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })

        if (!response.ok) {
          throw new Error(`Failed to archive recommendation: ${response.status} ${response.statusText}`)
        }

        if (response.ok) {
          setRecommendations((prev) => prev.filter((rec) => rec.recommendationId !== id))
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to archive recommendation")
        throw err
      }
    },
    [user?.token, router],
  )

  const unarchiveRecommendation = useCallback(
    async (id: string) => {
      if (!user?.token) {
        router.push("/login")
        return
      }

      try {
        const response = await fetch(`${API_URL}${ENDPOINTS.unarchive(id)}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })

        if (!response.ok) {
          throw new Error(`Failed to unarchive recommendation: ${response.status} ${response.statusText}`)
        }

        if (response.ok) {
          setRecommendations((prev) => prev.filter((rec) => rec.recommendationId !== id))
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to unarchive recommendation")
        throw err
      }
    },
    [user?.token, router],
  )

  // Only fetch when filters actually change and user is authenticated
  useEffect(() => {
    if (authLoading) return
    if (!user?.token) {
      router.push("/login")
      return
    }

    const currentFiltersString = JSON.stringify({
      search: filters.search,
      frameworks: filters.frameworks,
      providers: filters.providers,
      classes: filters.classes,
      reasons: filters.reasons,
      isArchived,
    })

    // Skip if filters haven't changed (except on initial mount)
    if (!isInitialMount.current && prevFiltersRef.current === currentFiltersString) {
      return
    }

    prevFiltersRef.current = currentFiltersString
    isInitialMount.current = false

    // Reset and fetch new data
    setCursor(null)
    setRecommendations([])
    setHasMore(true)
    fetchRecommendations(true, null)
  }, [
    user?.token,
    authLoading,
    filters.search,
    filters.frameworks,
    filters.providers,
    filters.classes,
    filters.reasons,
    isArchived,
    fetchRecommendations,
    router,
  ])

  return {
    recommendations,
    loading,
    error,
    hasMore,
    totalItems,
    availableTags,
    loadMore,
    refresh,
    archiveRecommendation,
    unarchiveRecommendation,
  }
}
