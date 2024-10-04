import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { db } from 'firebase'

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  if (method === 'GET') {
    try {
      const productRef = doc(db, 'products', id);
      const productDoc = await getDoc(productRef);

      if (productDoc.exists()) {
        res.status(200).json({ id: productDoc.id, ...productDoc.data() });
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}