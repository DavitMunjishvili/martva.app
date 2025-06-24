"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"
import { CityCalendar } from "@/components/city-calendar"
import type { Center } from "@/hooks/use-booking-data"
import type { SelectedDate } from "@/hooks/use-date-selection"

interface CenterCardProps {
  center: Center
  index: number
  selectedDate: SelectedDate | null
  onDateSelect: (centerId: number, date: string, city: string) => void
}

export function CenterCard({ center, index, selectedDate, onDateSelect }: CenterCardProps) {
  const hasAvailableDates = center.dates.length > 0

  return (
    <Card
      className={`max-w-sm h-fit transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 ${
        hasAvailableDates
          ? "border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
          : "border-gray-300 dark:border-gray-600 bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-800/30 dark:to-slate-800/30 opacity-75"
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
        animation: "fadeInUp 0.6s ease-out forwards",
      }}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div
            className={`p-2 rounded-full ${
              hasAvailableDates ? "bg-green-100 dark:bg-green-800" : "bg-gray-200 dark:bg-gray-600"
            }`}
          >
            <MapPin
              className={`w-5 h-5 ${
                hasAvailableDates ? "text-green-600 dark:text-green-400" : "text-gray-400 dark:text-gray-500"
              }`}
            />
          </div>
          <span
            className={`font-semibold ${
              hasAvailableDates ? "text-gray-800 dark:text-gray-200" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {center.centerName}
          </span>
          <Badge
            variant={hasAvailableDates ? "default" : "secondary"}
            className={`ml-auto ${
              hasAvailableDates
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-400 dark:bg-gray-500 text-gray-100 dark:text-gray-300"
            }`}
          >
            {hasAvailableDates ? `🎯 ${center.dates.length}` : "😴 None"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasAvailableDates ? (
          <CityCalendar
            centerId={center.centerId}
            centerName={center.centerName}
            dates={center.dates}
            onDateSelect={onDateSelect}
            selectedDate={selectedDate}
          />
        ) : (
          <EmptyDateState />
        )}
      </CardContent>
    </Card>
  )
}

function EmptyDateState() {
  return (
    <div className="text-center py-8 text-gray-400 dark:text-gray-500">
      <div className="relative">
        <Calendar className="w-16 h-16 mx-auto mb-3 opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl opacity-50">😴</span>
        </div>
      </div>
      <p className="font-medium text-sm">No available dates</p>
      <p className="text-xs mt-1 opacity-75">Check back later!</p>
    </div>
  )
}
