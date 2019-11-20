var cacheName = 'cachePWA';
var contentToCache = [
  	'/icon/icon_192.png',
	'/icon/icon_502.png',
	'/images/barcode_scanner.png',
	'/images/icon-cart.png',
	'/images/icon-setup.png',
	'/images/icon-transmite.png',
	'/images/logo.png',
	'/js/app.js',
	'/js/DecoderWorker.js',
	'/js/exif.js',
	'/js/jobs',
	'/favicon.ico',
	'/index.html',
	'/manifest.json',
	'/produits.csv',
	'/style.css',
	'/testService.js',
	
];

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
          console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
          console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});
