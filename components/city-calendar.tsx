"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { isSameDay, parse } from "date-fns";
import { enUS, ka } from "react-day-picker/locale";
import { useLocale } from "next-intl";

interface BookingDate {
  bookingDate: string;
  bookingDateStatus: number;
}

interface CityCalendarProps {
  centerId: number;
  centerName: string;
  dates: BookingDate[];
  onDateSelect: (centerId: number, date: string, city: string) => void;
}

export function CityCalendar({
  centerId,
  centerName,
  dates,
  onDateSelect,
}: CityCalendarProps) {
  const locale = useLocale();
  const [currentMonth, setCurrentMonth] = useState(
    parse(dates[0].bookingDate, "dd-MM-yyyy", new Date()),
  );

  const availableDates = dates.map((dateObj) => {
    const [day, month, year] = dateObj.bookingDate.split("-");
    return new Date(
      Number.parseInt(year),
      Number.parseInt(month) - 1,
      Number.parseInt(day),
    );
  });

  const isDateAvailable = (date: Date) => {
    return availableDates.some((availableDate) =>
      isSameDay(date, availableDate),
    );
  };

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

  return (
    <Calendar
      locale={locale === "ka" ? ka : enUS}
      weekStartsOn={1}
      showOutsideDays={false}
      mode="single"
      month={currentMonth}
      onMonthChange={setCurrentMonth}
      onSelect={handleDateClick}
      disabled={(date) => !isDateAvailable(date)}
      modifiers={{
        available: availableDates,
      }}
      className="w-full"
      classNames={{
        day_button: "hover:bg-green-600",
      }}
      modifiersClassNames={{ available: "[&>button]:bg-green-500" }}
    />
  );
}
