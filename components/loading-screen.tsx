"use client"

import { useEffect, useState } from "react"
import { Calendar, Clock, MapPin, Sparkles, Star } from "lucide-react"

const loadingMessages = [
  "🔍 Scanning available appointments...",
  "📅 Checking calendar availability...",
  "🏢 Connecting to booking centers...",
  "⚡ Loading the latest updates...",
  "🎯 Finding your perfect time slot...",
]

export function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Cycle through messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 1500)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev
        return prev + Math.random() * 15
      })
    }, 200)

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 dark:bg-blue-800/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-200/20 dark:bg-purple-800/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-200/20 dark:bg-pink-800/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Calendar className="absolute top-1/4 left-1/6 w-8 h-8 text-blue-400/40 animate-bounce delay-300" />
        <Clock className="absolute top-1/3 right-1/5 w-6 h-6 text-purple-400/40 animate-bounce delay-700" />
        <MapPin className="absolute bottom-1/3 left-1/5 w-7 h-7 text-pink-400/40 animate-bounce delay-500" />
        <Star className="absolute top-1/2 left-1/12 w-5 h-5 text-yellow-400/40 animate-bounce delay-1000" />
        <Sparkles className="absolute bottom-1/4 right-1/6 w-6 h-6 text-green-400/40 animate-bounce delay-200" />
      </div>

      <div className="text-center z-10 max-w-md mx-auto px-6">
        {/* Main loading animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto relative">
            {/* Outer ring */}
            <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin">
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1" />
            </div>

            {/* Inner ring */}
            <div
              className="absolute inset-2 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-spin"
              style={{ animationDirection: "reverse", animationDuration: "3s" }}
            >
              <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-purple-600 dark:bg-purple-400 rounded-full transform -translate-x-1/2 -translate-y-0.5" />
            </div>

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-pulse" />
            </div>
          </div>

          {/* Sparkles around the loader */}
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-500 animate-ping" />
          <Star className="absolute -bottom-1 -left-1 w-4 h-4 text-pink-500 animate-ping delay-500" />
        </div>

        {/* Loading text */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Getting Everything Ready
          </h2>

          <div className="h-6 flex items-center justify-center">
            <p key={messageIndex} className="text-gray-600 dark:text-gray-300 animate-fade-in text-lg">
              {loadingMessages[messageIndex]}
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-xs mx-auto">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 90)}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {Math.round(Math.min(progress, 90))}% complete
            </p>
          </div>
        </div>

        {/* Fun fact */}
        <div className="mt-8 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-white/20 dark:border-gray-700/50">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            💡 <strong>Did you know?</strong> We refresh data every 5 minutes to ensure you get the most up-to-date
            availability!
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
