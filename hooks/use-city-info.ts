import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useBrowserNotifications } from "@/hooks/use-notification";
import { Center } from "./use-available-dates";
import { useTranslations } from "next-intl";

export type CityInfoResponse = Center | null;

export function useCityInfo(centerId: number) {
  const t = useTranslations();
  const [cityInfo, setCityInfo] = useState<CityInfoResponse>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();
  const { showNotification } = useBrowserNotifications();

  const fetchCityInfo = useCallback(
    async (isRefresh = false) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const response = await fetch(`/api/city-info/${centerId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch from backend");
        }

        const data = await response.json();
        setCityInfo(data);

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
      } catch (error) {
        console.error("Error fetching available dates:", error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [centerId, showNotification, t, toast],
  );

  useEffect(() => {
    fetchCityInfo();
  }, [fetchCityInfo]);

  useEffect(() => {
    const interval = setInterval(
      () => {
        fetchCityInfo(true);
      },
      2 * 60 * 1000, // 2 minutes
    );

    return () => clearInterval(interval);
  }, [fetchCityInfo]);

  return { cityInfo, loading, refreshing, fetchCityInfo };
}
