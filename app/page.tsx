"use client";

import { useAvailableDates } from "@/hooks/use-available-dates";
import { useDateSelection } from "@/hooks/use-date-selection";
import { CentersGrid } from "@/components/booking/centers-grid";
import { TimeSlotsModal } from "@/components/time-slots-modal";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

export default function BookingSystem() {
  const { centers, loading, refreshing, lastUpdated, fetchAvailableDates } =
    useAvailableDates();

  const { modalOpen, modalData, handleDateClick, handleModalClose } =
    useDateSelection();

  const handleRefresh = () => {
    fetchAvailableDates(true);
  };

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
    <>
      <div className="flex justify-end items-center mb-6">
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {lastUpdatedPeriod} • Auto-refreshes every 3 minutes
          </p>
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

      <CentersGrid
        centers={centers}
        loading={loading}
        onDateSelect={handleDateClick}
      />

      <TimeSlotsModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        centerId={modalData?.centerId || null}
        centerName={modalData?.centerName || ""}
        date={modalData?.date || ""}
      />
    </>
  );
}
