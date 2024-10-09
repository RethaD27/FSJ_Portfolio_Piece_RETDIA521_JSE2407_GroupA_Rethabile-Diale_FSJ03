import admin from 'firebase-admin';

/**
 * Initializes the Firebase Admin SDK. This setup ensures that the app
 * is only initialized once to prevent duplicate initialization errors.
 *
 * The SDK can be initialized with default application credentials,
 * or you can provide a service account for more granular access.
 *
 * @example
 * const serviceAccount = require('path/to/serviceAccountKey.json');
 * admin.initializeApp({
 *   credential: admin.credential.cert(serviceAccount),
 * });
 */
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // or use serviceAccount if required
  });
}

/**
 * Firebase Admin Authentication instance.
 * This instance allows server-side interaction with Firebase Authentication,
 * including user management and session handling.
 *
 * @type {import('firebase-admin').auth.Auth}
 */
const adminAuth = admin.auth();

export { adminAuth };
