import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CenterCardSkeleton() {
  return (
    <Card
      className="max-w-xs w-full h-fit transition-all duration-300 hover:shadow-xl border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
      style={{
        animationDelay: "100ms",
        animation: "fadeInUp 0.6s ease-out forwards",
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-5 w-24 flex-1" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </CardHeader>
      <CardContent>
        {/* Calendar skeleton */}
        <div className="space-y-3">
          {/* Month navigation */}
          <div className="flex items-center justify-between px-1">
            <Skeleton className="h-7 w-7 rounded" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-7 w-7 rounded" />
          </div>

          {/* Calendar grid */}
          <div className="space-y-1">
            {/* Week headers */}
            <div className="flex w-full gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-8 flex-1" />
              ))}
            </div>

            {/* Calendar days */}
            {Array.from({ length: 5 }).map((_, weekIndex) => (
              <div key={weekIndex} className="flex w-full gap-1">
                {Array.from({ length: 7 }).map((_, dayIndex) => (
                  <Skeleton
                    key={dayIndex}
                    className="h-8 w-8 flex-1 rounded-md"
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Available dates count */}
          <div className="text-center mt-3">
            <Skeleton className="h-3 w-32 mx-auto" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TimeSlotsSkeleton() {
  return (
    <Card className="mb-8 border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <div className="ml-auto">
            <Skeleton className="h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} className="h-12 rounded-md" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
