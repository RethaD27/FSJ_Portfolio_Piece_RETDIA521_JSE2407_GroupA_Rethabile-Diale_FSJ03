import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { db } from 'firebase'

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    try {
      const categoriesRef = doc(db, 'categories', 'allCategories');
      const categoriesDoc = await getDoc(categoriesRef);

      if (categoriesDoc.exists()) {
        res.status(200).json(categoriesDoc.data().categories);
      } else {
        res.status(404).json({ error: 'Categories not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}