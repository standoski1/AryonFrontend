"use client"

import type { Recommendation } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { PROVIDERS } from "@/types"
import { ProviderIcon, TriangleIcon, CubeIcon, AwsLogoIcon } from "@/components/ui/provider-icons"

interface RecommendationCardProps {
  recommendation: Recommendation
  onArchive: (id: string) => void
  onUnarchive: (id: string) => void
  onClick: (recommendation: Recommendation) => void
  isArchived?: boolean
}

export function RecommendationCard({
  recommendation,
  onArchive,
  onUnarchive,
  onClick,
  isArchived = false,
}: RecommendationCardProps) {
  const getValueScoreBars = (score: number) => {
    // Convert score (0-100) to number of filled bars (0-4)
    const filledBars = Math.round((score / 100) * 4)
    return Array.from({ length: 4 }, (_, i) => i < filledBars)
  }

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-lg border-0 shadow-sm overflow-hidden",
        isArchived
          ? "bg-card/60 dark:bg-card/40" // Better archived styling for dark mode
          : "bg-card",
      )}
      onClick={() => onClick(recommendation)}
    >
      <CardContent className="p-0">
        <div className="flex items-stretch">
          {/* Left Icon Section - Single Cube Icon */}
          <div
            className={cn(
              "w-48 flex items-center justify-center flex-shrink-0",
              isArchived
                ? "bg-muted dark:bg-muted/80" // Better muted color for dark mode
                : "bg-brand-500",
            )}
          >
            <CubeIcon
              className={cn(
                "w-12 h-12",
                isArchived
                  ? "text-muted-foreground dark:text-muted-foreground/80" // Better icon color for archived
                  : "text-white",
              )}
              alt="Recommendation"
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start">
              {/* Left Content */}
              <div className="flex-1 pr-8">
                {/* Title and Provider Icons */}
                <div className="flex items-start justify-between mb-3">
                  <h3
                    className={cn(
                      "text-xl font-semibold",
                      isArchived
                        ? "text-foreground/70 dark:text-foreground/80" // Better text contrast for archived
                        : "text-foreground",
                    )}
                  >
                    {recommendation.title}
                  </h3>

                  {/* Cloud Provider Icons - Top Right */}
                  <div className="flex items-center space-x-3 ml-4">
                    {recommendation.provider.map((providerId) => {
                      const provider = PROVIDERS[providerId]
                      if (provider.name === "AWS") {
                        return (
                          <div key={providerId} className="flex items-center space-x-2">
                            <ProviderIcon
                              provider="aws"
                              className={cn("w-6 h-6", isArchived ? "opacity-60 dark:opacity-70" : "")}
                            />
                            <AwsLogoIcon className={cn("h-4", isArchived ? "opacity-60 dark:opacity-70" : "")} />
                          </div>
                        )
                      } else if (provider.name === "AZURE") {
                        return (
                          <div key={providerId} className="flex items-center space-x-2">
                            <ProviderIcon
                              provider="azure"
                              className={cn(
                                "w-6 h-6",
                                isArchived
                                  ? "text-muted-foreground/70 dark:text-muted-foreground/80"
                                  : "text-muted-foreground dark:text-muted-foreground",
                              )}
                            />
                            <span
                              className={cn(
                                "text-sm font-medium",
                                isArchived
                                  ? "text-muted-foreground/80 dark:text-muted-foreground/90"
                                  : "text-muted-foreground",
                              )}
                            >
                              {provider.name}
                            </span>
                          </div>
                        )
                      }
                      return null
                    })}
                    {/* Use the correct triangular icon */}
                    <TriangleIcon
                      className={cn(
                        "w-5 h-5",
                        isArchived ? "text-muted-foreground/70 dark:text-muted-foreground/80" : "text-muted-foreground",
                      )}
                      alt="Warning"
                    />
                  </div>
                </div>

                <p
                  className={cn(
                    "text-base leading-relaxed mb-4",
                    isArchived
                      ? "text-muted-foreground/80 dark:text-muted-foreground/90" // Better description contrast
                      : "text-muted-foreground",
                  )}
                >
                  {recommendation.description}
                </p>

                {/* Tags - Bottom of left section */}
                <div className="flex flex-wrap gap-2">
                  {recommendation.reasons.slice(0, 1).map((reason, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className={cn("text-xs", isArchived && "opacity-70 dark:opacity-80")}
                    >
                      {reason}
                    </Badge>
                  ))}
                  {recommendation.frameworks.slice(0, 5).map((framework, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className={cn("text-xs", isArchived && "opacity-70 dark:opacity-80")}
                    >
                      {framework.name}
                    </Badge>
                  ))}
                  {recommendation.frameworks.length > 5 && (
                    <Badge variant="secondary" className={cn("text-xs", isArchived && "opacity-70 dark:opacity-80")}>
                      +{recommendation.frameworks.length - 5}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Right Side - Impact Assessment */}
              <div className="min-w-[200px] text-right">
                <div className="mb-4">
                  <h4
                    className={cn(
                      "text-base font-semibold mb-1",
                      isArchived ? "text-foreground/70 dark:text-foreground/80" : "text-foreground",
                    )}
                  >
                    Impact assessment
                  </h4>
                  <p
                    className={cn(
                      "text-sm",
                      isArchived ? "text-muted-foreground/80 dark:text-muted-foreground/90" : "text-muted-foreground",
                    )}
                  >
                    ~{recommendation.impactAssessment.totalViolations} Violations / month
                  </p>
                </div>

                <div>
                  <h4
                    className={cn(
                      "text-base font-semibold mb-2",
                      isArchived ? "text-foreground/70 dark:text-foreground/80" : "text-foreground",
                    )}
                  >
                    Value score
                  </h4>
                  <div className="flex justify-end space-x-1">
                    {getValueScoreBars(recommendation.score).map((filled, index) => (
                      <div
                        key={index}
                        className={cn(
                          "w-4 h-4 rounded-sm",
                          filled
                            ? isArchived
                              ? "bg-brand-400/60 dark:bg-brand-400/70" // Better archived score bars
                              : "bg-brand-500"
                            : "bg-muted",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
