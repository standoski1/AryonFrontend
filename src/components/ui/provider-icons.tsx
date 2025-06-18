"use client"

import type React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Star,
  Lock,
  Calendar,
  Settings,
  AlertTriangle,
  Cloud,
  Box,
  Clipboard,
  BookOpen,
  BarChart3,
  Shield,
  type LucideIcon,
} from "lucide-react"

interface IconProps {
  className?: string
  alt?: string
}

interface ProviderIconProps {
  provider: "aws" | "azure"
  className?: string
}

// Dashboard Icon - Using Lucide LayoutDashboard
export function DashboardIcon({ className }: IconProps) {
  return <LayoutDashboard className={cn("w-5 h-5", className)} />
}

// Star Icon - Using Lucide Star
export function StarIcon({ className }: IconProps) {
  return <Star className={cn("w-5 h-5", className)} />
}

// Policies Icon - Using Lucide Shield (more appropriate for policies)
export function PoliciesIcon({ className }: IconProps) {
  return <Shield className={cn("w-5 h-5", className)} />
}

// Events Icon - Using Lucide Calendar
export function EventsIcon({ className }: IconProps) {
  return <Calendar className={cn("w-5 h-5", className)} />
}

// Waivers Icon - Using Lucide Settings
export function WaiversIcon({ className }: IconProps) {
  return <Settings className={cn("w-5 h-5", className)} />
}

// Warning Triangle Icon - Using Lucide AlertTriangle
export function TriangleIcon({ className }: IconProps) {
  return <AlertTriangle className={cn("w-5 h-5", className)} />
}

// Single Cube Icon - Using Lucide Box
export function CubeIcon({ className }: IconProps) {
  return <Box className={cn("w-6 h-6", className)} />
}

// Multi-Cube Icon - Custom image fallback
export function MultiCubeIcon({ className, alt = "Multi Cube" }: IconProps) {
  return <Image src="/multicube.png" alt={alt} width={40} height={70} className={cn("w-20 h-70", className)} />
}

// Cloud Icon - Using Lucide Cloud
export function CloudIcon({ className }: IconProps) {
  return <Cloud className={cn("w-5 h-5", className)} />
}

// AWS Logo Icon - Custom image fallback (no Lucide equivalent)
export function AwsLogoIcon({ className, alt = "AWS" }: IconProps) {
  return (
    <Image
      src="/aws-logo.png"
      alt={alt}
      width={40}
      height={20}
      className={cn("h-5 w-auto", className)}
    />
  )
}

// Azure Icon - Custom SVG fallback (specific brand logo)
export function AzureIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-5 h-5", className)} fill="currentColor">
      <path d="M5.483 18.262h8.017L9.177 5.738 5.483 18.262zm13.034 0L13.6 5.738l-2.549 8.403 3.066 4.121h4.4z" />
    </svg>
  )
}

// Other utility icons - Using Lucide equivalents
export function WarningTriangleIcon({ className }: IconProps) {
  return <AlertTriangle className={cn("w-5 h-5", className)} />
}

export function ClipboardIcon({ className }: IconProps) {
  return <Clipboard className={cn("w-5 h-5", className)} />
}

export function BookIcon({ className }: IconProps) {
  return <BookOpen className={cn("w-5 h-5", className)} />
}

export function LockIcon({ className }: IconProps) {
  return <Lock className={cn("w-5 h-5", className)} />
}

export function BarChartIcon({ className }: IconProps) {
  return <BarChart3 className={cn("w-5 h-5", className)} />
}

// Generic Icon Component with fallback system
interface GenericIconProps extends IconProps {
  lucideIcon?: LucideIcon
  customSvg?: React.ReactNode
  imageSrc?: string
  imageWidth?: number
  imageHeight?: number
}

export function GenericIcon({
  lucideIcon: LucideIconComponent,
  customSvg,
  imageSrc,
  imageWidth = 20,
  imageHeight = 20,
  className,
  alt = "Icon",
}: GenericIconProps) {
  // Priority: Lucide Icon > Custom SVG > Image
  if (LucideIconComponent) {
    return <LucideIconComponent className={cn("w-5 h-5", className)} />
  }

  if (customSvg) {
    return <div className={cn("w-5 h-5", className)}>{customSvg}</div>
  }

  if (imageSrc) {
    return (
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={alt}
        width={imageWidth}
        height={imageHeight}
        className={cn("w-5 h-5", className)}
      />
    )
  }

  // Fallback to a default icon
  return <Box className={cn("w-5 h-5", className)} />
}

// Provider Icon with fallback system
export function ProviderIcon({ provider, className }: ProviderIconProps) {
  switch (provider) {
    case "aws":
      return <CloudIcon className={className} alt="AWS" />
    case "azure":
      return <AzureIcon className={className} alt="Azure" />
    default:
      return null
  }
}

// Icon mapping for easy configuration (only Lucide icons)
export const IconMap = {
  dashboard: LayoutDashboard,
  star: Star,
  policies: Shield,
  events: Calendar,
  waivers: Settings,
  triangle: AlertTriangle,
  cloud: Cloud,
  cube: Box,
  clipboard: Clipboard,
  book: BookOpen,
  lock: Lock,
  barChart: BarChart3,
} as const

// Type for icon names
export type IconName = keyof typeof IconMap

// Custom icon configuration
interface CustomIconConfig {
  lucideIcon?: LucideIcon
  customSvg?: React.ReactNode
  imageSrc?: string
  imageWidth?: number
  imageHeight?: number
}

// Dynamic Icon Component with proper typing
interface DynamicIconProps extends IconProps {
  name?: IconName
  customIcon?: CustomIconConfig
}

export function DynamicIcon({ name, customIcon, className, alt }: DynamicIconProps) {
  // If custom icon is provided, use it
  if (customIcon) {
    return (
      <GenericIcon
        lucideIcon={customIcon.lucideIcon}
        customSvg={customIcon.customSvg}
        imageSrc={customIcon.imageSrc}
        imageWidth={customIcon.imageWidth}
        imageHeight={customIcon.imageHeight}
        className={className}
        alt={alt}
      />
    )
  }

  // If name is provided and exists in IconMap, use it
  if (name && name in IconMap) {
    const LucideIconComponent = IconMap[name]
    return <LucideIconComponent className={cn("w-5 h-5", className)} />
  }

  // Fallback to default icon
  return <Box className={cn("w-5 h-5", className)} />
}

// Simplified icon component for direct usage
interface SimpleIconProps extends IconProps {
  icon: LucideIcon | CustomIconConfig
}

export function SimpleIcon({ icon, className, alt }: SimpleIconProps) {
  // If it's a Lucide icon component
  if (typeof icon === "function" || (typeof icon === "object" && "render" in icon)) {
    const IconComponent = icon as LucideIcon
    return <IconComponent className={cn("w-5 h-5", className)} />
  }

  // If it's a custom icon config
  const customConfig = icon as CustomIconConfig
  return (
    <GenericIcon
      lucideIcon={customConfig.lucideIcon}
      customSvg={customConfig.customSvg}
      imageSrc={customConfig.imageSrc}
      imageWidth={customConfig.imageWidth}
      imageHeight={customConfig.imageHeight}
      className={className}
      alt={alt}
    />
  )
}
