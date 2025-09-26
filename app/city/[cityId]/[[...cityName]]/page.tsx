"use client";

import { Calendar } from "@/components/ui/calendar";
import { useCityInfo } from "@/hooks/use-city-info";
import { isSameDay } from "date-fns";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowLeft, RefreshCwIcon } from "lucide-react";
import Link from "next/link";

import { useDateSelection } from "@/hooks/use-date-selection";
import { TimeSlotsModal } from "@/components/time-slots-modal";

export default function CityCalendarPage() {
  const params = useParams();
  const cityId = Number.parseInt(params.cityId as string);

  const { cityInfo, loading, refreshing, fetchCityInfo } = useCityInfo(cityId);
  const { modalOpen, modalData, handleDateClick, handleModalClose } =
    useDateSelection();

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

  const onDateSelect = (date: Date | undefined) => {
    if (date && isDateAvailable(date)) {
      const dateString = getDateString(date);
      handleDateClick(cityId, dateString, cityInfo.centerName);
    }
  };

  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="flex items-center justify-between w-full max-w-xs mb-4">
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
          <h1 className="text-2xl font-bold">{cityInfo.centerName}</h1>
        </div>
        <Card className="max-w-xs flex flex-col w-full h-full transition-all duration-300 hover:shadow-xl border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/40 dark:to-emerald-900/40">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Available Dates
              <button onClick={() => fetchCityInfo(true)} disabled={refreshing}>
                <RefreshCwIcon
                  className={cn("h-5 w-5", refreshing && "animate-spin")}
                />
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent className="my-auto">
            <Calendar
              weekStartsOn={1}
              showOutsideDays={false}
              mode="single"
              onSelect={onDateSelect}
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
          </CardContent>
        </Card>
      </div>
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
