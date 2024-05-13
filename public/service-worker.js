/* eslint-env worker */

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener(
  'push',
  /** @type {(event: PushEvent) => void} */ (
    (event) => {
      const body = event.data.text();
      event.waitUntil(self.registration.showNotification('Niet vergeten, hè!', { body }));
    }
  ),
);

console.log('SW loadedddd');
