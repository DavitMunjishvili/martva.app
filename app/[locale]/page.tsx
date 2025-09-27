"use client";

import { useAvailableDates } from "@/hooks/use-available-dates";
import { useDateSelection } from "@/hooks/use-date-selection";
import { CentersGrid } from "@/components/booking/centers-grid";
import { TimeSlotsModal } from "@/components/time-slots-modal";
import { RefreshControl } from "@/components/booking/refresh-control";

export default function BookingSystem() {
  const { centers, loading, refreshing, lastUpdated, fetchAvailableDates } =
    useAvailableDates();

  const { modalOpen, modalData, handleDateClick, handleModalClose } =
    useDateSelection();

  const handleRefresh = () => {
    fetchAvailableDates(true);
  };

  return (
    <>
      <RefreshControl
        lastUpdated={lastUpdated}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />

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

