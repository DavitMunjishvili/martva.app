"use client";

import { Clock } from "lucide-react";
import { useTranslations } from "next-intl";

export function EmptyState() {
  const t = useTranslations();

  return (
    <div className="text-center py-12">
      <div className="relative mb-6">
        <Clock className="w-20 h-20 mx-auto text-orange-300 dark:text-orange-600" />
        <span className="absolute inset-0 flex items-center justify-center text-3xl">
          ⚡
        </span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        {t("all_slots_taken")}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {t("all_slots_taken_description")}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {t("try_different_date")}
      </p>
    </div>
  );
}
