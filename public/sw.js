// Service Worker for Crush Café
const CACHE_NAME = 'crush-cafe-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/main.js',
  '/assets/vendor.js',
  '/assets/react.js',
  '/gallery/bar.jpg',
  '/gallery/customers.jpg',
  '/gallery/drinks.jpg',
  '/gallery/food.jpg',
  '/gallery/interior.jpg',
  '/gallery/outdoor.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(error => {
        console.warn('Failed to cache some resources:', error);
      })
  );
});

self.addEventListener('fetch', event => {
  // Skip non-GET requests and chrome-extension requests
  if (event.request.method !== 'GET' || 
      event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached response if found
      if (response) {
        return response;
      }

      // For non-cached requests, fetch from network
      return fetch(event.request).then(response => {
        // Only cache valid responses
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Don't cache data URLs
        if (response.url.startsWith('data:')) {
          return response;
        }

        // Clone the response for caching
        const responseToCache = response.clone();

        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache).catch(error => {
              console.warn('Failed to cache response:', error);
            });
          });

        return response;
      }).catch(error => {
        console.warn('Fetch failed; returning offline page', error);
        // You could return a custom offline page here
        return new Response('You are offline', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      });
    })
  );
});
