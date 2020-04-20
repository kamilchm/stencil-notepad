// change to the version you get from `npm ls workbox-build`
importScripts('workbox-v4.3.1/workbox-sw.js');

// your custom service worker code

self.workbox.routing.registerRoute(
  /\.js$/,
  new self.workbox.strategies.NetworkFirst()
);

self.workbox.routing.registerRoute(
  /[a-z]-.+\.js$/,
  new self.workbox.strategies.CacheFirst({
    cacheName: "components-cache"
  })
);

self.workbox.routing.registerRoute(
  /\.css$/,
  new self.workbox.strategies.StaleWhileRevalidate({
    cacheName: 'css-cache',
  }),
);

// the precache manifest will be injected into the following line
self.workbox.precaching.precacheAndRoute([]);
