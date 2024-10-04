import { db } from '../../../firebase';
import { collection, query, where, orderBy, limit, getDocs, startAfter } from 'firebase/firestore';
import Fuse from 'fuse.js';



export async function GET(req) {
  const { searchParams } = new URL(req.url);
  
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limitValue = parseInt(searchParams.get('limit') || '20', 10);
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sortBy = searchParams.get('sortBy') || 'price';
  const sortOrder = searchParams.get('sortOrder') || 'asc';

  try {
    let q = collection(db, 'products');

    if (category) {
      q = query(q, where('category', '==', category));
    }

    q = query(q, orderBy(sortBy, sortOrder));

    // Fetch all products that match the category filter
    const allProductsSnapshot = await getDocs(q);
    let allProducts = allProductsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Apply search filter if provided
    if (search) {
      const fuse = new Fuse(allProducts, { keys: ['title'], threshold: 0.3 });
      allProducts = fuse.search(search).map(result => result.item);
    }

    // Calculate total products and pages after filtering
    const totalProducts = allProducts.length;
    const totalPages = Math.ceil(totalProducts / limitValue);

    // Apply pagination
    const startIndex = (page - 1) * limitValue;
    const paginatedProducts = allProducts.slice(startIndex, startIndex + limitValue);

    return new Response(JSON.stringify({
      products: paginatedProducts,
      totalPages,
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