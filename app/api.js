import { cache } from "react";

/**
 * Fetch products with advanced filtering, sorting, and pagination.
 * This function is wrapped with React's cache function for automatic memoization.
 * @param {Object} options - The options for fetching products.
 * @param {number} [options.page=1] - The page number to fetch.
 * @param {number} [options.limit=20] - The number of products per page.
 * @param {string} [options.sortBy='id'] - The field to sort by.
 * @param {string} [options.order='asc'] - The sort order ('asc' or 'desc').
 * @param {string} [options.category] - The category to filter by.
 * @param {string} [options.search] - The search term to filter by product title.
 * @returns {Promise<Object>} A promise that resolves to the product data.
 * @throws {Error} If the API request fails.
 */
export const fetchProducts = cache(async ({
  page = 1,
  limit = 20,
  sortBy = "id",
  order = "asc",
  category,
  search,
}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sortBy,
    order,
  });

  if (category) params.append("category", category);
  if (search) params.append("search", search);

  const response = await fetch(`/api/products?${params}`, {
    next: { revalidate: 60 }, // Revalidating every 60 seconds
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
});

/**
 * Fetch a single product by its ID.
 * This function fetches a product using an absolute URL for server-side compatibility.
 * @param {string|number} id - The ID of the product to fetch.
 * @returns {Promise<Object>} A promise that resolves to the product data.
 * @throws {Error} If the API request fails.
 */
export const fetchProductById = async (id) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // Use environment variable or default localhost for development

  const response = await fetch(`${baseUrl}/api/products/${id}`);

  if (!response.ok) {
    throw new Error(`Error fetching product with ID ${id}`);
  }

  return response.json();
};

/**
 * Fetch all available categories.
 * This function is wrapped with React's cache function for automatic memoization.
 * @returns {Promise<string[]>} A promise that resolves to an array of category names.
 * @throws {Error} If the API request fails.
 */
export const fetchCategories = cache(async () => {
  const response = await fetch("/api/categories", {
    next: { revalidate: 3600 }, // Revalidating every hour
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
});
