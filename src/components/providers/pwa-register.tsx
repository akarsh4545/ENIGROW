"use client";

import { useEffect } from "react";

/**
 * Registers a lightweight service worker for basic PWA offline caching.
 */
export function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    void navigator.serviceWorker.register("/sw.js").catch((error) => {
      console.error("SW registration failed:", error);
    });
  }, []);

  return null;
}
