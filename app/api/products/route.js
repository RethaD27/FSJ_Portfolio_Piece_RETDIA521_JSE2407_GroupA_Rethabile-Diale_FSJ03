import { NextResponse } from 'next/server';
import { db } from '@/firebase';
import { collection, query, where, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import Fuse from 'fuse.js';

/**
 * Fetches products from Firestore based on query parameters such as pagination, sorting, filtering, and searching.
 * 
 * @async
 * @function
 * @param {Request} request - The HTTP request object containing query parameters for pagination and filtering.
 * @returns {Promise<Response>} A Promise that resolves to a NextResponse containing the fetched products, pagination information, or an error message.
 * 
 * @example
 * // Example of calling the GET function
 * const response = await GET(request);
 * const data = await response.json();
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const pageSize = parseInt(searchParams.get('limit')) || 20;
    const sortBy = searchParams.get('sortBy') || 'price'; // Default sorting by price
    const order = searchParams.get('order') || 'asc';
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let productsQuery = collection(db, 'products');
    let constraints = [];

    // Filter by category
    if (category) {
      constraints.push(where('category', '==', category));
    }

    // Order by specified field
    constraints.push(orderBy(sortBy, order));
    constraints.push(limit(pageSize));

    // Handle pagination
    if (page > 1) {
      const lastDoc = await getLastDocFromPreviousPage(productsQuery, constraints, page, pageSize);
      if (lastDoc) {
        constraints.push(startAfter(lastDoc));
      }
    }

    const finalQuery = query(productsQuery, ...constraints);
    const snapshot = await getDocs(finalQuery);

    let products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Searching using Fuse.js
    if (search) {
      const fuse = new Fuse(products, {
        keys: ['title'],
        threshold: 0.3,
      });
      products = fuse.search(search).map(result => result.item);
    }

    // Calculate total pages and total products for pagination
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / pageSize);

    return NextResponse.json({
      products,
      page,
      pageSize,
      totalPages,
      totalProducts,
      hasMore: products.length === pageSize
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Fetches the last document from the previous page for pagination.
 * 
 * @async
 * @function
 * @param {Query} productsQuery - The Firestore query to retrieve products.
 * @param {Array} constraints - The constraints to apply to the query.
 * @param {number} page - The current page number.
 * @param {number} pageSize - The number of products per page.
 * @returns {Promise<DocumentSnapshot|null>} The last document of the previous page or null if there is no previous page.
 */
async function getLastDocFromPreviousPage(productsQuery, constraints, page, pageSize) {
  if (page <= 1) return null;
  const previousPageQuery = query(
    productsQuery,
    ...constraints.filter(c => c.type !== 'limit'),
    limit((page - 1) * pageSize)
  );
  const snap = await getDocs(previousPageQuery);
  return snap.docs[snap.docs.length - 1];
}
