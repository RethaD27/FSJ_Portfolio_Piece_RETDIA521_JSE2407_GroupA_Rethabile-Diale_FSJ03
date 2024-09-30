import { useState, useEffect } from 'react';

/**
 * FilterSort component for filtering, sorting, and searching products.
 *
 * @param {Object} props - The component props.
 * @param {Array<string>} props.categories - List of product categories.
 * @param {string} props.currentCategory - Currently selected category.
 * @param {string} props.currentSortBy - Currently selected sort criterion.
 * @param {string} props.currentSortOrder - Currently selected sort order (asc/desc).
 * @param {string} props.currentSearch - Current search query.
 * @param {Function} props.onFilter - Callback function for filtering products.
 * @param {Function} props.onSort - Callback function for sorting products.
 * @param {Function} props.onSearch - Callback function for searching products.
 * @param {Function} props.onReset - Callback function for resetting filters and search.
 *
 * @returns {JSX.Element} The rendered FilterSort component.
 */
export default function FilterSort({
  categories,
  currentCategory,
  currentSortBy,
  currentSortOrder,
  currentSearch,
  onFilter,
  onSort,
  onSearch,
  onReset
}) {
  const [search, setSearch] = useState(currentSearch);

  useEffect(() => {
    setSearch(currentSearch);
  }, [currentSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="p-2 border rounded mr-2"
        />
        <button type="submit" className="bg-indigo-600 text-white p-2 rounded">Search</button>
      </form>
      <div className="flex flex-wrap items-center gap-4">
        <select
          value={currentCategory}
          onChange={(e) => onFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categories && categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select
          value={`${currentSortBy}-${currentSortOrder}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split('-');
            onSort(sortBy, sortOrder);
          }}
          className="p-2 border rounded"
        >
          <option value="">Price: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title-asc">Title: A-Z</option>
          <option value="title-desc">Title: Z-A</option>
        </select>
        <button onClick={onReset} className="bg-gray-200 p-2 rounded">Reset All</button>
      </div>
    </div>
  );
}
