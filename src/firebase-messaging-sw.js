importScripts('https://www.gstatic.com/firebasejs/9.1.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.1/firebase-messaging-compat.js');


firebase.initializeApp({
  // databaseURL: 'https://project-id.firebaseio.com',
  apiKey: 'AIzaSyDdEGRzHdLxARKkpCDYslAinqmLNQrWACA',
    authDomain: 'ionic-fpn.firebaseapp.com',
    projectId: 'ionic-fpn',
    storageBucket: 'ionic-fpn.appspot.com',
    messagingSenderId: '624102673415',
    appId: '1:624102673415:web:10d2e5e12dc071f84a2ea2',
    measurementId: 'G-4ZFDJ4SDF1'
});
firebase.messaging();
// const messaging = firebase.messaging();
