"use client"

import type { Recommendation } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CubeIcon } from "@/components/ui/provider-icons"
import Image from "next/image"

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
  const getValueScoreBars = (score: number) => {
    // Convert score (0-100) to number of filled bars (0-4)
    const filledBars = Math.round((score / 100) * 4)
    return Array.from({ length: 4 }, (_, i) => i < filledBars)
  }

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
        <div className="block md:hidden">
          <div className="p-4">
            {/* Mobile Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                    isArchived ? "bg-muted dark:bg-muted/80" : "bg-brand-500",
                  )}
                >
                  <CubeIcon
                    className={cn(
                      "w-5 h-5",
                      isArchived ? "text-muted-foreground dark:text-muted-foreground/80" : "text-white",
                    )}
                    alt="Recommendation"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className={cn(
                      "text-sm md:text-lg font-semibold leading-tight",
                      isArchived ? "text-foreground/70 dark:text-foreground/80" : "text-foreground",
                    )}
                  >
                    {recommendation.title}
                  </h3>
                </div>
              </div>

              {/* Mobile Provider Icons */}
              <div className="flex items-center space-x-2 ml-2">
                <Image src="/cloud.png" height={70} width={110} alt="cloud"/>
                {/* {recommendation.provider.map((providerId) => {
                  const provider = PROVIDERS[providerId]
                  if (provider.name === "AWS") {
                    return (
                      <div key={providerId} className="flex items-center space-x-1">
                        <ProviderIcon
                          provider="aws"
                          className={cn("w-4 h-4", isArchived ? "opacity-60 dark:opacity-70" : "")}
                        />
                        <AwsLogoIcon className={cn("h-3", isArchived ? "opacity-60 dark:opacity-70" : "")} />
                      </div>
                    )
                  } else if (provider.name === "AZURE") {
                    return (
                      <div key={providerId} className="flex items-center space-x-1">
                        <ProviderIcon
                          provider="azure"
                          className={cn(
                            "w-4 h-4",
                            isArchived
                              ? "text-muted-foreground/70 dark:text-muted-foreground/80"
                              : "text-muted-foreground dark:text-muted-foreground",
                          )}
                        />
                      </div>
                    )
                  }
                  return null
                })} */}
              </div>
            </div>

            {/* Mobile Description */}
            <p
              className={cn(
                "text-sm leading-relaxed mb-4",
                isArchived ? "text-muted-foreground/80 dark:text-muted-foreground/90" : "text-muted-foreground",
              )}
            >
              {recommendation.description}
            </p>

            {/* Mobile Impact and Score */}
            <div className="flex items-center justify-between mb-4">
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
                    "text-xs font-medium mr-2",
                    isArchived ? "text-foreground/70 dark:text-foreground/80" : "text-foreground",
                  )}
                >
                  Score:
                </span>
                {getValueScoreBars(recommendation.score).map((filled, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-3 h-3 rounded-[2px]",
                      filled ? "bg-brand-400" : "bg-[#d4d4d4]",
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Mobile Tags */}
            <div className="flex flex-wrap gap-1">
              {recommendation.reasons.slice(0, 1).map((reason, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={cn("text-xs", isArchived && "opacity-70 dark:opacity-80")}
                >
                  {reason}
                </Badge>
              ))}
              {recommendation.frameworks.slice(0, 3).map((framework, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={cn("text-xs", isArchived && "opacity-70 dark:opacity-80")}
                >
                  {framework.name}
                </Badge>
              ))}
              {recommendation.frameworks.length > 3 && (
                <Badge variant="secondary" className={cn("text-xs", isArchived && "opacity-70 dark:opacity-80")}>
                  +{recommendation.frameworks.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-stretch">
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
                    <Image src="/cloud.png" height={70} width={110} alt="cloud"/>
                    {/* {recommendation.provider.map((providerId) => {
                      const provider = PROVIDERS[providerId]
                      if (provider.name === "AWS") {
                        return (
                          <div key={providerId} className="flex items-center space-x-2">
                            <ProviderIcon
                              provider="aws"
                              className={cn("w-6 h-6", isArchived ? "opacity-60 dark:opacity-70" : "")}
                            />
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
                          </div>
                        )
                      }
                      return null
                    })} */}
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
                    {getValueScoreBars(recommendation.score).map((filled, index) => (
                      <div
                        key={index}
                        className={cn(
                          "w-4 h-4 rounded-[2px]",
                          filled ? "bg-brand-400" : "bg-[#d4d4d4]",
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
