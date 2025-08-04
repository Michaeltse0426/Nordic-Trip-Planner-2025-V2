const CACHE_NAME = "nordic-trip-cache-v2";
const urlsToCache = ["index.html", "style.css", "script.js", "manifest.json", "itinerary.json"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
