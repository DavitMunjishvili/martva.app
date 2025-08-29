"use client";

import { CenterCardSkeleton } from "@/components/skeleton-loaders";
import { CenterCard } from "./center-card";
import { Center } from "@/hooks/use-available-dates";

interface CentersGridProps {
  centers: Center[];
  loading: boolean;
  onDateSelect: (centerId: number, date: string, city: string) => void;
}

export function CentersGrid({
  centers,
  loading,
  onDateSelect,
}: CentersGridProps) {
  return (
    <div className="grid justify-center justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {loading ? (
        <SkeletonGrid />
      ) : (
        centers.map((center) => (
          <CenterCard
            key={center.centerName}
            center={center}
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
