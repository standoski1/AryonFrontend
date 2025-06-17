"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProviderIconProps {
  provider: "aws" | "azure"
  className?: string
}

interface IconProps {
  className?: string
  alt?: string
}

// Single Cube Icon (for recommendation cards)
export function CubeIcon({ className, alt = "Cube" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-6 h-6", className)} fill="currentColor">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L19.82 8 12 11.82 4.18 8 12 4.18zM4 9.18l7 3.5v7.14l-7-3.5V9.18zm16 0v7.14l-7 3.5v-7.14l7-3.5z" />
    </svg>
  )
}

// Multi-Cube Icon (for detail panels)
export function MultiCubeIcon({ className, alt = "Multi Cube" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-6 h-6", className)} fill="currentColor">
      <path d="M6 2L2 4.5v7L6 14l4-2.5v-7L6 2zm0 2.18L8.82 6 6 7.82 3.18 6 6 4.18zM3 6.18l2.5 1.57v5.07L3 11.25V6.18zm6 0v5.07L6.5 12.82V7.75L9 6.18z" />
      <path d="M18 6L14 8.5v7L18 18l4-2.5v-7L18 6zm0 2.18L20.82 10 18 11.82 15.18 10 18 8.18zM15 10.18l2.5 1.57v5.07L15 15.25v-5.07zm6 0v5.07L18.5 16.82V11.75L21 10.18z" />
      <path d="M12 10L8 12.5v7L12 22l4-2.5v-7L12 10zm0 2.18L14.82 14 12 15.82 9.18 14 12 12.18zM9 14.18l2.5 1.57v5.07L9 19.25v-5.07zm6 0v5.07L12.5 20.82V15.75L15 14.18z" />
    </svg>
  )
}

// Star Icon (for sidebar)
export function StarIcon({ className, alt = "Star" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-5 h-5", className)} fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

// Dashboard Icon
export function DashboardIcon({ className, alt = "Dashboard" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-5 h-5", className)} fill="currentColor">
      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
    </svg>
  )
}

// Policies Icon
export function PoliciesIcon({ className, alt = "Policies" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-5 h-5", className)} fill="currentColor">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
    </svg>
  )
}

// Events Icon
export function EventsIcon({ className, alt = "Events" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-5 h-5", className)} fill="currentColor">
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
    </svg>
  )
}

// Waivers Icon
export function WaiversIcon({ className, alt = "Waivers" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-5 h-5", className)} fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  )
}

// Other utility icons
export function WarningTriangleIcon({ className, alt = "Warning" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-5 h-5", className)} fill="currentColor">
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </svg>
  )
}

export function TriangleIcon({ className, alt = "Triangle" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-5 h-5", className)} fill="currentColor">
      <path d="M12 2L2 20h20L12 2zm0 3.5L19.5 18h-15L12 5.5z" />
    </svg>
  )
}

export function ClipboardIcon({ className, alt = "Clipboard" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-5 h-5", className)} fill="currentColor">
      <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
    </svg>
  )
}

export function BookIcon({ className, alt = "Book" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-5 h-5", className)} fill="currentColor">
      <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
    </svg>
  )
}

export function LockIcon({ className, alt = "Lock" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-5 h-5", className)} fill="currentColor">
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
    </svg>
  )
}

export function BarChartIcon({ className, alt = "Bar Chart" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-5 h-5", className)} fill="currentColor">
      <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z" />
    </svg>
  )
}

// AWS and Azure icons (keeping existing)
export function CloudIcon({ className, alt = "Cloud" }: IconProps) {
  return <Image src="/icons/cloud-icon.png" alt={alt} width={20} height={20} className={cn("w-5 h-5", className)} />
}

export function AwsLogoIcon({ className, alt = "AWS" }: IconProps) {
  return <Image src="/icons/aws-logo.png" alt={alt} width={40} height={20} className={cn("h-5 w-auto", className)} />
}

export function AzureIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-5 h-5", className)} fill="currentColor">
      <path d="M5.483 18.262h8.017L9.177 5.738 5.483 18.262zm13.034 0L13.6 5.738l-2.549 8.403 3.066 4.121h4.4z" />
    </svg>
  )
}

export function ProviderIcon({ provider, className }: ProviderIconProps) {
  switch (provider) {
    case "aws":
      return <CloudIcon className={className} alt="AWS" />
    case "azure":
      return <AzureIcon className={className} />
    default:
      return null
  }
}
