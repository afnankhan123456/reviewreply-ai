// public/service-worker.js

const CACHE_NAME = "app-cache-v2"; // 👈 har naye deploy pe ye version number badha dena

self.addEventListener("install", (event) => {
  self.skipWaiting(); // naya service worker turant activate ho
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(["/"]);
    })
  );
});

self.addEventListener("activate", (event) => {
  // Purane cache versions delete karo taaki stale files kabhi serve na hon
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
      )
    )
  );
  self.clients.claim(); // sabhi open tabs pe turant naya worker control le le
});

self.addEventListener("fetch", (event) => {
  const url = event.request.url;

  // 👇 Bypass service worker completely for video/media files
  // so browser can handle range requests (needed for <video> to play properly)
  const isMedia = /\.(mp4|webm|mov|ogg|mp3|wav)$/i.test(url);
  if (isMedia || event.request.headers.has("range")) {
    return; // let the browser handle it directly, no caching/interception
  }

  // Pehle network try karo (naya build turant milega), sirf offline hone par cache use karo
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
