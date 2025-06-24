"use client"

import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, MapPin } from "lucide-react"
import { formatDateLong } from "@/utils/date-formatter"

interface ModalHeaderProps {
  centerName: string
  date: string
}

export function ModalHeader({ centerName, date }: ModalHeaderProps) {
  return (
    <DialogHeader>
      <DialogTitle className="flex items-center gap-3 text-xl">
        <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-800">
          <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div className="flex flex-col items-start gap-1">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Available Time Slots
          </span>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            <span>{centerName}</span>
            <Badge variant="outline" className="text-xs">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDateLong(date)}
            </Badge>
          </div>
        </div>
      </DialogTitle>
    </DialogHeader>
  )
}
