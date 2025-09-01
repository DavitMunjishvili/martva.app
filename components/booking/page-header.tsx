"use client";

import { Button } from "@/components/ui/button";
import { useBrowserNotifications } from "@/hooks/use-notification";
import { RefreshCw, Sun, Moon, Sparkles, BellIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface PageHeaderProps {
  onRefresh: () => void;
  refreshing: boolean;
  lastUpdated: Date | null;
}

export function PageHeader({
  onRefresh,
  refreshing,
  lastUpdated,
}: PageHeaderProps) {
  const [lastUpdatedPeriod, setLastUpdatedPeriod] =
    useState<string>("0 secs ago");

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastUpdated) {
        const now = new Date();
        const diff = now.getTime() - lastUpdated.getTime();

        const minutes = Math.floor(diff / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        if (minutes === 0) {
          setLastUpdatedPeriod(`${seconds} sec${seconds > 1 ? "s" : ""} ago`);
        } else {
          setLastUpdatedPeriod(
            `${minutes} min${minutes > 1 ? "s" : ""} and ${seconds} sec${seconds > 1 ? "s" : ""} ago`,
          );
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastUpdated]);

  return (
    <div className="flex justify-end items-center gap-2 mb-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Last updated: {lastUpdatedPeriod} • Auto-refreshes every 3 minutes
      </p>

      <Button
        onClick={onRefresh}
        disabled={refreshing}
        variant="outline"
        className="rounded-full border-2 hover:scale-105 transition-transform"
      >
        <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
        Refresh
      </Button>
    </div>
  );
}
