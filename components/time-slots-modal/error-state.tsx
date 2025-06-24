"use client"

import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

interface ErrorStateProps {
  error: string
}

export function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="text-center py-12">
      <div className="relative mb-6">
        <AlertCircle className="w-20 h-20 mx-auto text-red-300 dark:text-red-600" />
        <span className="absolute inset-0 flex items-center justify-center text-3xl">😔</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Unable to load time slots</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
      <Button onClick={() => window.location.reload()} variant="outline" className="mt-2">
        Try Again
      </Button>
    </div>
  )
}
