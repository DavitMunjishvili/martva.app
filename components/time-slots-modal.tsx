"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ModalHeader } from "./time-slots-modal/modal-header";
import { LoadingState } from "./time-slots-modal/loading-state";
import { ErrorState } from "./time-slots-modal/error-state";
import { EmptyState } from "./time-slots-modal/empty-state";
import { TimeSlotsGrid } from "./time-slots-modal/time-slots-grid";
import type { AvailableHoursResponse } from "@/hooks/use-available-hours";
import { useAvailableHours } from "@/hooks/use-available-hours";

interface TimeSlotsModalProps {
  isOpen: boolean;
  onClose: () => void;
  centerId: number | null;
  centerName: string;
  date: string;
}

export function TimeSlotsModal({
  isOpen,
  onClose,
  centerId,
  centerName,
  date,
}: TimeSlotsModalProps) {
  const { fetchAvailableHours } = useAvailableHours();
  const [availableHours, setAvailableHours] = useState<
    AvailableHoursResponse[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && centerId && date && centerName) {
      const fetchHours = async () => {
        setLoading(true);
        setError(null);
        setAvailableHours([]);

        try {
          const hours = await fetchAvailableHours(centerId, date);
          setAvailableHours(hours || []);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch hours",
          );
        } finally {
          setLoading(false);
        }
      };

      fetchHours();
    }
  }, [isOpen, centerId, date, centerName, fetchAvailableHours]);

  const handleClose = () => {
    setTimeout(() => {
      setAvailableHours([]);
      setError(null);
    }, 150);
    onClose();
  };

  const renderContent = () => {
    if (loading) return <LoadingState />;
    if (error) return <ErrorState error={error} />;
    if (availableHours.length === 0) return <EmptyState />;
    return <TimeSlotsGrid availableHours={availableHours} />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[80vw] w-max max-h-[80vh] overflow-y-auto">
        <ModalHeader centerName={centerName} date={date} />
        <div className="mt-4">{renderContent()}</div>
      </DialogContent>
    </Dialog>
  );
}
