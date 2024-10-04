import { getFirestore, collection, getDocs, doc, getDoc, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from 'firebase';
import Fuse from 'fuse.js'
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const ITEMS_PER_PAGE = 20;

export default async function handler(req, res) {
  const { method, query: { page = 1, search = '', category = '', sortBy = 'price', sortOrder = 'asc' } } = req;

  if (method === 'GET') {
    try {
      const productsRef = collection(db, 'products');
      let q = query(productsRef);

      // Apply category filter
      if (category) {
        q = query(q, where('category', '==', category));
      }

      // Apply sorting
      if (sortBy === 'price') {
        q = query(q, orderBy('price', sortOrder));
      }

      // Fetch all products (we'll filter and paginate in memory)
      const snapshot = await getDocs(q);
      let products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Apply search using Fuse.js
      if (search) {
        const fuse = new Fuse(products, {
          keys: ['title'],
          threshold: 0.3,
        });
        products = fuse.search(search).map(result => result.item);
      }

      // Calculate pagination
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const paginatedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

      res.status(200).json({
        products: paginatedProducts,
        totalPages: Math.ceil(products.length / ITEMS_PER_PAGE),
        totalProducts: products.length,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}