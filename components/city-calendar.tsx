"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import { format, isSameDay, addMonths, subMonths, parse } from "date-fns";

interface BookingDate {
  bookingDate: string;
  bookingDateStatus: number;
}

interface CityCalendarProps {
  centerId: number;
  centerName: string;
  dates: BookingDate[];
  onDateSelect: (centerId: number, date: string, city: string) => void;
  isLoading?: boolean;
  selectedDate?: { date: string; city: string } | null;
}

export function CityCalendar({
  centerId,
  centerName,
  dates,
  onDateSelect,
  isLoading,
  selectedDate,
}: CityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(
    parse(dates[0].bookingDate, "dd-MM-yyyy", new Date()),
  );

  // Convert booking dates to Date objects
  const availableDates = dates.map((dateObj) => {
    const [day, month, year] = dateObj.bookingDate.split("-");
    return new Date(
      Number.parseInt(year),
      Number.parseInt(month) - 1,
      Number.parseInt(day),
    );
  });

  // Check if a date is available
  const isDateAvailable = (date: Date) => {
    return availableDates.some((availableDate) =>
      isSameDay(date, availableDate),
    );
  };

  // Get the original date string format for API call
  const getDateString = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDateClick = (date: Date | undefined) => {
    if (date && isDateAvailable(date)) {
      const dateString = getDateString(date);
      onDateSelect(centerId, dateString, centerName);
    }
  };

  const isCurrentlyLoading = isLoading && selectedDate?.city === centerName;

  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div className="w-full">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-3 px-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={goToPreviousMonth}
          className="h-7 w-7 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {format(currentMonth, "MMM yyyy")}
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={goToNextMonth}
          className="h-7 w-7 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Calendar */}
      <div className="relative">
        <Calendar
          weekStartsOn={1}
          mode="single"
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          onSelect={handleDateClick}
          disabled={(date) => !isDateAvailable(date)}
          modifiers={{
            available: availableDates,
            loading: (date) => {
              if (!selectedDate || selectedDate.city !== centerName)
                return false;
              const [day, month, year] = selectedDate.date.split("-");
              const selectedDateObj = new Date(
                Number.parseInt(year),
                Number.parseInt(month) - 1,
                Number.parseInt(day),
              );
              return isSameDay(date, selectedDateObj);
            },
          }}
          modifiersStyles={{
            available: {
              backgroundColor: "rgb(34 197 94)",
              color: "white",
              fontWeight: "bold",
              borderRadius: "6px",
            },
            loading: {
              backgroundColor: "rgb(59 130 246)",
              color: "white",
              animation: "pulse 2s infinite",
            },
          }}
          className="w-full"
          classNames={{
            months: "flex w-full",
            month: "w-full",
            caption: "hidden", // Hide default caption since we have custom navigation
            table: "w-full border-collapse",
            head_row: "flex w-full",
            head_cell:
              "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem] flex-1 text-center",
            row: "flex w-full mt-1 space-x-1",
            cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 flex-1",
            day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-colors mx-auto",
            day_today:
              "bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100 font-semibold",
            day_disabled: "text-muted-foreground opacity-30 cursor-not-allowed",
            day_outside: "text-muted-foreground opacity-50",
          }}
        />

        {/* Loading overlay */}
        {isCurrentlyLoading && (
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center rounded-md">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <div className="w-4 h-4 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-medium">Loading...</span>
            </div>
          </div>
        )}
      </div>

      {/* Available dates count */}
      <div className="mt-3 text-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {dates.length > 0 ? (
            <>
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1" />
              {dates.length} available date{dates.length !== 1 ? "s" : ""}
            </>
          ) : (
            <>
              <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-1" />
              No dates available
            </>
          )}
        </span>
      </div>
    </div>
  );
}
