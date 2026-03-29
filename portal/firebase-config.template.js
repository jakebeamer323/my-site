import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js';

const firebaseConfig = {
  apiKey:            "FIREBASE_API_KEY_PLACEHOLDER",
  authDomain:        "FIREBASE_AUTH_DOMAIN_PLACEHOLDER",
  projectId:         "FIREBASE_PROJECT_ID_PLACEHOLDER",
  storageBucket:     "FIREBASE_STORAGE_BUCKET_PLACEHOLDER",
  messagingSenderId: "FIREBASE_MESSAGING_SENDER_ID_PLACEHOLDER",
  appId:             "FIREBASE_APP_ID_PLACEHOLDER",
  measurementId:     "FIREBASE_MEASUREMENT_ID_PLACEHOLDER"
};

const app = initializeApp(firebaseConfig);
const secondaryApp = initializeApp(firebaseConfig, 'secondary');

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const secondaryAuth = getAuth(secondaryApp);
export { app };
