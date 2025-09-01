"use client";
import { useBrowserNotifications } from "@/hooks/use-notification";
import { Button } from "./ui/button";
import {
  BellIcon,
  MoonIcon,
  SparklesIcon,
  SunIcon,
  SunMoonIcon,
} from "lucide-react";
import { useTheme } from "next-themes";

export function Header() {
  const { requestPermission, permission } = useBrowserNotifications();

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <div className="mb-8 flex items-center justify-between">
      <div className="relative inline-block">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
          Martva.app
        </h1>
        <SparklesIcon className="w-6 h-6 text-yellow-500 absolute top-0 right-0 translate-x-full animate-bounce" />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          {permission === "default" && (
            <Button
              onClick={requestPermission}
              variant="outline"
              className="rounded-full border-2 hover:scale-105 transition-transform"
            >
              <BellIcon />
              Enable notifications
            </Button>
          )}
          <Button
            onClick={toggleTheme}
            variant="outline"
            size="icon"
            className="rounded-full border-2 hover:scale-105 transition-transform"
          >
            {theme === "light" ? (
              <MoonIcon className="w-4 h-4 text-blue-600" />
            ) : theme === "system" ? (
              <SunMoonIcon className="w-4 h-4 text-blue-600" />
            ) : (
              <SunIcon className="w-4 h-4 text-yellow-500" />
            )}
          </Button>
          {/* <Button */}
          {/*   onClick={onRefresh} */}
          {/*   disabled={refreshing} */}
          {/*   variant="outline" */}
          {/*   className="rounded-full border-2 hover:scale-105 transition-transform" */}
          {/* > */}
          {/*   <RefreshCw */}
          {/*     className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} */}
          {/*   /> */}
          {/*   Refresh */}
          {/* </Button> */}
        </div>
      </div>
    </div>
  );
}
