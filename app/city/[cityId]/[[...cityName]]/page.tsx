"use client";

import { Calendar } from "@/components/ui/calendar";
import { CityInfoResponse, useCityInfo } from "@/hooks/use-city-info";
import { isSameDay } from "date-fns";
import { useEffect, useState } from "react";

export default function CityCalendarPage() {
  const [loading, setLoading] = useState(true);
  const [cityInfo, setCityInfo] = useState<CityInfoResponse>(null);
  const { fetchCityInfo } = useCityInfo(15);

  useEffect(() => {
    fetchCityInfo().then((e) => {
      setCityInfo(e);
      setLoading(false);
    });
  }, [fetchCityInfo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cityInfo) {
    return <div>City not found</div>;
  }

  const availableDates = cityInfo.dates.map((dateObj) => {
    const [day, month, year] = dateObj.bookingDate.split("-");
    return new Date(
      Number.parseInt(year),
      Number.parseInt(month) - 1,
      Number.parseInt(day),
    );
  });

  return (
    <div>
      <h1>{cityInfo.centerName}</h1>
      <Calendar
        weekStartsOn={1}
        showOutsideDays={false}
        mode="single"
        disabled={(date) =>
          !availableDates.some((availableDate) =>
            isSameDay(date, availableDate),
          )
        }
        modifiers={{
          available: availableDates,
        }}
        className="w-full"
        classNames={{
          day_button: "hover:bg-green-600",
        }}
        modifiersClassNames={{ available: "[&>button]:bg-green-500" }}
      />
    </div>
  );
}
