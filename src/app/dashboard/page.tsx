"use client"

import { ProtectedRoute } from "@/components/ui/protected-route"
import { Sidebar } from "@/components/layout/sidebar"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
            <p className="text-gray-600">Dashboard content coming soon...</p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
