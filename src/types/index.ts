export interface User {
    id: string
    username: string
    token: string
  }
  
  export interface CloudProvider {
    id: number
    name: string
    icon: string
    iconComponent?: string
  }
  
  export interface Framework {
    name: string
    section: string
    subsection: string
  }
  
  export interface FurtherReading {
    name: string
    href: string
  }
  
  export interface AffectedResource {
    name: string
  }
  
  export interface MostImpactedScope {
    name: string
    type: string
    count: number
  }
  
  export interface ImpactAssessment {
    totalViolations: number
    mostImpactedScope: MostImpactedScope
  }
  
  export interface Recommendation {
    tenantId: string
    recommendationId: string
    title: string
    slug: string
    description: string
    score: number
    provider: number[]
    frameworks: Framework[]
    reasons: string[]
    furtherReading: FurtherReading[]
    totalHistoricalViolations: number
    affectedResources: AffectedResource[]
    impactAssessment: ImpactAssessment
    class: number
    isArchived?: boolean
    createdAt?: string
    updatedAt?: string
  }
  
  export interface PaginationCursor {
    next: string | null
  }
  
  export interface Pagination {
    cursor: PaginationCursor
    totalItems: number
  }
  
  export interface AvailableTags {
    frameworks: string[]
    reasons: string[]
    providers: string[]
    classes: string[]
  }
  
  export interface RecommendationsResponse {
    data: Recommendation[]
    pagination: Pagination
    availableTags: AvailableTags
  }
  
  export interface FilterState {
    search: string
    tags: string[]
    frameworks: string[]
    providers: string[]
    classes: string[]
    reasons: string[]
  }
  
  export interface AuthContextType {
    user: User | null
    login: (username: string, password: string) => Promise<boolean>
    logout: () => void
    isLoading: boolean
  }
  
  // Provider mapping with proper icons
  export const PROVIDERS: Record<number, CloudProvider> = {
    0: { id: 0, name: "UNSPECIFIED", icon: "❓" },
    1: { id: 1, name: "AWS", icon: "aws", iconComponent: "AwsIcon" },
    2: { id: 2, name: "AZURE", icon: "azure", iconComponent: "AzureIcon" },
  }
  
  // Class mapping
  export const RECOMMENDATION_CLASSES: Record<number, { name: string; color: string; priority: string }> = {
    0: { name: "UNSPECIFIED", color: "gray", priority: "Unknown" },
    1: { name: "COMPUTE", color: "blue", priority: "High" },
    2: { name: "NETWORKING", color: "green", priority: "High" },
    3: { name: "DATA_PROTECTION", color: "purple", priority: "Critical" },
    4: { name: "APPLICATION", color: "orange", priority: "Medium" },
    5: { name: "AUTHENTICATION", color: "red", priority: "Critical" },
    6: { name: "COMPLIANCE", color: "yellow", priority: "Medium" },
  }
  