importScripts(
  "https://www.gstatic.com/firebasejs/10.5.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.5.2/firebase-messaging-compat.js"
);
const firebaseConfig = {
  apiKey: "AIzaSyBvU-H43u2LHx4HptlUJts7CsB9Lja-wS4",
  authDomain: "r-sell-c0d98.firebaseapp.com",
  projectId: "r-sell-c0d98",
  storageBucket: "r-sell-c0d98.appspot.com",
  messagingSenderId: "764479888397",
  appId: "1:764479888397:web:2bbfc4846749fc29c48944",
  measurementId: "G-JEKQPFGC8E",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./logo.png",
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
