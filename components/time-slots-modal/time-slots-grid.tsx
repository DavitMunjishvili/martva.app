"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import type { AvailableHoursResponse } from "@/hooks/use-booking-data";

interface TimeSlotsGridProps {
  availableHours: AvailableHoursResponse[];
}

export function TimeSlotsGrid({ availableHours }: TimeSlotsGridProps) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <Badge
          variant="secondary"
          className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
        >
          🎉 {availableHours.length} slot
          {availableHours.length !== 1 ? "s" : ""} available
        </Badge>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
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
      <style jsx>{`
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
