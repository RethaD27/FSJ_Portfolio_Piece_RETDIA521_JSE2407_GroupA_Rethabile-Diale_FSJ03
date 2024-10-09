import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // or use serviceAccount if required
  });
}

const adminAuth = admin.auth();

export { adminAuth };
