"use client";

import { useBookingData } from "@/hooks/use-booking-data";
import { useDateSelection } from "@/hooks/use-date-selection";
import { useThemeToggle } from "@/hooks/use-theme-toggle";
import { BookingLayout } from "@/components/booking/booking-layout";
import { PageHeader } from "@/components/booking/page-header";
import { CentersGrid } from "@/components/booking/centers-grid";
import { TimeSlotsModal } from "@/components/time-slots-modal";

export default function BookingSystem() {
  const {
    centers,
    loading,
    refreshing,
    lastUpdatedPeriod,
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
  const { theme, toggleTheme } = useThemeToggle();

  const handleRefresh = () => {
    fetchAvailableDates(true);
  };

  return (
    <BookingLayout>
      <PageHeader
        onRefresh={handleRefresh}
        refreshing={refreshing}
        lastUpdatedPeriod={lastUpdatedPeriod}
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
    </BookingLayout>
  );
}
