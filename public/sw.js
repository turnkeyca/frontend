const CACHE_NAME = "v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/login",
        "/renter",
        "/android-chrome-192x192.png",
        "/apple-touch-icon.png",
        "/favicon-16x16.png",
        "/favicon-32x32.png",
        "/favicon.ico",
      ]);
    })
  );
  console.log("service worker installed");
});

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });
