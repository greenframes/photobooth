/* Service Worker der Aschke Foto-Booth
   Beim ersten Laden wird alles Nötige gespeichert, danach läuft die App auch ohne Netz.
   Bei jeder Änderung an den Dateien die Versionsnummer in CACHE erhöhen. */
const CACHE = "aschke-booth-v2";
const SHELL = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "icons/apple-touch-icon.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      // cache: "reload" umgeht den HTTP-Cache des Servers, damit wirklich die neuen Dateien gespeichert werden
      .then(cache => cache.addAll(SHELL.map(u => new Request(u, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Aus dem Cache antworten (schnell, offlinefähig) und im Hintergrund aktualisieren
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req, { ignoreSearch: true });
    const refresh = fetch(req)
      .then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; })
      .catch(() => null);
    if (cached) { event.waitUntil(refresh); return cached; }
    const res = await refresh;
    if (res) return res;
    return req.mode === "navigate" ? (await cache.match("index.html")) || Response.error() : Response.error();
  })());
});
