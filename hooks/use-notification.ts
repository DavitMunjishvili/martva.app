import { useCallback, useEffect, useState } from "react";

interface NotificationOptions {
  title: string;
  body?: string;
  icon?: string;
  tag?: string;
  onClick?: () => void;
}

export const useBrowserNotifications = () => {
  const [permission, setPermission] =
    useState<NotificationPermission>("default");

  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!("Notification" in window)) return;

    const result = await Notification.requestPermission();
    setPermission(result);
  }, []);

  const showNotification = useCallback(
    ({ title, body, icon, tag, onClick }: NotificationOptions) => {
      if (!("Notification" in window)) return;

      if (permission === "granted") {
        const notification = new Notification(title, { body, icon, tag });

        if (onClick) {
          notification.onclick = (event) => {
            event.preventDefault();
            onClick();
          };
        }
      }
    },
    [permission],
  );

  return {
    permission,
    requestPermission,
    showNotification,
  };
};
