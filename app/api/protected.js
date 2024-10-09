import { verifyIdToken } from '../../middleware/verifyToken';

/**
 * API handler for a protected route that verifies user authentication.
 *
 * This function checks if the user is authenticated by verifying the ID token.
 * If the verification is successful, it sends a response with a success message.
 *
 * @async
 * @function
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to send back to the client.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 * @example
 * // Usage in a Next.js API route
 * export default handler;
 */
export default async function handler(req, res) {
  await verifyIdToken(req, res, async () => {
    res.status(200).json({ message: 'This is a protected route' });
  });
}
