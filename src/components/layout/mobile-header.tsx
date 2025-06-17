"use client"

import { MobileSidebar } from "./mobile-sidebar"
import { ThemeToggle } from "@/components/ui/theme-toggle"

interface MobileHeaderProps {
  title: string
}

export function MobileHeader({ title }: MobileHeaderProps) {
  return (
    <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-background">
      <div className="flex items-center space-x-3">
        <MobileSidebar />
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-brand-600 rounded flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
      </div>
      <ThemeToggle />
    </div>
  )
}
