"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw, Sun, Moon, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface PageHeaderProps {
  onRefresh: () => void;
  refreshing: boolean;
  lastUpdated: Date | null;
  theme: string | undefined;
  onToggleTheme: () => void;
}

export function PageHeader({
  onRefresh,
  refreshing,
  lastUpdated,
  theme,
  onToggleTheme,
}: PageHeaderProps) {
  const [lastUpdatedPeriod, setLastUpdatedPeriod] = useState<string | null>(
    null,
  );
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
    <div className="text-center mb-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <Button
            onClick={onToggleTheme}
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
            onClick={onRefresh}
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
        Choose your preferred center and date to discover available time slots
        ⏰
      </p>

      {lastUpdatedPeriod && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Last updated: {lastUpdatedPeriod} • Auto-refreshes every 3 minutes
        </p>
      )}
    </div>
  );
}
