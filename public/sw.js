self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("consultvault-shell-v1").then((cache) =>
      cache.addAll(["/", "/offline.html"]),
    ),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open("consultvault-shell-v1").then((cache) => {
            cache.put(event.request, copy);
          });
          return response;
        })
        .catch(() => cached || caches.match("/offline.html"));

      return cached || network;
    }),
  );
});
