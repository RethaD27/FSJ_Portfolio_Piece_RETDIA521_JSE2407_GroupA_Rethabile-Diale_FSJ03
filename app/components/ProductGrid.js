'use client';

import Link from 'next/link';
import { useState } from 'react';

/**
 * ProductCard Component displays a single product with an image carousel, title, price, and a link to product details.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.product - The product object containing details to be displayed.
 * @param {string} props.product.id - The unique identifier of the product.
 * @param {string[]} props.product.images - An array of image URLs for the product.
 * @param {string} props.product.thumbnail - The URL of the product's thumbnail image.
 * @param {string} props.product.title - The title of the product.
 * @param {number} props.product.price - The price of the product.
 * @param {string} props.product.category - The category of the product.
 * @returns {JSX.Element} - A component that displays the product card with image carousel and details.
 */
const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /**
   * Moves to the next image in the carousel.
   * @param {React.MouseEvent} e - The click event.
   */
  const nextImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  /**
   * Moves to the previous image in the carousel.
   * @param {React.MouseEvent} e - The click event.
   */
  const prevImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-[300px] sm:h-[350px] md:h-[400px]">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-indigo-800 mb-2 truncate">{product.title}</h2>
          <div className="relative aspect-w-1 aspect-h-1 h-32 sm:h-40 md:h-48">
            <img
              src={product.images[currentImageIndex]}
              className="h-full object-contain w-full"
              alt={`${product.title} - Image ${currentImageIndex + 1}`}
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center text-xl"
                  aria-label="Previous image"
                >
                  &#8249;
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center text-xl"
                  aria-label="Next image"
                >
                  &#8250;
                </button>
              </>
            )}
          </div>
          <div className="p-4">
            {/* Beautiful category tag */}
            <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-bold mr-2 px-2.5 py-0.5 rounded-full">
              {product.category}
            </span>

            <div className="flex justify-between items-center mt-2">
              <span className="text-2xl font-bold text-purple-600">${product.price.toFixed(2)}</span>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

/**
 * ProductGrid Component renders a grid of ProductCard components.
 *
 * @param {Object} props - The properties object.
 * @param {Object[]} props.products - An array of product objects to be displayed.
 * @returns {JSX.Element} - A component that displays a grid of product cards.
 */
export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
