"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface RefreshControlProps {
  lastUpdated: Date | null;
  refreshing: boolean;
  onRefresh: () => void;
}

export function RefreshControl({
  lastUpdated,
  refreshing,
  onRefresh,
}: RefreshControlProps) {
  const tLastUpdated = useTranslations("last_updated");
  const t = useTranslations();

  const [lastUpdatedPeriod, setLastUpdatedPeriod] = useState<string>(
    tLastUpdated("seconds_ago", { count: 0 }),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastUpdated) {
        const now = new Date();
        const diff = now.getTime() - lastUpdated.getTime();

        const minutes = Math.floor(diff / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        if (minutes === 0) {
          setLastUpdatedPeriod(tLastUpdated("seconds_ago", { count: seconds }));
        } else {
          setLastUpdatedPeriod(
            tLastUpdated("minutes_seconds_ago", { minutes, seconds }),
          );
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastUpdated, tLastUpdated]);

  return (
    <div className="flex justify-end items-center mb-6">
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {tLastUpdated("label", { time: lastUpdatedPeriod })}
        </p>
        <Button
          onClick={onRefresh}
          disabled={refreshing}
          variant="outline"
          className="rounded-full border-2 hover:scale-105 transition-transform"
        >
          <RefreshCw
            className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
          />
          {t("refresh")}
        </Button>
      </div>
    </div>
  );
}
