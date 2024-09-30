import { cache } from 'react';

const API_BASE_URL = 'https://next-ecommerce-api.vercel.app';

/**
 * Fetches a list of products with optional filtering, sorting, and pagination.
 *
 * @param {Object} params - Optional parameters for filtering, sorting, and pagination.
 * @param {number} [params.page=1] - The current page number for pagination.
 * @param {number} [params.limit=20] - The number of products to fetch per page.
 * @param {string} [params.search=''] - A search query to filter products by name or description.
 * @param {string} [params.category=''] - The category to filter products by.
 * @param {string} [params.sortBy='price'] - The field to sort the products by (e.g., 'price', 'name').
 * @param {string} [params.sortOrder='asc'] - The sort order ('asc' for ascending or 'desc' for descending).
 * @returns {Promise<Object>} An object containing the fetched products, total pages, and total product count.
 * @throws {Error} If the fetch request fails.
 * 
 * @example
 * fetchProducts({ page: 1, search: 'laptop', sortBy: 'price', sortOrder: 'desc' })
 *   .then(data => console.log(data.products))
 *   .catch(error => console.error(error));
 */
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

/**
 * Fetches the details of a single product by its ID.
 *
 * @param {string} id - The ID of the product to fetch.
 * @returns {Promise<Object|null>} The product details as an object, or null if the product is not found.
 * @throws {Error} If the fetch request fails or the product is not found.
 * 
 * @example
 * fetchProductById('12345')
 *   .then(product => console.log(product))
 *   .catch(error => console.error(error));
 */
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

/**
 * Fetches a list of all product categories.
 *
 * @returns {Promise<Array>} An array of category objects.
 * @throws {Error} If the fetch request fails.
 * 
 * @example
 * fetchCategories()
 *   .then(categories => console.log(categories))
 *   .catch(error => console.error(error));
 */
export const fetchCategories = cache(async () => {
  const response = await fetch(`${API_BASE_URL}/categories`, { next: { revalidate: 3600 } });
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
});
