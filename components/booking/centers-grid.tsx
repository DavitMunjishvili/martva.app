"use client";

import { CenterCardSkeleton } from "@/components/skeleton-loaders";
import { CenterCard } from "./center-card";
import type { Center } from "@/hooks/use-booking-data";
import type { SelectedDate } from "@/hooks/use-date-selection";

interface CentersGridProps {
  centers: Center[];
  loading: boolean;
  selectedDate: SelectedDate | null;
  onDateSelect: (centerId: number, date: string, city: string) => void;
}

export function CentersGrid({
  centers,
  loading,
  selectedDate,
  onDateSelect,
}: CentersGridProps) {
  return (
    <div className="relative grid justify-center gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <CenterCardSkeleton />
      {loading ? (
        <SkeletonGrid />
      ) : (
        centers.map((center, index) => (
          <CenterCard
            key={center.centerName}
            center={center}
            index={index}
            selectedDate={selectedDate}
            onDateSelect={onDateSelect}
          />
        ))
      )}
    </div>
  );
}

function SkeletonGrid() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <CenterCardSkeleton key={index} />
      ))}
    </>
  );
}
