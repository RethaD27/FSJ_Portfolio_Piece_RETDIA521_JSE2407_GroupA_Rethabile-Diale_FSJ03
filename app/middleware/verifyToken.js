import { adminAuth } from '../../firebaseAdmin';

/**
 * Middleware to verify Firebase ID token from the request headers.
 * 
 * This function checks for a valid Bearer token in the `Authorization` header of the incoming request.
 * If the token is valid, it decodes the token using Firebase Admin SDK and attaches the decoded user information 
 * to the `req` object. It then calls the `next()` middleware function to continue processing the request.
 * If the token is missing or invalid, it sends a 401 Unauthorized response.
 * 
 * @async
 * @function verifyIdToken
 * @param {object} req - The incoming HTTP request object.
 * @param {object} res - The outgoing HTTP response object.
 * @param {function} next - The callback function to pass control to the next middleware.
 * 
 * @returns {Promise<void>} - If valid, calls the `next()` middleware; otherwise, returns a 401 Unauthorized response.
 * 
 * @throws {Error} If token verification fails, sends a 401 status code with an error message.
 * 
 * @example
 * // Example usage in an API route
 * import { verifyIdToken } from './middleware/verifyToken';
 * 
 * export const POST = async (req, res) => {
 *   await verifyIdToken(req, res, async () => {
 *     // Handle authenticated requests here
 *   });
 * };
 * 
 * @see {@link https://firebase.google.com/docs/auth/admin/verify-id-tokens|Verify ID Tokens}
 */
export const verifyIdToken = async (req, res, next) => {
  // Extract the token from the 'Authorization' header if present
  const token = req.headers.authorization?.split(' ')[1]; // Handle Bearer token if needed

  // If no token is provided, send a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the token using Firebase Admin SDK and decode the user info
    const decodedToken = await adminAuth.verifyIdToken(token);

    // Attach the decoded user information to the request object
    req.user = decodedToken;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Send a 401 Unauthorized response if token verification fails
    return res.status(401).json({ message: 'Unauthorized', error });
  }
};
