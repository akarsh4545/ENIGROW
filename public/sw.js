self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("consultvault-shell-v2").then((cache) =>
      cache.addAll(["/offline.html"]),
    ),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== "consultvault-shell-v2")
          .map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // Never cache HTML navigations — keeps crawlers and users on fresh pages.
  const accept = event.request.headers.get("accept") || "";
  if (event.request.mode === "navigate" || accept.includes("text/html")) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("/offline.html")),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response.ok && url.pathname.startsWith("/icons/")) {
            const copy = response.clone();
            caches.open("consultvault-shell-v2").then((cache) => {
              cache.put(event.request, copy);
            });
          }
          return response;
        })
        .catch(() => cached);

      return cached || network;
    }),
  );
});
