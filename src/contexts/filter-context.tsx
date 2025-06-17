"use client"

import { createContext, useContext, useState, useMemo, type ReactNode } from "react"
import type { FilterState } from "@/types"

interface FilterContextType {
  filters: FilterState
  updateFilters: (newFilters: Partial<FilterState>) => void
  clearFilters: () => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

const initialFilters: FilterState = {
  search: "",
  tags: [],
  frameworks: [],
  providers: [],
  classes: [],
  reasons: [],
}

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(initialFilters)

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const clearFilters = () => {
    setFilters(initialFilters)
  }

  const value = useMemo(
    () => ({
      filters,
      updateFilters,
      clearFilters,
    }),
    [filters],
  )

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider")
  }
  return context
}
