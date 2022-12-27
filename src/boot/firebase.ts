import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: 'AIzaSyBEHXoU47YLq7_L3xmkAJra8Wv_lo5ByV0',
  authDomain: 'jesuisla-moi.firebaseapp.com',
  projectId: 'jesuisla-moi',
  storageBucket: 'jesuisla-moi.appspot.com',
  messagingSenderId: '679262948635',
  appId: '1:679262948635:web:1b9f0437b6e1e8110357be',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { app, auth };
