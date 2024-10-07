"use client"; 

import { useState } from 'react';
import Reviews from '../../components/Reviews';

/**
 * Renders the reviews section with sorting functionality.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.reviews - Array of reviews to display.
 * @returns {JSX.Element} The rendered reviews section component.
 * 
 * @example
 * // Example usage:
 * const reviews = [
 *   { id: 1, rating: 5, date: '2024-09-01', comment: 'Great product!' },
 *   { id: 2, rating: 3, date: '2024-08-15', comment: 'It was okay.' }
 * ];
 * 
 * <ReviewsSection reviews={reviews} />
 */
export default function ReviewsSection({ reviews }) {
  // State to store the current sort option for the reviews
  const [reviewSort, setReviewSort] = useState('date-desc');

  /**
   * Sorts the reviews array based on the current sorting criteria.
   * Available sorting options:
   * - 'date-desc': Newest reviews first.
   * - 'date-asc': Oldest reviews first.
   * - 'rating-desc': Highest rating first.
   * - 'rating-asc': Lowest rating first.
   *
   * @returns {Array} A sorted array of reviews.
   */
  const sortedReviews = [...reviews].sort((a, b) => {
    if (reviewSort === 'date-desc') {
      return new Date(b.date) - new Date(a.date);
    } else if (reviewSort === 'date-asc') {
      return new Date(a.date) - new Date(b.date);
    } else if (reviewSort === 'rating-desc') {
      return b.rating - a.rating;
    } else if (reviewSort === 'rating-asc') {
      return a.rating - b.rating;
    }
    return 0;
  });

  return (
    <div className="mt-16 px-8 pb-8">
      {/* Header with title and sorting dropdown */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-indigo-800 mb-4 sm:mb-0">
          Customer Reviews
        </h2>

        {/* Dropdown to select sorting method */}
        <select
          value={reviewSort}
          onChange={(e) => setReviewSort(e.target.value)}
          className="p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white"
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="rating-desc">Highest Rating First</option>
          <option value="rating-asc">Lowest Rating First</option>
        </select>
      </div>

      {/* Render sorted reviews */}
      <Reviews reviews={sortedReviews} />
    </div>
  );
}