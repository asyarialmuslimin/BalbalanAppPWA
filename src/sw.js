import 'regenerator-runtime';

import {
    precacheAndRoute
} from 'workbox-precaching';
import {
    registerRoute
} from 'workbox-routing';
import {
    setCacheNameDetails,
    skipWaiting,
    clientsClaim
} from 'workbox-core';
import {
    NetworkFirst
} from 'workbox-strategies';
import {
    CacheableResponsePlugin
} from 'workbox-cacheable-response';
import {
    ExpirationPlugin
} from 'workbox-expiration';

skipWaiting();
clientsClaim();

setCacheNameDetails({
    prefix: 'balbalan',
    suffix: 'v2'
});

precacheAndRoute(self.__WB_MANIFEST || []);

registerRoute(
    /https:\/\/api\.football-data\.org\/v2/,
    new NetworkFirst({
        cacheName: "balbalan",
        networkTimeoutSeconds: 3,
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24,
                maxEntry: 30,
            })
        ]
    }),
);

self.addEventListener('push', function (event) {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    const options = {
        body: body,
        badge: '/assets/icons/icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Balbalan App', options)
    );
});