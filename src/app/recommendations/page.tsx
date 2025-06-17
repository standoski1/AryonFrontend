"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ProtectedRoute } from "@/components/ui/protected-route"
import { Sidebar } from "@/components/layout/sidebar"
import { MobileHeader } from "@/components/layout/mobile-header"
import { RecommendationCard } from "@/components/recommendations/recommendation-card"
import { RecommendationDetail } from "@/components/recommendations/recommendation-detail"
import { SearchFilter } from "@/components/recommendations/search-filter"
import { useRecommendations } from "@/hooks/use-recommendations"
import { FilterProvider } from "@/contexts/filter-context"
import { useToast } from "@/hooks/use-toast"
import type { Recommendation } from "@/types"
import { Archive, Plus } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Sparkles } from "lucide-react"
import { SimpleIcon } from "@/components/ui/provider-icons"

function RecommendationsContent() {
  const {
    recommendations,
    loading,
    error,
    hasMore,
    totalItems,
    availableTags,
    loadMore,
    archiveRecommendation,
    unarchiveRecommendation,
  } = useRecommendations()

  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const { toast } = useToast()

  // Infinite scroll
  const lastRecommendationElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return
      if (observerRef.current) observerRef.current.disconnect()
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore()
        }
      })
      if (node) observerRef.current.observe(node)
    },
    [loading, hasMore, loadMore],
  )

  const handleSearch = () => {
  }

  const handleArchive = async (id: string) => {
    await archiveRecommendation(id)
    toast({
      title: "Recommendation archived",
      description: "The recommendation has been moved to the archive.",
      variant: "success",
    })
    setSelectedRecommendation(null)
  }

  const handleUnarchive = async (id: string) => {
    await unarchiveRecommendation(id)
    toast({
      title: "Recommendation unarchived",
      description: "The recommendation has been restored from the archive.",
      variant: "success",
    })
    setSelectedRecommendation(null)
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-destructive mb-4">Error: {error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#f2f3f4] dark:bg-[#1d222a]">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <MobileHeader title="Recommendations" />

        {/* Desktop Header */}
        <div className="hidden md:block bg-background border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-foreground">Recommendations</h1>
              <SimpleIcon
                icon={Sparkles}
                className="w-6 h-6 text-brand-500"
                alt="Sparkles Icon"
              />
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Link href="/recommendations/archive">
                <Button variant="outline" size="sm">
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-6">
            {/* Search and Filter */}
        <SearchFilter availableTags={availableTags} onSearch={handleSearch} totalResults={totalItems} currentCount={recommendations?.length}/>

            {/* Recommendations List */}
            <div className="mt-6 space-y-4">
              {recommendations.map((recommendation, index) => (
                <div
                  key={recommendation.recommendationId}
                  ref={index === recommendations.length - 1 ? lastRecommendationElementRef : null}
                >
                  <RecommendationCard
                    recommendation={recommendation}
                    onArchive={handleArchive}
                    onUnarchive={handleUnarchive}
                    onClick={setSelectedRecommendation}
                  />
                </div>
              ))}

              {loading && (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
                </div>
              )}

              {!hasMore && recommendations.length > 0 && (
                <div className="text-center py-8 text-muted-foreground">No more recommendations to load</div>
              )}

              {!loading && recommendations.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No recommendations found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedRecommendation && (
        <RecommendationDetail
          recommendation={selectedRecommendation}
          onClose={() => setSelectedRecommendation(null)}
          onArchive={handleArchive}
          onUnarchive={handleUnarchive}
        />
      )}
    </div>
  )
}

export default function RecommendationsPage() {
  return (
    <ProtectedRoute>
      <FilterProvider>
        <RecommendationsContent />
      </FilterProvider>
    </ProtectedRoute>
  )
}
