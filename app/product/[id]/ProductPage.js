'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageGallery from '../../components/ImageGallery';
import ReviewsSection from './ReviewsSection';
import GoBackButton from '../../components/GoBackButton';
import { fetchProductById } from '@/app/api'; // Ensure this is the correct path to the API fetch function

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductById(params.id)
      .then((productData) => {
        setProduct(productData);
        setReviews(productData.reviews || []); // Initialize reviews
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setError('Unable to load product data. Please check your internet connection.');
      });
  }, [params.id]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleReviewAdded = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  const handleReviewUpdated = (updatedReview) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === updatedReview.id ? updatedReview : review
      )
    );
  };

  const handleReviewDeleted = (deletedReviewId) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== deletedReviewId)
    );
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-r from-indigo-50 to-purple-50">
      <GoBackButton />
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
        <div className="md:flex">
          <div className="md:w-1/2">
            <ImageGallery images={product.images} />
          </div>
          <div className="md:w-1/2 p-8 bg-gradient-to-br from-white to-indigo-50">
            <h1 className="text-4xl font-bold mb-4 text-indigo-800">
              {product.title}
            </h1>
            <p className="text-3xl font-semibold text-indigo-600 mb-4">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              {product.description}
            </p>
            <div className="mb-4 flex flex-wrap">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 transform hover:scale-105 transition-transform duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Rating:{' '}
              <span className="font-semibold text-yellow-500">
                {product.rating} / 5
              </span>
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Stock: <span className="font-semibold">{product.stock}</span>
              {product.stock > 0 ? (
                <span className="text-green-600 ml-2 font-semibold">
                  (In Stock)
                </span>
              ) : (
                <span className="text-red-600 ml-2 font-semibold">
                  (Out of Stock)
                </span>
              )}
            </p>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              Add to Cart
            </button>
          </div>
        </div>
        <ReviewsSection 
          reviews={reviews} 
          productId={params.id}
          onReviewAdded={handleReviewAdded}
          onReviewUpdated={handleReviewUpdated}
          onReviewDeleted={handleReviewDeleted}
        />
      </div>
    </div>
  );
}
