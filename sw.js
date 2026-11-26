/* Plotbook service worker — 193
   Everything the app needs is cached on install, so it opens with no connection. */
const V = 'plotbook-193';
const ASSETS = [
  './', './index.html', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './apple-touch-icon.png',
  './vendor/jspdf.umd.min.js', './vendor/jszip.min.js',
  './vendor/pdfjs/pdf.min.js', './vendor/pdfjs/pdf.worker.min.js'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const sameOrigin = new URL(r.url).origin === location.origin;
  if (sameOrigin) {
    /* the app shell: serve from cache, refresh it in the background */
    e.respondWith(caches.match(r).then(hit => {
      const net = fetch(r).then(res => {
        if (res && res.ok) caches.open(V).then(c => c.put(r, res.clone()));
        return res;
      }).catch(() => hit);
      return hit || net;
    }));
  } else {
    /* fonts and anything else outside: try the network, fall back to whatever was cached */
    e.respondWith(fetch(r).then(res => {
      if (res && res.ok) { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); }
      return res;
    }).catch(() => caches.match(r)));
  }
});
