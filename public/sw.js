// Service Worker for Crush Café
const CACHE_NAME = 'crush-cafe-v2';
const urlsToCache = [
  '/',
  '/index.html'
];

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(resources);
};

const putInCache = async (request, response) => {
  if (!request.url.startsWith('http')) {
    return; // Skip non-http(s) requests
  }
  
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
};

const cacheFirst = async (request) => {
  // Skip non-GET requests and non-http(s) requests
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return fetch(request);
  }

  // Skip cross-origin requests that we can't cache
  if (!request.url.startsWith(self.location.origin)) {
    return fetch(request);
  }

  try {
    // Try to get the response from the cache first
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
      return responseFromCache;
    }

    // If not in cache, try the network
    const responseFromNetwork = await fetch(request);
    
    // Only cache successful responses and not data URLs
    if (responseFromNetwork && responseFromNetwork.status === 200 && 
        responseFromNetwork.type === 'basic' && 
        !responseFromNetwork.url.startsWith('data:')) {
      // Clone the response for caching
      const responseToCache = responseFromNetwork.clone();
      putInCache(request, responseToCache).catch(error => {
        console.warn('Failed to cache response:', error);
      });
    }
    
    return responseFromNetwork;
  } catch (error) {
    console.warn('Fetch failed; returning offline page', error);
    return new Response('You are offline', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    });
  }
};

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    addResourcesToCache(urlsToCache).catch(error => {
      console.warn('Failed to cache during install:', error);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - handle all network requests
self.addEventListener('fetch', (event) => {
  event.respondWith(cacheFirst(event.request));
});

// Handle message event (can be used to update the service worker)
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
