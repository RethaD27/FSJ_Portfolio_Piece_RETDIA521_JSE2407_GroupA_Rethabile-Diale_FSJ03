import Link from 'next/link';

/**
 * Pagination component for navigating through pages.
 * 
 * @param {Object} props - The props for the component.
 * @param {number} props.currentPage - The current page number.
 * @param {number} props.totalPages - Total number of pages.
 * @param {boolean} [props.hasMore=true] - (Optional) Indicates if there are more pages available, used for dynamic content.
 * @returns {JSX.Element} The Pagination component.
 */
export default function Pagination({ currentPage, onPageChange,totalPages, hasMore = true }) {

  return (
    <div className="flex justify-center items-center space-x-4 my-12">
      {/* Previous Link */}
      {currentPage > 1 && (
        <button
        onClick={()=>onPageChange (currentPage - 1)}  
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
        >
          ← Previous
        </button>
      )}

      {/* Page indicator */}
      <span className="text-indigo-800 font-semibold">Page {currentPage}</span>

      {/* Next Link */}
      {(currentPage < totalPages || hasMore) && (
        <button 
          onClick={()=>onPageChange (currentPage + 1)} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
        >
          Next →
        </button>
      )}
    </div>
  );
}
