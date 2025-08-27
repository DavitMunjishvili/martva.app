"use client";

import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useBrowserNotifications } from "@/hooks/use-notification";

export interface BookingDate {
  bookingDate: string;
  bookingDateStatus: number;
}

export interface Center {
  centerId: number;
  centerName: string;
  dates: BookingDate[];
}

export interface AvailableDatesResponse {
  [key: string]: Center;
}

export interface AvailableHoursResponse {
  timeFrameId: number;
  timeFrameName: string;
}

export function useBookingData() {
  const [centers, setCenters] = useState<Center[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { toast } = useToast();
  const { showNotification } = useBrowserNotifications();

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

        const centersArray = Object.values(data).sort((a, b) => {
          if (a.dates.length > 0 && b.dates.length === 0) return -1;
          if (a.dates.length === 0 && b.dates.length > 0) return 1;
          return b.dates.length - a.dates.length;
        });

        setCenters(centersArray);
        setLastUpdated(new Date());

        if (isRefresh) {
          toast({
            title: "✨ Data refreshed!",
            description: "Latest availability information loaded successfully.",
          });
          showNotification({
            title: "✨ Data refreshed!",
            body: "Latest availability information loaded successfully.",
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
  ): Promise<AvailableHoursResponse[]> => {
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
    return data || [];
  };

  useEffect(() => {
    fetchAvailableDates();
  }, [fetchAvailableDates]);

  useEffect(() => {
    const interval = setInterval(
      () => {
        fetchAvailableDates(true);
      },
      3 * 60 * 1000, // 3 minutes
    );

    return () => clearInterval(interval);
  }, [fetchAvailableDates]);

  return {
    centers,
    loading,
    refreshing,
    lastUpdated,
    fetchAvailableDates,
    fetchAvailableHours,
  };
}
