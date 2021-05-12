/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/7.22.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.22.1/firebase-messaging.js'
);

const config = {
  apiKey: 'AIzaSyD2BytZvoOh9qVQSV-z3xS6xwy4YcHZBts',
  authDomain: 'thesis-32c47.firebaseapp.com',
  databaseURL:
    'https://thesis-32c47-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'thesis-32c47',
  storageBucket: 'thesis-32c47.appspot.com',
  messagingSenderId: '228852574226',
  appId: '1:228852574226:web:e76850642fe69cd40250cb',
};
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp(config);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // Exit early if we don't get the client.
  // Eg, if it closed.
  // if (!client) return;
  clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then((windowClients) =>
      windowClients.map((w) => {
        return w.postMessage(payload);
      })
    );
});
