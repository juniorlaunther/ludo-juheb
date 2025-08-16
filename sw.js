const CACHE_NAME = 'ludo-juheb-v3';
const APP_SHELL = ['./','./index.html','./manifest.webmanifest'];
self.addEventListener('install', (event) => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))); self.skipWaiting(); });
self.addEventListener('activate', (event) => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', (event) => {
  const req = event.request; if(req.method !== 'GET') return;
  event.respondWith(fetch(req).then(res => { const clone = res.clone(); caches.open(CACHE_NAME).then(c => c.put(req, clone)); return res; }).catch(()=> caches.match(req).then(cached => cached || caches.match('./index.html'))));
});
