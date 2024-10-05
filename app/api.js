import { cache } from 'react';

export const fetchProducts = cache(async (params = {}) => {
  const {
    page = 1,
    limit = 20,
    search = '',
    category = '',
    sortBy = 'price',
    sortOrder = 'asc',
  } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search,
    category,
    sortBy,
    sortOrder,
  });

  const response = await fetch(`/api/products`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
  // const data = await response.json();
  // return {
  //   products: data.products || [],
  //   totalPages: data.totalPages || 1,
  //   totalProducts: data.totalProducts || 0,
  // };
});

export const fetchProductById = cache(async (id) => {
  const response = await fetch(`/api/products/${id}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch product');
  }

  return response.json();
});

export const fetchCategories = cache(async () => {
  const response = await fetch(`/api/categories`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
});

/*import { db } from '../firebase';
import { collection, query, getDocs, doc, getDoc, orderBy, limit, startAfter } from 'firebase/firestore';

// Fetch paginated products
export async function fetchProducts(page = 1, limitValue = 20, cursor = null) {
  const productsRef = collection(db, 'products');
  let q;

  if (cursor) {
    q = query(productsRef, orderBy('title'), startAfter(cursor), limit(limitValue));
  } else {
    q = query(productsRef, orderBy('title'), limit(limitValue));
  }

  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  // Optionally handle cases where no products are found
  if (products.length === 0) {
    console.warn("No products found.");
  }

  return products; // Return only the products array
}


// Fetch a single product by ID
export async function fetchProductById(id) {
  const productRef = doc(db, 'products', id);
  const productSnapshot = await getDoc(productRef);

  if (!productSnapshot.exists()) {
    throw new Error('Product not found');
  }

  return { id: productSnapshot.id, ...productSnapshot.data() };
}

export async function fetchCategories() {
  const productsCollection = collection(db, 'products');
  const snapshot = await getDocs(productsCollection);
  
  const categories = new Set();
  snapshot.docs.forEach(doc => {
    categories.add(doc.data().category);
  });

  return Array.from(categories);
}


/*import { db } from '../firebase';
import { collection, query, getDocs, doc, getDoc, orderBy, limit, startAfter } from 'firebase/firestore';
import { cache } from 'react';

// Fetch paginated products from Firestore
async function fetchProductsFromFirestore(page = 1, limitValue = 20, cursor = null, search = '', category = '', sortBy = 'price', sortOrder = 'asc') {
  const productsRef = collection(db, 'products');
  let q;

  // Apply filters, search, and sorting to the query
  if (cursor) {
    q = query(
      productsRef,
      orderBy(sortBy, sortOrder),
      startAfter(cursor),
      limit(limitValue)
    );
  } else {
    q = query(
      productsRef,
      orderBy(sortBy, sortOrder),
      limit(limitValue)
    );
  }

  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return products;
}

// Fetch products with caching (API fallback)
export const fetchProducts = cache(async (params = {}) => {
  const {
    page = 1,
    limit = 20,
    search = '',
    category = '',
    sortBy = 'price',
    sortOrder = 'asc',
    cursor = null,
  } = params;

  // Attempt to fetch products from Firebase Firestore
  try {
    const products = await fetchProductsFromFirestore(page, limit, cursor, search, category, sortBy, sortOrder);
    return {
      products: products || [],
      totalPages: Math.ceil(products.length / limit),
      totalProducts: products.length || 0,
    };
  } catch (error) {
    console.error('Error fetching products from Firestore:', error);
    throw new Error('Failed to fetch products');
  }
});

// Fetch single product by ID from Firestore with caching
export const fetchProductById = cache(async (id) => {
  const productRef = doc(db, 'products', id);
  const productSnapshot = await getDoc(productRef);

  if (!productSnapshot.exists()) {
    return null;
  }

  return { id: productSnapshot.id, ...productSnapshot.data() };
});

// Fetch categories from Firestore with caching
export const fetchCategories = cache(async () => {
  const productsCollection = collection(db, 'products');
  const snapshot = await getDocs(productsCollection);

  const categories = new Set();
  snapshot.docs.forEach(doc => {
    categories.add(doc.data().category);
  });

  return Array.from(categories);
});*/
