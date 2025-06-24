"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function LoadingState() {
  return (
    <div className="space-y-4">
      <div className="text-center py-4">
        <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 mb-4">
          <div className="w-6 h-6 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-lg font-medium">Loading available hours...</span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <Skeleton key={index} className="h-12 rounded-md" />
        ))}
      </div>
    </div>
  )
}
