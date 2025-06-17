"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, X } from "lucide-react"
import { useFilters } from "@/contexts/filter-context"
import type { AvailableTags } from "@/types"
import { PROVIDERS } from "@/types"
import { ProviderIcon } from "@/components/ui/provider-icons"

interface SearchFilterProps {
  availableTags: AvailableTags
  onSearch: (query: string) => void
  totalResults: number
}

export function SearchFilter({ availableTags, onSearch, totalResults }: SearchFilterProps) {
  const { filters, updateFilters, clearFilters } = useFilters()
  const [searchQuery, setSearchQuery] = useState(filters.search)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== filters.search) {
        onSearch(searchQuery)
        updateFilters({ search: searchQuery })
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleFilterChange = (type: keyof typeof filters, value: string, checked: boolean) => {
    const currentValues = filters[type] as string[]
    const newValues = checked ? [...currentValues, value] : currentValues.filter((v) => v !== value)

    updateFilters({ [type]: newValues })
  }

  const getActiveFiltersCount = () => {
    return filters.frameworks.length + filters.providers.length + filters.classes.length + filters.reasons.length
  }

  const hasActiveFilters = getActiveFiltersCount() > 0

  // Filter out UNSPECIFIED entries
  const filteredProviders = availableTags.providers.filter((provider) => provider !== "UNSPECIFIED")
  const filteredClasses = availableTags.classes.filter((className) => !className.includes("UNSPECIFIED"))
  const filteredFrameworks = availableTags.frameworks.filter((framework) => framework !== "UNSPECIFIED")
  const filteredReasons = availableTags.reasons.filter((reason) => reason !== "UNSPECIFIED")

  return (
    <div className="space-y-4" data-testid="search-filter">
      {/* Search and Filter Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            data-testid="search-input"
            placeholder="Search recommendations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center justify-between md:justify-start space-x-4">
          <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DropdownMenuTrigger asChild>
              <Button data-testid="filter-button" variant="outline" className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-4 max-h-96 overflow-y-auto" align="end">
              <div className="space-y-4">
                {/* Cloud Providers */}
                {filteredProviders.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm mb-2">Cloud Providers</h4>
                    <div className="space-y-2 max-h-24 overflow-y-auto">
                      {filteredProviders.map((provider) => {
                        const providerInfo = Object.values(PROVIDERS).find((p) => p.name === provider)
                        return (
                          <div key={provider} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`provider-${provider}`}
                                data-testid="filter-option"
                                checked={filters.providers.includes(provider)}
                                onChange={(e) =>
                                  handleFilterChange("providers", provider, e.target.checked)
                                }
                              />
                              <label htmlFor={`provider-${provider}`} className="text-sm flex items-center space-x-2">
                                {providerInfo?.iconComponent ? (
                                  <ProviderIcon
                                    provider={providerInfo.icon as "aws" | "azure"}
                                    className="w-4 h-4 text-muted-foreground"
                                  />
                                ) : (
                                  <span>{providerInfo?.icon}</span>
                                )}
                                <span>{provider}</span>
                              </label>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Recommendation Classes */}
                {filteredClasses.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm mb-2">Categories</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {filteredClasses.map((className) => (
                        <div key={className} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`class-${className}`}
                              data-testid="filter-option"
                              checked={filters.classes.includes(className)}
                              onChange={(e) =>
                                handleFilterChange("classes", className, e.target.checked)
                              }
                            />
                            <label htmlFor={`class-${className}`} className="text-sm">
                              {className.replace("_RECOMMENDATION", "").replace("_", " ")}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Frameworks */}
                {filteredFrameworks.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm mb-2">Frameworks</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {filteredFrameworks.slice(0, 10).map((framework) => (
                        <div key={framework} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`framework-${framework}`}
                              data-testid="filter-option"
                              checked={filters.frameworks.includes(framework)}
                              onChange={(e) =>
                                handleFilterChange("frameworks", framework, e.target.checked)
                              }
                            />
                            <label htmlFor={`framework-${framework}`} className="text-sm">
                              {framework}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reasons */}
                {filteredReasons.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm mb-2">Reasons</h4>
                    <div className="space-y-2 max-h-24 overflow-y-auto">
                      {filteredReasons.slice(0, 8).map((reason) => (
                        <div key={reason} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`reason-${reason}`}
                              data-testid="filter-option"
                              checked={filters.reasons.includes(reason)}
                              onChange={(e) =>
                                handleFilterChange("reasons", reason, e.target.checked)
                              }
                            />
                            <label htmlFor={`reason-${reason}`} className="text-sm">
                              {reason}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Clear Filters Button */}
                {hasActiveFilters && (
                  <div className="pt-2 border-t">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        clearFilters()
                        setIsFilterOpen(false)
                      }}
                      className="w-full justify-center text-sm"
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="text-sm text-muted-foreground whitespace-nowrap">Showing {totalResults} results</div>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.providers.map((provider) => (
            <Badge key={provider} variant="secondary" className="flex items-center space-x-1">
              <span>
                {PROVIDERS[Object.keys(PROVIDERS).find((key) => PROVIDERS[Number(key)].name === provider) as any]?.icon}
              </span>
              <span>{provider}</span>
              <button
                onClick={() => handleFilterChange("providers", provider, false)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {filters.frameworks.map((framework) => (
            <Badge key={framework} variant="secondary" className="flex items-center space-x-1">
              <span>{framework}</span>
              <button
                onClick={() => handleFilterChange("frameworks", framework, false)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {filters.classes.map((className) => (
            <Badge key={className} variant="secondary" className="flex items-center space-x-1">
              <span>{className.replace("_RECOMMENDATION", "").replace("_", " ")}</span>
              <button
                onClick={() => handleFilterChange("classes", className, false)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {filters.reasons.map((reason) => (
            <Badge key={reason} variant="secondary" className="flex items-center space-x-1">
              <span>{reason}</span>
              <button
                onClick={() => handleFilterChange("reasons", reason, false)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
