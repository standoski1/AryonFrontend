"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { DashboardIcon, StarIcon, PoliciesIcon, EventsIcon, WaiversIcon } from "@/components/ui/provider-icons"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { name: "Recommendations", href: "/recommendations", icon: StarIcon },
  { name: "Policies", href: "/policies", icon: PoliciesIcon },
  { name: "Events", href: "/events", icon: EventsIcon },
  { name: "Waivers", href: "/waivers", icon: WaiversIcon },
]

export function Sidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <div className="hidden md:flex flex-col w-64 bg-background border-r border-border">
      <div className="flex items-center px-6 py-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold">ARYON</h1>
            <p className="text-sm text-muted-foreground">Enterprise</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="mb-6">
          <h2 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Platform</h2>
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href)
            const IconComponent = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <IconComponent
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
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

      <div className="px-4 py-4 border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              YL
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Yair Lad</p>
              <p className="text-xs text-muted-foreground">yair@aryon.security</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <ThemeToggle />
          <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground hover:text-foreground">
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
