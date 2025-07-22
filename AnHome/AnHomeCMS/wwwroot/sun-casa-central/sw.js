const CACHE_NAME = 'sun-casa-v1';
const urlsToCache = [
    '/',
    '/css/style.css',
    '/js/main.js',
    '/assets/logo/LOGO-SUN-CASA-CENTRAL.png',
    '/assets/logo/banner.mp4'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});