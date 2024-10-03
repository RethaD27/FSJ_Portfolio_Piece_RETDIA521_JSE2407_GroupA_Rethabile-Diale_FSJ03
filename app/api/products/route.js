import { db } from '../../../firebase';
import { collection, query, where, orderBy, limit, getDocs, startAfter } from 'firebase/firestore';
import Fuse from 'fuse.js';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  
  const page = searchParams.get('page') || '1';
  const limitValue = searchParams.get('limit') || '20'; // Renamed for clarity
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sortBy = searchParams.get('sortBy') || 'price';
  const sortOrder = searchParams.get('sortOrder') || 'asc';

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limitValue, 10); // Convert limit to number

  try {
    let q = collection(db, 'products');

    if (category) {
      q = query(q, where('category', '==', category));
    }

    q = query(q, orderBy(sortBy, sortOrder));

    // First, get the total count
    const countSnapshot = await getDocs(q);
    const totalProducts = countSnapshot.size;

    // Then, apply pagination
    if (pageNumber > 1) {
      const lastVisible = await getDocs(query(q, limit((pageNumber - 1) * limitNumber)));
      q = query(q, startAfter(lastVisible.docs[lastVisible.docs.length - 1]), limit(limitNumber));
    } else {
      q = query(q, limit(limitNumber)); // Apply limit for the first page
    }

    const snapshot = await getDocs(q);
    let products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

     //console.log(products); 

    if (search) {
      const fuse = new Fuse(products, { keys: ['title'], threshold: 0.3 });
      products = fuse.search(search).map(result => result.item);
    }

    return new Response(JSON.stringify({
      products,
      totalPages: Math.ceil(totalProducts / limitNumber),
      totalProducts,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
