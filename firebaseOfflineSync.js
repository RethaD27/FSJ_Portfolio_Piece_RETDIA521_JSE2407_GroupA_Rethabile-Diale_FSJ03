import { db } from './firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

const OFFLINE_STORAGE_KEY = 'offlineChanges';

export function saveOfflineChange(collectionName, documentId, data) {
  const offlineChanges = JSON.parse(localStorage.getItem(OFFLINE_STORAGE_KEY) || '[]');
  offlineChanges.push({ collectionName, documentId, data });
  localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(offlineChanges));
}

export async function syncOfflineChanges() {
  const offlineChanges = JSON.parse(localStorage.getItem(OFFLINE_STORAGE_KEY) || '[]');
  
  for (const change of offlineChanges) {
    const { collectionName, documentId, data } = change;
    const docRef = doc(db, collectionName, documentId);
    
    try {
      await setDoc(docRef, data, { merge: true });
    } catch (error) {
      console.error('Error syncing offline change:', error);
    }
  }
  
  localStorage.removeItem(OFFLINE_STORAGE_KEY);
}

window.addEventListener('online', syncOfflineChanges);