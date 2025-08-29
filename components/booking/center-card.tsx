"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLinkIcon, MapPin } from "lucide-react";
import { CityCalendar } from "@/components/city-calendar";
import type { Center } from "@/hooks/use-available-dates";
import type { SelectedDate } from "@/hooks/use-date-selection";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CenterCardProps {
  center: Center;
  selectedDate: SelectedDate | null;
  onDateSelect: (centerId: number, date: string, city: string) => void;
}

export function CenterCard({ center, onDateSelect }: CenterCardProps) {
  const hasAvailableDates = center.dates.length > 0;

  return (
    <Card
      className={`max-w-xs flex flex-col w-full h-full transition-all duration-300 hover:shadow-xl border-2 ${
        hasAvailableDates
          ? "border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/40 dark:to-emerald-900/40"
          : "border-gray-300 dark:border-gray-600 bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-800/40 dark:to-slate-800/40 opacity-75"
      }`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div
            className={`p-2 rounded-full ${
              hasAvailableDates
                ? "bg-green-100 dark:bg-green-800"
                : "bg-gray-200 dark:bg-gray-600"
            }`}
          >
            <MapPin
              className={`w-5 h-5 ${
                hasAvailableDates
                  ? "text-green-600 dark:text-green-400"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            />
          </div>
          <span
            className={`font-semibold ${
              hasAvailableDates
                ? "text-gray-800 dark:text-gray-200"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {center.centerName}
          </span>
          <Link
            href={`/city/${center.centerId}`}
            aria-label={`View more details about ${center.centerName}`}
            className={cn(
              hasAvailableDates
                ? "text-green-600 dark:text-green-400"
                : "text-gray-400 dark:text-gray-500",
            )}
          >
            <ExternalLinkIcon />
          </Link>
          <Badge
            variant={hasAvailableDates ? "default" : "secondary"}
            className={`ml-auto ${
              hasAvailableDates
                ? "bg-green-500 hover:bg-green-600 text-green-900"
                : "bg-gray-400 dark:bg-gray-500 text-gray-100 dark:text-gray-300"
            }`}
          >
            {hasAvailableDates ? `🎯 ${center.dates.length}` : "😴 None"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="my-auto">
        {hasAvailableDates ? (
          <CityCalendar
            centerId={center.centerId}
            centerName={center.centerName}
            dates={center.dates}
            onDateSelect={onDateSelect}
          />
        ) : (
          <EmptyDateState />
        )}
      </CardContent>
    </Card>
  );
}

function EmptyDateState() {
  return (
    <div className="text-center py-8 text-gray-400 dark:text-gray-500">
      <div className="relative">
        <Calendar className="w-16 h-16 mx-auto mb-3 opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl opacity-50">😴</span>
        </div>
      </div>
      <p className="font-medium text-sm">No available dates</p>
      <p className="text-xs mt-1 opacity-75">Check back later!</p>
    </div>
  );
}
