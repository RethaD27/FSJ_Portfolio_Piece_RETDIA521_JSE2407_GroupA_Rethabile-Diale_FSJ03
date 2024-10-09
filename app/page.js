'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchProducts, fetchCategories } from './api';
import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';
import FilterSort from './components/FilterSort';

/**
 * The Home component handles the product listing page. It includes filtering, sorting,
 * pagination, and search functionalities. Data is fetched from the API and displayed in
 * a grid format. It also supports service worker integration for detecting new app versions.
 * 
 * @component
 * @returns {JSX.Element} The rendered product listing page with filters, sorting, pagination, and product grid.
 */
export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State variables
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Extract query parameters from the URL
  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || 'asc';

  /**
   * Fetches the products and categories data from the API and updates the state.
   * This effect runs whenever the page, search, category, sortBy, or sortOrder changes.
   */
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts({ page, search, category, sortBy, order: sortOrder }),
          fetchCategories()
        ]);
        setProducts(productsData.products);
        setTotalPages(productsData.totalPages);
        setTotalProducts(productsData.totalProducts);
        setCategories(categoriesData);
        setError(null);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [page, search, category, sortBy, sortOrder]);

  /**
   * Sets up a service worker to detect new versions of the app. If a new version is found,
   * it prompts the user to refresh the page.
   */
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              if (confirm('A new version of the app is available. Refresh to update?')) {
                window.location.reload();
              }
            }
          });
        });
      });
    }
  }, []);

  /**
   * Updates the URL based on new query parameters for page, search, category, sortBy, and sortOrder.
   * 
   * @param {Object} newParams - The new parameters to update the URL with.
   */
  const updateUrl = (newParams) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        updatedSearchParams.set(key, value);
      } else {
        updatedSearchParams.delete(key);
      }
    });
    router.push(`/?${updatedSearchParams.toString()}`);
  };

  /**
   * Handles the category filter update and resets the page to 1 when a new category is selected.
   * 
   * @param {string} newCategory - The new category to filter the products by.
   */
  const handleFilter = (newCategory) => {
    updateUrl({ category: newCategory, page: 1 });
  };

  /**
   * Handles sorting of the products by the selected field and order.
   * 
   * @param {string} newSortBy - The field to sort the products by.
   * @param {string} newSortOrder - The sort order ('asc' or 'desc').
   */
  const handleSort = (newSortBy, newSortOrder) => {
    updateUrl({ sortBy: newSortBy, sortOrder: newSortOrder, page: 1 });
  };

  /**
   * Handles the search query update and resets the page to 1 when a new search query is entered.
   * 
   * @param {string} newSearch - The new search query to filter the products by.
   */
  const handleSearch = (newSearch) => {
    updateUrl({ search: newSearch, page: 1 });
  };

  /**
   * Handles the page change for pagination.
   * 
   * @param {number} newPage - The new page number to navigate to.
   */
  const handlePageChange = (newPage) => {
    updateUrl({ page: newPage });
  };

  /**
   * Resets all filters, search, sort, and pagination, navigating to the base URL.
   */
  const handleReset = () => {
    router.push('/');
  };

  // Render error message if there's any error
  if (error) {
    return (
      <div className="text-red-600 text-center p-4 bg-red-100 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-indigo-800 mb-8 text-center">
        Discover Amazing Products
      </h1>
      <FilterSort
        categories={categories}
        currentCategory={category}
        currentSortBy={sortBy}
        currentSortOrder={sortOrder}
        currentSearch={search}
        onFilter={handleFilter}
        onSort={handleSort}
        onSearch={handleSearch}
        onReset={handleReset}
      />
      {loading ? (
        <div className="text-center p-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="mt-2 text-indigo-600">Loading...</p>
        </div>
      ) : (
        <>
          <ProductGrid products={products} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
