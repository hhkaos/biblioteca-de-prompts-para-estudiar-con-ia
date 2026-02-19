const CACHE_VERSION = "prompts-estudio-v4";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./collab-config.js",
  "./manifest.webmanifest",
  "./assets/icons/favicon-16.png",
  "./assets/icons/favicon-32.png",
  "./assets/icons/apple-touch-icon.png",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png"
];
const OPTIONAL_CONTENT_ASSETS = [
  "../content/phases.json",
  "../content/examples/index.json",
  "./content/phases.json",
  "./content/examples/index.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    await cache.addAll(APP_SHELL);
    await Promise.allSettled(
      OPTIONAL_CONTENT_ASSETS.map(async (assetPath) => {
        const response = await fetch(assetPath);
        if (response.ok) {
          await cache.put(assetPath, response);
        }
      })
    );
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const cloned = networkResponse.clone();
          event.waitUntil(
            caches.open(CACHE_VERSION).then((cache) => {
              cache.put(event.request, cloned);
            })
          );
        }
        return networkResponse;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }

        if (event.request.mode === "navigate") {
          return caches.match("./index.html");
        }

        throw new Error("No network and no cached response available");
      })
  );
});
