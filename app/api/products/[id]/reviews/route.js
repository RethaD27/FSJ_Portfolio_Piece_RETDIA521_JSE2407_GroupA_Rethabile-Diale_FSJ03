import { db } from "../../../../../firebase";
import { verifyIdToken } from "../../../../middleware/verifyToken";

/**
 * Adds a new review for a product. Requires authentication via `verifyIdToken`.
 * 
 * @function POST
 * @async
 * @param {Request} req - The HTTP request object, containing review data in `req.body` and the authenticated user in `req.user`.
 * @param {Response} res - The HTTP response object to send the response.
 * @returns {Promise<void>} Sends a response with the added review or an error message.
 */
export const POST = async (req, res) => {
  await verifyIdToken(req, res, async () => {
    const { productId } = req.query;
    return addReview(req, res, productId);
  });
};

/**
 * Edits an existing review for a product. Requires authentication and ownership of the review.
 * 
 * @function PUT
 * @async
 * @param {Request} req - The HTTP request object, containing updated review data in `req.body` and the authenticated user in `req.user`.
 * @param {Response} res - The HTTP response object to send the response.
 * @returns {Promise<void>} Sends a response with the updated review or an error message.
 */
export const PUT = async (req, res) => {
  await verifyIdToken(req, res, async () => {
    const { productId, id: reviewId } = req.query;
    return editReview(req, res, productId, reviewId);
  });
};

/**
 * Deletes an existing review for a product. Requires authentication and ownership of the review.
 * 
 * @function DELETE
 * @async
 * @param {Request} req - The HTTP request object, containing the authenticated user in `req.user`.
 * @param {Response} res - The HTTP response object to send the response.
 * @returns {Promise<void>} Sends a response with a success or error message.
 */
export const DELETE = async (req, res) => {
  await verifyIdToken(req, res, async () => {
    const { productId, id: reviewId } = req.query;
    return deleteReview(req, res, productId, reviewId);
  });
};

/**
 * Adds a new review for the specified product.
 * 
 * @async
 * @function addReview
 * @param {Request} req - The HTTP request object, containing the review data (rating, comment) and the authenticated user.
 * @param {Response} res - The HTTP response object to send the response.
 * @param {string} productId - The ID of the product to which the review will be added.
 * @returns {Promise<void>} Sends a response with the added review or an error message.
 */
async function addReview(req, res, productId) {
  try {
    const { rating, comment } = req.body;
    const { user } = req;

    const newReview = {
      rating: Number(rating),
      comment,
      date: new Date().toISOString(),
      reviewerEmail: user.email,
      reviewerName: user.name || "Anonymous",
    };

    const reviewRef = await db.collection("products").doc(productId).update({
      newReview,
    });

    res.status(201).json({
      message: "Review added successfully",
      id: reviewRef.id,
      ...newReview,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error: error.message });
  }
}

/**
 * Edits an existing review for the specified product and review ID.
 * 
 * @async
 * @function editReview
 * @param {Request} req - The HTTP request object, containing the updated review data (rating, comment) and the authenticated user.
 * @param {Response} res - The HTTP response object to send the response.
 * @param {string} productId - The ID of the product.
 * @param {string} reviewId - The ID of the review to edit.
 * @returns {Promise<void>} Sends a response with the updated review or an error message.
 */
async function editReview(req, res, productId, reviewId) {
  try {
    const { rating, comment } = req.body;
    const { user } = req;

    const reviewRef = db
      .collection("products")
      .doc(productId)
      .collection("reviews")
      .doc(reviewId);
    const review = await reviewRef.get();

    if (!review.exists) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.data().reviewerEmail !== user.email) {
      return res.status(403).json({ message: "Not authorized to edit this review" });
    }

    const updatedReview = {
      rating: Number(rating),
      comment,
      date: new Date().toISOString(),
    };

    await reviewRef.update(updatedReview);

    res.status(200).json({
      message: "Review updated successfully",
      id: reviewId,
      ...updatedReview,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating review", error: error.message });
  }
}

/**
 * Deletes an existing review for the specified product and review ID.
 * 
 * @async
 * @function deleteReview
 * @param {Request} req - The HTTP request object, containing the authenticated user.
 * @param {Response} res - The HTTP response object to send the response.
 * @param {string} productId - The ID of the product.
 * @param {string} reviewId - The ID of the review to delete.
 * @returns {Promise<void>} Sends a response with a success or error message.
 */
async function deleteReview(req, res, productId, reviewId) {
  try {
    const { user } = req;

    const reviewRef = db
      .collection("products")
      .doc(productId)
      .collection("reviews")
      .doc(reviewId);
    const review = await reviewRef.get();

    if (!review.exists) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.data().reviewerEmail !== user.email) {
      return res.status(403).json({ message: "Not authorized to delete this review" });
    }

    await reviewRef.delete();

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error: error.message });
  }
}
