self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("app-cache-v1").then((cache) => {
      return cache.addAll(["/"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const url = event.request.url;

  // 👇 Bypass service worker completely for video/media files
  // so browser can handle range requests (needed for <video> to play properly)
  const isMedia = /\.(mp4|webm|mov|ogg|mp3|wav)$/i.test(url);
  if (isMedia || event.request.headers.has("range")) {
    return; // let the browser handle it directly, no caching/interception
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
