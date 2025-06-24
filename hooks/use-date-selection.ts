"use client"

import { useState } from "react"

export interface SelectedDate {
  date: string
  city: string
}

export interface ModalData {
  centerId: number
  centerName: string
  date: string
}

export function useDateSelection() {
  const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState<ModalData | null>(null)

  const handleDateClick = (centerId: number, date: string, city: string) => {
    setSelectedDate({ date, city })
    setModalData({ centerId, centerName: city, date })
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setModalData(null)
    setSelectedDate(null)
  }

  return {
    selectedDate,
    modalOpen,
    modalData,
    handleDateClick,
    handleModalClose,
  }
}
