"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface BookingDate {
  bookingDate: string
  bookingDateStatus: number
}

interface Center {
  centerName: string
  dates: BookingDate[]
}

interface AvailableDatesResponse {
  [key: string]: Center
}

interface AvailableHoursResponse {
  hours: string[]
}

export default function BookingSystem() {
  const [centers, setCenters] = useState<Center[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<{ date: string; city: string } | null>(null)
  const [availableHours, setAvailableHours] = useState<string[]>([])
  const [loadingHours, setLoadingHours] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAvailableDates()
  }, [])

  const fetchAvailableDates = async () => {
    try {
      setLoading(true)
      setError(null)

      // Replace with your actual backend URL
      const response = await fetch("/api/available-dates")

      if (!response.ok) {
        throw new Error("Failed to fetch available dates")
      }

      const data: AvailableDatesResponse = await response.json()

      // Convert object to array and sort by availability
      const centersArray = Object.values(data).sort((a, b) => {
        // Centers with dates first
        if (a.dates.length > 0 && b.dates.length === 0) return -1
        if (a.dates.length === 0 && b.dates.length > 0) return 1
        // Then sort by number of available dates (descending)
        return b.dates.length - a.dates.length
      })

      setCenters(centersArray)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const fetchAvailableHours = async (date: string, city: string) => {
    try {
      setLoadingHours(true)
      setError(null)

      // Replace with your actual backend URL
      const response = await fetch("/api/available-hours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, city }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch available hours")
      }

      const data: AvailableHoursResponse = await response.json()
      setAvailableHours(data.hours || [])
      setSelectedDate({ date, city })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch hours")
    } finally {
      setLoadingHours(false)
    }
  }

  const formatDate = (dateString: string) => {
    const [day, month, year] = dateString.split("-")
    const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day))
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const handleDateClick = (date: string, city: string) => {
    fetchAvailableHours(date, city)
  }

  const handleHourSelect = (hour: string) => {
    // Handle hour selection - you can add your booking logic here
    alert(`Selected: ${selectedDate?.city} on ${selectedDate?.date} at ${hour}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading available dates...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your Appointment</h1>
          <p className="text-gray-600">Select a center and available date to view time slots</p>
        </div>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {centers.map((center) => (
            <Card key={center.centerName} className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  {center.centerName}
                  <Badge variant={center.dates.length > 0 ? "default" : "secondary"}>
                    {center.dates.length > 0 ? `${center.dates.length} dates` : "No dates"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {center.dates.length > 0 ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Calendar className="w-4 h-4" />
                      Available Dates
                    </div>
                    <div className="grid gap-2">
                      {center.dates.map((dateObj) => (
                        <Button
                          key={dateObj.bookingDate}
                          variant="outline"
                          className="justify-start h-auto p-3 hover:bg-blue-50 hover:border-blue-300"
                          onClick={() => handleDateClick(dateObj.bookingDate, center.centerName)}
                          disabled={
                            loadingHours &&
                            selectedDate?.date === dateObj.bookingDate &&
                            selectedDate?.city === center.centerName
                          }
                        >
                          <div className="flex items-center gap-2 w-full">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">{formatDate(dateObj.bookingDate)}</span>
                            {loadingHours &&
                              selectedDate?.date === dateObj.bookingDate &&
                              selectedDate?.city === center.centerName && (
                                <Loader2 className="w-4 h-4 animate-spin ml-auto" />
                              )}
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No available dates</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedDate && availableHours.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                Available Hours - {selectedDate.city}
                <Badge variant="outline">{formatDate(selectedDate.date)}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {availableHours.map((hour) => (
                  <Button
                    key={hour}
                    variant="outline"
                    className="justify-center hover:bg-green-50 hover:border-green-300"
                    onClick={() => handleHourSelect(hour)}
                  >
                    <Clock className="w-4 h-4 mr-2 text-green-600" />
                    {hour}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {selectedDate && availableHours.length === 0 && !loadingHours && (
          <Card className="mt-8">
            <CardContent className="text-center py-8">
              <Clock className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-500">No available hours for this date</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
