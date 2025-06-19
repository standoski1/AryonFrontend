"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"

interface ProviderIconUtilsProps {
  providerIds: number[]
  className?: string
  size?: "sm" | "md" | "lg"
  isArchived?: boolean
}

export function ProviderIconUtils({ 
  className, 
  size = "md",
  isArchived = false 
}: ProviderIconUtilsProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  }

  return (
    <div className="flex items-center space-x-2">
      <Image 
        src="/cloud.png" 
        alt="Cloud Provider"
        width={size === "sm" ? 16 : size === "md" ? 24 : 32}
        height={size === "sm" ? 16 : size === "md" ? 24 : 32}
        className={cn(
          sizeClasses[size],
          isArchived ? "opacity-60 dark:opacity-70" : "",
          className
        )}
      />
    </div>
  )
}

export function CloudProviderDisplay({ 
  className,
  isArchived = false 
}: { 
  className?: string
  isArchived?: boolean 
}) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Image 
        src="/cloud.png" 
        height={70} 
        width={110} 
        alt="Cloud Provider"
        className={cn(
          isArchived ? "opacity-60 dark:opacity-70" : ""
        )}
      />
    </div>
  )
}

// Value score bars utility
interface ValueScoreBarsProps {
  score: number
  maxBars?: number
  className?: string
  barClassName?: string
  filledBarClassName?: string
  emptyBarClassName?: string
}

export function ValueScoreBars({ 
  score, 
  maxBars = 4, 
  className, 
  barClassName = "w-3 h-3 rounded-[2px]",
  filledBarClassName = "bg-brand-400",
  emptyBarClassName = "bg-[#d4d4d4]"
}: ValueScoreBarsProps) {
  const getValueScoreBars = (score: number) => {
    const filledBars = Math.round((score / 100) * maxBars)
    return Array.from({ length: maxBars }, (_, i) => i < filledBars)
  }

  return (
    <div className={cn("flex space-x-1", className)}>
      {getValueScoreBars(score).map((filled, index) => (
        <div
          key={index}
          className={cn(
            barClassName,
            filled ? filledBarClassName : emptyBarClassName
          )}
        />
      ))}
    </div>
  )
}

interface ScoreBarsProps {
  score: number
  maxBars?: number
  className?: string
  barClassName?: string
  filledBarClassName?: string
  emptyBarClassName?: string
}

export function ScoreBars({ 
  score, 
  maxBars = 4, 
  className, 
  barClassName = "w-3 h-3 rounded-[2px]",
  filledBarClassName = "bg-green-500 dark:bg-green-400",
  emptyBarClassName = "bg-muted dark:bg-muted/50"
}: ScoreBarsProps) {
  const filledBars = Math.ceil((score / 100) * maxBars)
  
  return (
    <div className={cn("flex space-x-1", className)}>
      {Array.from({ length: maxBars }, (_, i) => (
        <div
          key={i}
          className={cn(
            barClassName,
            i < filledBars ? filledBarClassName : emptyBarClassName
          )}
        />
      ))}
    </div>
  )
} 