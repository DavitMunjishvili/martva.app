"use client";

import { Clock } from "lucide-react";

export function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="relative mb-6">
        <Clock className="w-20 h-20 mx-auto text-orange-300 dark:text-orange-600" />
        <span className="absolute inset-0 flex items-center justify-center text-3xl">
          ⚡
        </span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        All slots taken!
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Looks like all available hours were booked before you could get them.
        These slots go fast! 🏃‍♂️💨
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Try selecting a different date or check back later.
      </p>
    </div>
  );
}
