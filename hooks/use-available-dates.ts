"use client";

import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useBrowserNotifications } from "@/hooks/use-notification";
import { REFETCH_INTERVAL } from "@/lib/config";
import { useTranslations } from "next-intl";

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

export function useAvailableDates() {
  const t = useTranslations();
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
            title: t("data_refreshed"),
            description: t("data_refreshed_description"),
          });
          showNotification({
            title: t("data_refreshed"),
            body: t("data_refreshed_description"),
          });
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        toast({
          title: t("oops_something_went_wrong"),
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

  useEffect(() => {
    fetchAvailableDates();
  }, [fetchAvailableDates]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchAvailableDates(true);
    }, REFETCH_INTERVAL);

    return () => clearInterval(interval);
  }, [fetchAvailableDates]);

  return {
    centers,
    loading,
    refreshing,
    lastUpdated,
    fetchAvailableDates,
  };
}
