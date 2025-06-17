"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ProtectedRoute } from "@/components/ui/protected-route"
import { Sidebar } from "@/components/layout/sidebar"
import { MobileHeader } from "@/components/layout/mobile-header"
import { RecommendationCard } from "@/components/recommendations/recommendation-card"
import { RecommendationDetail } from "@/components/recommendations/recommendation-detail"
import { SearchFilter } from "@/components/recommendations/search-filter"
import { useRecommendations } from "@/hooks/use-recommendations"
import { FilterProvider } from "@/contexts/filter-context"
import type { Recommendation } from "@/types"
import { ArrowLeft, Archive } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useToast } from "@/hooks/use-toast"

function ArchiveContent() {
  const { recommendations, loading, error, totalItems, availableTags, archiveRecommendation, unarchiveRecommendation } =
    useRecommendations(true)

  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null)
  const { toast } = useToast();

  const handleSearch = () => {
  }

  // Close modal and show toast on unarchive
  const handleUnarchive = async (id: string) => {
    await unarchiveRecommendation(id);
    setSelectedRecommendation(null);
    toast({
      title: "Recommendation unarchived",
      description: "The recommendation has been restored from the archive.",
      variant: "success",
    });
  };

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
        <MobileHeader title="Archive" />

        {/* Desktop Header */}
        <div className="hidden md:block bg-background border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/recommendations">
                <Button variant="ghost" size="sm" data-testid="back-link">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                  <span>Recommendations</span>
                  <span>{">"}</span>
                  <span>Archive</span>
                </div>
                <h1 className="text-2xl font-semibold text-foreground flex items-center">
                  Recommendations Archive
                  <Archive className="w-5 h-5 ml-2 text-muted-foreground" />
                </h1>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-background">
          <div className="p-4 md:p-6">
            {/* Search and Filter */}
            <SearchFilter availableTags={availableTags} onSearch={handleSearch} totalResults={totalItems} currentCount={recommendations?.length}/>

            {/* Archived Recommendations List */}
            <div className="mt-6 space-y-4">
              {recommendations.map((recommendation) => (
                <RecommendationCard
                  key={recommendation.recommendationId}
                  recommendation={recommendation}
                  onArchive={archiveRecommendation}
                  onUnarchive={handleUnarchive}
                  onClick={setSelectedRecommendation}
                  isArchived={true}
                />
              ))}

              {loading && (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
                </div>
              )}

              {!loading && recommendations.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No archived recommendations found</p>
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
          onArchive={archiveRecommendation}
          onUnarchive={handleUnarchive}
          isArchived={true}
        />
      )}
    </div>
  )
}

export default function ArchivePage() {
  return (
    <ProtectedRoute>
      <FilterProvider>
        <ArchiveContent />
      </FilterProvider>
    </ProtectedRoute>
  )
}
