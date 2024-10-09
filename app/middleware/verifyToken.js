import { adminAuth } from '../../firebaseAdmin';

export const verifyIdToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Handle Bearer token if needed
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized', error });
  }
};
