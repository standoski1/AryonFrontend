"use client"

import type { Recommendation } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Archive, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { PROVIDERS, RECOMMENDATION_CLASSES } from "@/types"
import {
  TriangleIcon,
  MultiCubeIcon,
  BookIcon,
  LockIcon,
  ClipboardIcon,
  BarChartIcon,
} from "@/components/ui/provider-icons"

interface RecommendationDetailProps {
  recommendation: Recommendation
  onClose: () => void
  onArchive: (id: string) => void
  onUnarchive: (id: string) => void
  isArchived?: boolean
}

const getClassIcon = (classId: number) => {
  switch (classId) {
    case 1:
      return MultiCubeIcon // COMPUTE
    case 2:
      return MultiCubeIcon // NETWORKING
    case 3:
      return LockIcon // DATA_PROTECTION
    case 4:
      return ClipboardIcon // APPLICATION
    case 5:
      return LockIcon // AUTHENTICATION
    case 6:
      return BookIcon // COMPLIANCE
    default:
      return MultiCubeIcon // Use the multi-cube icon as default
  }
}

export function RecommendationDetail({
  recommendation,
  onClose,
  onArchive,
  onUnarchive,
  isArchived = false,
}: RecommendationDetailProps) {
  const getValueScoreBars = (score: number) => {
    // Convert score (0-100) to number of filled bars (0-4)
    const filledBars = Math.round((score / 100) * 4)
    return Array.from({ length: 4 }, (_, i) => i < filledBars)
  }

  const ClassIcon = getClassIcon(recommendation.class)
  const classInfo = RECOMMENDATION_CLASSES[recommendation.class]

  return (
    <>
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Detail Panel */}
      <div data-testid="recommendation-detail" className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-background shadow-2xl border-l border-border z-50 overflow-y-auto">
        <div className="p-4 md:p-6">
          {/* Header - Multi-Cube Icon */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-3 flex-1">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <MultiCubeIcon className="w-5 h-5 md:w-6 md:h-6 text-white" alt="Recommendation Detail" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base md:text-lg font-semibold text-foreground mb-1">{recommendation.title}</h2>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-3 space-y-1 md:space-y-0">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs md:text-sm text-muted-foreground">Value score</span>
                    <div className="flex space-x-1">
                      {getValueScoreBars(recommendation.score).map((filled, index) => (
                        <div
                          key={index}
                          className={cn("w-2 h-2 md:w-2 md:h-3 rounded-sm", filled ? "bg-brand-500" : "bg-muted")}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">({recommendation.score}/100)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs md:text-sm text-muted-foreground">{classInfo?.name || "Unknown"}</span>
                    <Badge variant="outline" className="text-xs">
                      {classInfo?.priority || "Unknown"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="flex-shrink-0">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Cloud Providers */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-foreground mb-2">Cloud Providers</h3>
            <div className="flex flex-wrap gap-2">
              {recommendation.provider.map((providerId) => {
                const provider = PROVIDERS[providerId]
                return (
                  <Badge key={providerId} variant="outline" className="text-xs">
                    <span className="mr-1">{provider.icon}</span>
                    {provider.name}
                  </Badge>
                )
              })}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground leading-relaxed">{recommendation.description}</p>
          </div>

          {/* Frameworks */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-foreground mb-3">Compliance Frameworks</h3>
            <div className="space-y-2">
              {recommendation.frameworks.map((framework, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <span className="text-sm font-medium">{framework.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {framework.section}.{framework.subsection}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Affected Resources */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <MultiCubeIcon className="w-4 h-4 text-muted-foreground" alt="Resources" />
              <h3 className="text-sm font-medium text-foreground">Affected Resources</h3>
            </div>
            <div className="ml-6 space-y-1">
              {recommendation.affectedResources.map((resource, index) => (
                <p key={index} className="text-sm text-muted-foreground">
                  • {resource.name}
                </p>
              ))}
            </div>
          </div>

          {/* Reasons */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <MultiCubeIcon className="w-4 h-4 text-muted-foreground" alt="Reasons" />
              <h3 className="text-sm font-medium text-foreground">Reasons</h3>
            </div>
            <div className="ml-6 flex flex-wrap gap-2">
              {recommendation.reasons.map((reason, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {reason}
                </Badge>
              ))}
            </div>
          </div>

          {/* Impact Assessment */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <BarChartIcon className="w-4 h-4 text-muted-foreground" alt="Impact" />
              <h3 className="text-sm font-medium text-foreground">Impact Assessment</h3>
            </div>

            <div className="ml-6 space-y-4">
              {/* Headers */}
              <div className="flex items-center justify-between text-xs text-muted-foreground uppercase tracking-wide">
                <div className="flex items-center space-x-2">
                  <span>Overall</span>
                  <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Most impacted scope</span>
                  <TriangleIcon className="w-4 h-4 text-muted-foreground" alt="Warning" />
                </div>
              </div>

              {/* Violation Cards with Background and Border */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/30 border border-border rounded-lg p-4">
                  <p className="text-sm font-medium text-foreground mb-1">Violations</p>
                  <p className="text-3xl font-bold text-foreground">
                    {recommendation.impactAssessment.totalViolations}
                  </p>
                </div>
                <div className="bg-muted/30 border border-border rounded-lg p-4">
                  <p className="text-sm font-medium text-foreground mb-1">
                    {recommendation.impactAssessment.mostImpactedScope.name}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">
                    ({recommendation.impactAssessment.mostImpactedScope.type})
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {recommendation.impactAssessment.mostImpactedScope.count}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Further Reading */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-3">
              <BookIcon className="w-4 h-4 text-muted-foreground" alt="Reading" />
              <h3 className="text-sm font-medium text-foreground">Further Reading</h3>
            </div>
            <div className="ml-6 space-y-2">
              {recommendation.furtherReading.map((reading, index) => (
                <a
                  key={index}
                  href={reading.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-600 hover:text-brand-700 flex items-center"
                >
                  {reading.name}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
            <Button
              data-testid={isArchived ? "unarchive-button" : "archive-button"}
              variant="outline"
              onClick={() => {
                if (isArchived) {
                  onUnarchive(recommendation.recommendationId)
                } else {
                  onArchive(recommendation.recommendationId)
                }
              }}
              className="flex-1"
            >
              <Archive className="w-4 h-4 mr-2" />
              {isArchived ? "Unarchive" : "Archive"}
            </Button>
            <Button className="flex-1 bg-brand-600 hover:bg-brand-700 text-white">Configure Policy</Button>
          </div>
        </div>
      </div>
    </>
  )
}
