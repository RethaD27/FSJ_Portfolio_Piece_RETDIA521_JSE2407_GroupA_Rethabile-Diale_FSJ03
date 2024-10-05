// app/api/products/route.js
import { NextResponse } from 'next/server';
import { db } from '@/firebase';
import { collection, query, where, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import Fuse from 'fuse.js';

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

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const pageSize = parseInt(searchParams.get('limit')) || 20;
    const sortBy = searchParams.get('sortBy') || 'id';
    const order = searchParams.get('order') || 'asc';
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let productsQuery = collection(db, 'products');
    let constraints = [];

    if (category) {
      constraints.push(where('category', '==', category));
    }

    constraints.push(orderBy(sortBy, order));
    constraints.push(limit(pageSize));

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

    if (search) {
      const fuse = new Fuse(products, {
        keys: ['title'],
        threshold: 0.3
      });
      products = fuse.search(search).map(result => result.item);
    }

    return NextResponse.json({
      products,
      page,
      pageSize,
      hasMore: products.length === pageSize
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}