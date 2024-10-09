import { useState } from 'react';
import { useAuth } from '../useAuth';

export default function Reviews({ reviews, productId, onReviewAdded, onReviewUpdated, onReviewDeleted }) {
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [editingReview, setEditingReview] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { user, signIn } = useAuth() || {};

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      setIsSignedIn(true);
      setEmail('');
      setPassword('');
      setSuccessMessage('Successfully signed in!');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddReview = async () => {
    if (!user) {
      setError('You must be logged in to add a review.');
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getIdToken()}`
        },
        body: JSON.stringify(newReview)
      });

      if (response.ok) {
        const addedReview = await response.json();
        onReviewAdded(addedReview);
        setNewReview({ rating: 5, comment: '' });
        setSuccessMessage('Review added successfully!');
      } else {
        throw new Error('Failed to add review');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditReview = async (reviewId) => {
    try {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getIdToken()}`
        },
        body: JSON.stringify({ ...editingReview, reviewId })
      });

      if (response.ok) {
        const updatedReview = await response.json();
        onReviewUpdated(updatedReview);
        setEditingReview(null);
        setSuccessMessage('Review updated successfully!');
      } else {
        throw new Error('Failed to update review');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${await user.getIdToken()}`
        }
      });

      if (response.ok) {
        onReviewDeleted(reviewId);
        setSuccessMessage('Review deleted successfully!');
      } else {
        throw new Error('Failed to delete review');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex text-yellow-400" aria-label={`Rating: ${rating} out of 5`}>
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-2xl ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
      {error && <div className="text-red-600">{error}</div>}
      {successMessage && <div className="text-green-600">{successMessage}</div>}

      {!isSignedIn && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <h3 className="text-lg font-semibold mb-4">Sign In</h3>
          <div className="mb-4">
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Enter your password"
            />
          </div>
          <button onClick={handleSignIn} className="bg-indigo-600 text-white py-2 px-4 rounded">
            Sign In
          </button>
        </div>
      )}

      {isSignedIn && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Add a Review</h3>
          <div className="mb-4">
            <label className="block mb-2">Rating:</label>
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
              className="border p-2 rounded w-full"
            >
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Comment:</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="border p-2 rounded w-full"
              placeholder="Enter your review"
            />
          </div>
          <button onClick={handleAddReview} className="bg-indigo-600 text-white py-2 px-4 rounded">
            Submit Review
          </button>
        </div>
      )}

      <div>
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-100 p-4 rounded-lg shadow mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{review.reviewerName}</h3>
                {renderStars(review.rating)}
                <p className="text-gray-600">{review.comment}</p>
              </div>
              {user && user.email === review.reviewerEmail && (
                <div>
                  <button onClick={() => setEditingReview(review)} className="text-blue-600">Edit</button>
                  <button onClick={() => handleDeleteReview(review.id)} className="text-red-600 ml-2">Delete</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
