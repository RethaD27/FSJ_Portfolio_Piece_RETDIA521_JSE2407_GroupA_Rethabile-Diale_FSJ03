import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

/**
 * Firebase configuration object, containing necessary keys and identifiers
 * for connecting to the Firebase project. The values are loaded from environment variables.
 *
 * @type {Object}
 * @property {string} apiKey - API key for the Firebase project.
 * @property {string} authDomain - Domain for Firebase Authentication.
 * @property {string} projectId - Firebase project ID.
 * @property {string} storageBucket - Storage bucket URL for Firebase.
 * @property {string} messagingSenderId - Firebase Cloud Messaging sender ID.
 * @property {string} appId - App ID for the Firebase project.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Initializes the Firebase application using the provided configuration.
 * 
 * @returns {FirebaseApp} - The initialized Firebase app instance.
 */
const app = initializeApp(firebaseConfig);

/**
 * Firebase Authentication instance.
 * Used to authenticate users and manage their sessions.
 * 
 * @type {Auth}
 */
const auth = getAuth(app);

/**
 * Firestore Database instance.
 * Provides access to Firestore database functionalities.
 * 
 * @type {Firestore}
 */
const db = getFirestore(app);

export { db, auth };
