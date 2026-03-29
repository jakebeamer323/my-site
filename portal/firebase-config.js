import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js';

const firebaseConfig = {
  apiKey: "AIzaSyCnYr2KjdKBAO2yx_TQbh_ewD5lt0PrUyo",
  authDomain: "jakelewien-portal.firebaseapp.com",
  projectId: "jakelewien-portal",
  storageBucket: "jakelewien-portal.firebasestorage.app",
  messagingSenderId: "704826342918",
  appId: "1:704826342918:web:151902cac11f5863728d87",
  measurementId: "G-LT8QET5PBP"
};

const app = initializeApp(firebaseConfig);

// Secondary app instance — used by admin to create client accounts without signing themselves out
const secondaryApp = initializeApp(firebaseConfig, 'secondary');

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const secondaryAuth = getAuth(secondaryApp);
export { app };
