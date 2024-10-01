import { cache } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://next-ecommerce-api.vercel.app';

export const fetchProducts = cache(async (params = {}) => {
  const {
    page = 1,
    limit = 20,
    search = '',
    category = '',
    sortBy = 'price',
    sortOrder = 'asc',
  } = params;

  const skip = (page - 1) * limit;
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    skip: skip.toString(),
    search,
    category,
    sortBy,
    order: sortOrder,
  });

  const response = await fetch(`${API_BASE_URL}/products?${queryParams}`, { next: { revalidate: 60 } });
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  return {
    products: data || [],
    totalPages: data.totalPages || 1,
    totalProducts: data.totalProducts || 0,
  };
});

export const fetchProductById = cache(async (id) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, { next: { revalidate: 60 } });
  
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch product');
  }

  return response.json();
});

export const fetchCategories = cache(async () => {
  const response = await fetch(`${API_BASE_URL}/categories`, { next: { revalidate: 3600 } });
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
});