import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { getDefaultClassNames } from "react-day-picker";
import { buttonVariants } from "./ui/button";
import { useTranslations } from "next-intl";

export function CenterCardSkeleton() {
  const t = useTranslations();
  const defaultClassNames = getDefaultClassNames();

  return (
    <Card className="max-w-xs w-full h-fit transition-all duration-300 hover:shadow-xl border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/40 dark:to-emerald-900/40">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-full bg-green-100 dark:bg-green-800">
            <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            <Skeleton className="w-full h-full">
              <span className="opacity-0 select-none">{t("loading")}</span>
            </Skeleton>
          </span>
          <Skeleton className="ml-auto rounded-full border border-transparent px-2.5 py-0.5 h-5.5 w-11" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          weekStartsOn={1}
          mode="single"
          month={new Date()}
          className="w-full"
          classNames={{
            day_button:
              "!animate-pulse bg-muted !text-transparent !hover:text-transparent [&>button]:!hover:text-transparent",
            weekday: cn(
              "rounded-md flex-1 font-normal text-[0.8rem] select-none",
              defaultClassNames.weekday,
              "animate-pulse text-transparent bg-muted",
            ),
            month_caption: cn(
              "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
              defaultClassNames.month_caption,
              "animate-pulse text-transparent bg-muted rounded-md",
            ),
            today: cn(
              "text-accent-foreground rounded-md data-[selected=true]:rounded-none",
              defaultClassNames.today,
            ),
            button_previous: cn(
              buttonVariants({ variant: "ghost" }),
              "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none text-transparent",
              defaultClassNames.button_previous,
            ),
            button_next: cn(
              buttonVariants({ variant: "ghost" }),
              "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none text-transparent",
              defaultClassNames.button_next,
            ),
          }}
        />
      </CardContent>
    </Card>
  );
}
