"use client";

import { useEffect } from "react";

const ServiceWorkerGuard = () => {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return undefined;
    }

    const isDev = process.env.NODE_ENV === "development";

    if (!isDev) {
      return undefined;
    }

    let cancelled = false;

    const clearStaleWorkers = async () => {
      const registrations = await navigator.serviceWorker.getRegistrations();

      await Promise.all(
        registrations.map((registration) => registration.unregister())
      );

      if ("caches" in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      }

      if (!cancelled && registrations.length > 0) {
        window.location.reload();
      }
    };

    clearStaleWorkers().catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
};

export default ServiceWorkerGuard;
