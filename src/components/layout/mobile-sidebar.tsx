"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Archive, Menu } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { SimpleIcon } from "@/components/ui/provider-icons"
import Image from "next/image"
import { LayoutDashboard, Sparkles, ClipboardList, FileSearch2, OctagonAlert, type LucideIcon } from "lucide-react"

interface NavigationItem {
  name: string
  href: string
  icon:
    | LucideIcon
    | {
        lucideIcon?: LucideIcon
        customSvg?: React.ReactNode
        imageSrc?: string
        imageWidth?: number
        imageHeight?: number
      }
}

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Recommendations", href: "/recommendations", icon: Sparkles },
  { name: "Policies", href: "/policies", icon: ClipboardList },
  { name: "Events", href: "/events", icon: FileSearch2 },
  { name: "Waivers", href: "/waivers", icon: OctagonAlert },
  { name: "Archive", href: "/recommendations/archive", icon: Archive },
]

export function MobileSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <Image src="/logo.png" width={50} height={40} alt="logo" />
              <div>
                <h1 className="text-xl font-bold">ARYON</h1>
                <p className="text-sm text-muted-foreground">Enterprise</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-4 py-6">
            <div className="mb-6">
              <h2 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Platform</h2>
            </div>

            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname.endsWith(item.href)

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-brand-100 text-brand-700 dark:bg-accent dark:text-brand-900"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <SimpleIcon
                      icon={item.icon}
                      className={cn(
                        "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                        isActive ? "text-brand-500" : "text-muted-foreground group-hover:text-foreground",
                      )}
                      alt={item.name}
                    />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Footer */}
          <div className="px-4 py-4 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  ES
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Ezihe Stanley</p>
                  <p className="text-xs text-muted-foreground">ezihestanley@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-muted-foreground hover:text-foreground"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
