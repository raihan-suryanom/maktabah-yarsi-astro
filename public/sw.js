const cacheName = "v1";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => console.info("Service Worker registration successful:"))
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
} else {
  console.info("Service Worker is not supported in this browser.");
}

// Call Install Event
self.addEventListener("install", (e) => {
  console.info("Service Worker: Installed");
});

// Call Activate Event
self.addEventListener("activate", (e) => {
  console.info("Service Worker: Activated");
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.info("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        }),
      );
    }),
  );
});

self.addEventListener("fetch", (event) => {
  const requestUrl = event.request.url;

  // Check if request URL matches font file pattern (or your desired pattern)
  if (/hoisted-\.|sw\.|\.(woff2?|css)\??.*$/.test(requestUrl)) {
    event.respondWith(
      caches.match(requestUrl).then((cachedResponse) => {
        // Return cached response if available
        if (cachedResponse) {
          return cachedResponse;
        }

        // Fallback to network and update cache
        return fetch(event.request).then((response) => {
          const cacheCopy = response.clone();

          caches.open(cacheName).then((cache) => {
            cache.put(requestUrl, cacheCopy);
          });

          return response;
        });
      }),
    );
  }
});
