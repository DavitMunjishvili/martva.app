"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  RefreshCw,
  Sun,
  Moon,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";
import { CityCalendar } from "@/components/city-calendar";
import {
  CenterCardSkeleton,
  TimeSlotsSkeleton,
} from "@/components/skeleton-loaders";

interface BookingDate {
  bookingDate: string;
  bookingDateStatus: number;
}

interface Center {
  centerId: number;
  centerName: string;
  dates: BookingDate[];
}

interface AvailableDatesResponse {
  [key: string]: Center;
}

interface AvailableHoursResponse {
  timeFrameId: number;
  timeFrameName: string;
}

export default function BookingSystem() {
  const [centers, setCenters] = useState<Center[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<{
    date: string;
    city: string;
  } | null>(null);
  const [availableHours, setAvailableHours] = useState<
    AvailableHoursResponse[]
  >([]);
  const [loadingHours, setLoadingHours] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const fetchAvailableDates = useCallback(
    async (isRefresh = false) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const response = await fetch("/api/available-dates");

        if (!response.ok) {
          throw new Error("Failed to fetch available dates");
        }

        const data: AvailableDatesResponse = await response.json();

        // Convert object to array and sort by availability
        const centersArray = Object.values(data).sort((a, b) => {
          // Centers with dates first
          if (a.dates.length > 0 && b.dates.length === 0) return -1;
          if (a.dates.length === 0 && b.dates.length > 0) return 1;
          // Then sort by number of available dates (descending)
          return b.dates.length - a.dates.length;
        });

        setCenters(centersArray);
        setLastUpdated(new Date());

        if (isRefresh) {
          toast({
            title: "✨ Data refreshed!",
            description: "Latest availability information loaded successfully.",
          });
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        toast({
          title: "❌ Oops! Something went wrong",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [toast],
  );

  const fetchAvailableHours = async (
    centerId: number,
    date: string,
    city: string,
  ) => {
    try {
      setLoadingHours(true);

      const response = await fetch("/api/available-hours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, city: centerId }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch available hours");
      }

      const data: AvailableHoursResponse[] = await response.json();
      setAvailableHours(data || []);
      setSelectedDate({ date, city });

      toast({
        title: "🕐 Time slots loaded!",
        description: `Found ${data.length || 0} available time slots for ${city}.`,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch hours";
      toast({
        title: "❌ Unable to load time slots",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoadingHours(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchAvailableDates();
  }, [fetchAvailableDates]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(
      () => {
        fetchAvailableDates(true);
      },
      5 * 60 * 1000,
    ); // 5 minutes

    return () => clearInterval(interval);
  }, [fetchAvailableDates]);

  const formatDate = (dateString: string) => {
    const [day, month, year] = dateString.split("-");
    const date = new Date(
      Number.parseInt(year),
      Number.parseInt(month) - 1,
      Number.parseInt(day),
    );
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handleDateClick = (centerId: number, date: string, city: string) => {
    fetchAvailableHours(centerId, date, city);
  };

  const handleRefresh = () => {
    fetchAvailableDates(true);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              <Button
                onClick={toggleTheme}
                variant="outline"
                size="icon"
                className="rounded-full border-2 hover:scale-105 transition-transform"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-yellow-500" />
                ) : (
                  <Moon className="w-4 h-4 text-blue-600" />
                )}
              </Button>
              <Button
                onClick={handleRefresh}
                disabled={refreshing}
                variant="outline"
                className="rounded-full border-2 hover:scale-105 transition-transform"
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </div>
          </div>

          <div className="relative inline-block">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Book Your Perfect Appointment
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-500 absolute -top-2 -right-8 animate-bounce" />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose your preferred center and date to discover available time
            slots ⏰
          </p>

          {lastUpdated && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Last updated: {lastUpdated.toLocaleTimeString()} • Auto-refreshes
              every 5 minutes
            </p>
          )}
        </div>

        {loadingHours && <TimeSlotsSkeleton />}

        {selectedDate && availableHours.length > 0 && !loadingHours && (
          <Card className="mb-8 border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-800">
                  <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Available Hours - {selectedDate.city}
                </span>
                <Badge
                  variant="outline"
                  className="border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300"
                >
                  📅 {formatDate(selectedDate.date)}
                </Badge>
                <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse ml-auto" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {availableHours.map((hour, index) => (
                  <Button
                    key={hour.timeFrameId}
                    variant="outline"
                    className="justify-center h-12 transition-all duration-200 hover:scale-105 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/20 dark:hover:to-emerald-900/20 hover:border-green-300 dark:hover:border-green-600 hover:shadow-md"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: "bounceIn 0.5s ease-out forwards",
                    }}
                  >
                    <div className="p-1 rounded bg-green-100 dark:bg-green-800 mr-2">
                      <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="font-semibold">{hour.timeFrameName}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {selectedDate && availableHours.length === 0 && !loadingHours && (
          <Card className="mb-8 border-2 border-orange-200 dark:border-orange-800 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20">
            <CardContent className="text-center py-12">
              <div className="relative">
                <Clock className="w-20 h-20 mx-auto mb-4 text-orange-300 dark:text-orange-600" />
                <span className="absolute inset-0 flex items-center justify-center text-3xl">
                  😔
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                No available hours for this date
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try selecting a different date or check back later!
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid justify-center gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="max-w-sm w-full"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
                  <CenterCardSkeleton />
                </div>
              ))
            : centers.map((center, index) => (
                <Card
                  key={center.centerName}
                  className={`max-w-sm h-fit transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 ${
                    center.dates.length > 0
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
                          center.dates.length > 0
                            ? "bg-green-100 dark:bg-green-800"
                            : "bg-gray-200 dark:bg-gray-600"
                        }`}
                      >
                        <MapPin
                          className={`w-5 h-5 ${
                            center.dates.length > 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-gray-400 dark:text-gray-500"
                          }`}
                        />
                      </div>
                      <span
                        className={`font-semibold ${
                          center.dates.length > 0
                            ? "text-gray-800 dark:text-gray-200"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {center.centerName}
                      </span>
                      <Badge
                        variant={
                          center.dates.length > 0 ? "default" : "secondary"
                        }
                        className={`ml-auto ${
                          center.dates.length > 0
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-gray-400 dark:bg-gray-500 text-gray-100 dark:text-gray-300"
                        }`}
                      >
                        {center.dates.length > 0
                          ? `🎯 ${center.dates.length}`
                          : "😴 None"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {center.dates.length > 0 ? (
                      <CityCalendar
                        centerId={center.centerId}
                        centerName={center.centerName}
                        dates={center.dates}
                        onDateSelect={handleDateClick}
                        isLoading={loadingHours}
                        selectedDate={selectedDate}
                      />
                    ) : (
                      <div className="text-center py-8 text-gray-400 dark:text-gray-500">
                        <div className="relative">
                          <Calendar className="w-16 h-16 mx-auto mb-3 opacity-20" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl opacity-50">😴</span>
                          </div>
                        </div>
                        <p className="font-medium text-sm">
                          No available dates
                        </p>
                        <p className="text-xs mt-1 opacity-75">
                          Check back later!
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
