'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchProducts, fetchCategories } from './api';
import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';
import FilterSort from './components/FilterSort';

/**
 * Home component for the product listing page.
 * It manages filtering, sorting, pagination, and searching products.
 * 
 * @component
 * @returns {JSX.Element} The product listing page.
 */
export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  /**
   * Fetches products and categories data based on filters and updates the state.
   * 
   * @async
   * @function loadData
   */
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts({ page, search, category, sortBy, sortOrder }),
          fetchCategories(),
        ]);
        setProducts(productsData.products);
        setTotalPages(productsData.totalPages);
        setCurrentPage(page);
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
   * Updates the URL with the new filter, sort, or page parameters.
   * 
   * @param {Object} newParams - The new parameters to update in the URL.
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
   * Handles category filtering.
   * 
   * @param {string} newCategory - The selected category for filtering.
   */
  const handleFilter = (newCategory) => updateUrl({ category: newCategory, page: 1 });

  /**
   * Handles sorting of products.
   * 
   * @param {string} newSortBy - The field to sort by.
   * @param {string} newSortOrder - The order of sorting (asc or desc).
   */
  const handleSort = (newSortBy, newSortOrder) => updateUrl({ sortBy: newSortBy, sortOrder: newSortOrder, page: 1 });

  /**
   * Handles search functionality.
   * 
   * @param {string} newSearch - The search query string.
   */
  const handleSearch = (newSearch) => updateUrl({ search: newSearch, page: 1 });

  /**
   * Handles page changes for pagination.
   * 
   * @param {number} newPage - The new page number.
   */
  const handlePageChange = (newPage) => updateUrl({ page: newPage });

  /**
   * Resets all filters, sorting, and search queries.
   */
  const handleReset = () => router.push('/');

  if (error) {
    return <div className="text-red-600 text-center p-4 bg-red-100 rounded-lg">Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-indigo-800 mb-8 text-center">Discover Amazing Products</h1>
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
        <div className="text-center p-4">Loading...</div>
      ) : (
        <>
          <ProductGrid products={products} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            hasMore={products.length === 20}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}