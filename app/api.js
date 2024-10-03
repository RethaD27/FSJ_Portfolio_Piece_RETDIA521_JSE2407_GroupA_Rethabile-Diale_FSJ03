// api.js
import { cache } from 'react';

//const API_BASE_URL = '/api';

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

  const response = await fetch(`/api/products?${queryParams}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
});

export const fetchProductById = cache(async (id) => {
  const response = await fetch(`/api/product/${id}`);
  
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