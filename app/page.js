'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchProducts } from './api';
import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';
import FilterSort from './components/FilterSort';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sortBy = searchParams.get('sortBy') || 'price';
  const sortOrder = searchParams.get('sortOrder') || 'asc';

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts({ page, search, category, sortBy, sortOrder }),
        
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

  const handleFilter = (newCategory) => {
    updateUrl({ category: newCategory, page: 1 });
  };

  const handleSort = (newSortBy, newSortOrder) => {
    updateUrl({ sortBy: newSortBy, sortOrder: newSortOrder, page: 1 });
  };

  const handleSearch = (newSearch) => {
    updateUrl({ search: newSearch, page: 1 });
  };

  const handlePageChange = (newPage) => {
    updateUrl({ page: newPage });
  };

  const handleReset = () => {
    router.push('/');
  };

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