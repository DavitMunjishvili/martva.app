"use client";

import { useBookingData } from "@/hooks/use-booking-data";
import { useDateSelection } from "@/hooks/use-date-selection";
import { PageHeader } from "@/components/booking/page-header";
import { CentersGrid } from "@/components/booking/centers-grid";
import { TimeSlotsModal } from "@/components/time-slots-modal";
import { useTheme } from "next-themes";

export default function BookingSystem() {
  const {
    centers,
    loading,
    refreshing,
    lastUpdated,
    fetchAvailableDates,
    fetchAvailableHours,
  } = useBookingData();
  const {
    selectedDate,
    modalOpen,
    modalData,
    handleDateClick,
    handleModalClose,
  } = useDateSelection();

  const { theme, setTheme } = useTheme();

  const handleRefresh = () => {
    fetchAvailableDates(true);
  };

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <PageHeader
        onRefresh={handleRefresh}
        refreshing={refreshing}
        lastUpdated={lastUpdated}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <CentersGrid
        centers={centers}
        loading={loading}
        selectedDate={selectedDate}
        onDateSelect={handleDateClick}
      />

      <TimeSlotsModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        centerId={modalData?.centerId || null}
        centerName={modalData?.centerName || ""}
        date={modalData?.date || ""}
        onFetchHours={fetchAvailableHours}
      />
    </>
  );
}
