"use client"

import { Sparkles } from "lucide-react"
import { SimpleIcon } from "../ui/provider-icons"
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
          <h1 className="text-lg font-semibold">{title}</h1>
          <SimpleIcon
            icon={Sparkles}
            className="w-6 h-6 text-brand-500"
            alt="Sparkles Icon"
          />
        </div>
      </div>
      <ThemeToggle />
    </div>
  )
}
