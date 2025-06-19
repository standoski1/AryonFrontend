"use client"

import type { Recommendation } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CubeIcon } from "@/components/ui/provider-icons"
import { CloudProviderDisplay, ValueScoreBars } from "@/components/ui/provider-icon-utils"

interface RecommendationCardProps {
  recommendation: Recommendation
  onArchive: (id: string) => void
  onUnarchive: (id: string) => void
  onClick: (recommendation: Recommendation) => void
  isArchived?: boolean
}

export function RecommendationCard({
  recommendation,
  onClick,
  isArchived = false,
}: RecommendationCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-lg border-0 shadow-sm overflow-hidden",
        "bg-card/60 dark:bg-[#23272e] border border-muted-foreground/10"
      )}
      onClick={() => onClick(recommendation)}
    >
      <CardContent className="p-0">
        {/* Mobile Layout */}
        <div className="block max-[920px]:block min-[920px]:hidden">
          <div className="p-3">
            {/* Mobile Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                    isArchived ? "bg-muted dark:bg-muted/80" : "bg-brand-500",
                  )}
                >
                  <CubeIcon
                    className={cn(
                      "w-4 h-4",
                      isArchived ? "text-muted-foreground dark:text-muted-foreground/80" : "text-white",
                    )}
                    alt="Recommendation"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className={cn(
                      "text-sm font-semibold leading-tight line-clamp-2",
                      isArchived ? "text-foreground/70 dark:text-foreground/80" : "text-foreground",
                    )}
                  >
                    {recommendation.title}
                  </h3>
                </div>
              </div>

              {/* Mobile Provider Icons */}
              <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
                <CloudProviderDisplay isArchived={isArchived} />
              </div>
            </div>

            {/* Mobile Description */}
            <p
              className={cn(
                "text-xs leading-relaxed mb-3 line-clamp-3",
                isArchived ? "text-muted-foreground/80 dark:text-muted-foreground/90" : "text-muted-foreground",
              )}
            >
              {recommendation.description}
            </p>

            {/* Mobile Impact and Score */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <p
                  className={cn(
                    "text-xs font-medium",
                    isArchived ? "text-foreground/70 dark:text-foreground/80" : "text-foreground",
                  )}
                >
                  Impact: ~{recommendation.impactAssessment.totalViolations} violations/mo
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <span
                  className={cn(
                    "text-xs font-medium mr-1",
                    isArchived ? "text-foreground/70 dark:text-foreground/80" : "text-foreground",
                  )}
                >
                  Score:
                </span>
                <ValueScoreBars 
                  score={recommendation.score} 
                  maxBars={4} 
                  barClassName="w-2.5 h-2.5 rounded-[2px]"
                />
              </div>
            </div>

            {/* Mobile Tags */}
            <div className="flex flex-wrap gap-1">
              {recommendation.reasons.slice(0, 1).map((reason, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={cn("text-[10px] px-1.5 py-0.5", isArchived && "opacity-70 dark:opacity-80")}
                >
                  {reason}
                </Badge>
              ))}
              {recommendation.frameworks.slice(0, 2).map((framework, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={cn("text-[10px] px-1.5 py-0.5", isArchived && "opacity-70 dark:opacity-80")}
                >
                  {framework.name}
                </Badge>
              ))}
              {recommendation.frameworks.length > 2 && (
                <Badge 
                  variant="secondary" 
                  className={cn("text-[10px] px-1.5 py-0.5", isArchived && "opacity-70 dark:opacity-80")}
                >
                  +{recommendation.frameworks.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden min-[920px]:flex items-stretch">
          {/* Left Icon Section - Single Cube Icon */}
          <div
            className={cn(
              "w-48 flex items-center justify-center flex-shrink-0",
              isArchived ? "bg-muted dark:bg-muted/80" : "bg-brand-500",
            )}
          >
            <CubeIcon
              className={cn(
                "w-12 h-12",
                isArchived ? "text-muted-foreground dark:text-muted-foreground/80" : "text-white",
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
                      isArchived ? "text-foreground/70 dark:text-foreground/80" : "text-foreground",
                    )}
                  >
                    {recommendation.title}
                  </h3>

                  {/* Cloud Provider Icons - Top Right */}
                  <div className="flex items-center space-x-3 ml-4">
                    <CloudProviderDisplay isArchived={isArchived} />
                  </div>
                </div>

                <p
                  className={cn(
                    "text-base leading-relaxed mb-4",
                    isArchived ? "text-muted-foreground/80 dark:text-muted-foreground/90" : "text-muted-foreground",
                  )}
                >
                  {recommendation.description}
                </p>

                {/* Tags - Bottom of left section */}
                <div className="flex flex-wrap gap-2 mt-2">
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
                    <Badge variant="secondary" className={cn("text-xs", isArchived && "opacity-70 dark:opacity-80")}>+{recommendation.frameworks.length - 5}</Badge>
                  )}
                </div>
              </div>

              {/* Right Side - Impact Assessment */}
              <div className={cn(
                "min-w-[200px] text-right p-[12px] rounded-[5px]",
                "bg-muted dark:bg-[#2d323b]"
                  
              )}>
                <div className="mb-4">
                  <h4
                    className={cn(
                      "text-base font-semibold mb-1",
                      isArchived ? "text-foreground/70 dark:text-white" : "text-foreground dark:text-white"
                    )}
                  >
                    Impact assessment
                  </h4>
                  <p
                    className={cn(
                      "text-sm",
                      isArchived ? "text-muted-foreground/80 dark:text-white/80" : "text-muted-foreground dark:text-white/80"
                    )}
                  >
                    ~{recommendation.impactAssessment.totalViolations} Violations / month
                  </p>
                </div>
                <hr className="mt-[-5px] mb-2 text-[#ccc]"/>
                <div>
                  <h4
                    className={cn(
                      "text-base font-semibold mb-2",
                      isArchived ? "text-foreground/70 dark:text-white" : "text-foreground dark:text-white"
                    )}
                  >
                    Value score
                  </h4>
                  <div className="flex justify-end space-x-1">
                    <ValueScoreBars 
                      score={recommendation.score} 
                      maxBars={4} 
                      barClassName="w-4 h-4 rounded-[2px]"
                    />
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
