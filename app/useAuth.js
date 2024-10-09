import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

/**
 * Custom React hook for handling Firebase authentication.
 * It manages the user state and provides functions to sign in and sign out.
 *
 * @returns {Object} - Returns an object containing:
 * - `user`: The currently authenticated user or `null` if not authenticated.
 * - `signIn`: Function to sign in with email and password.
 * - `signOut`: Function to sign out the authenticated user.
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);

  /**
   * Sets up the authentication state listener using Firebase's `onAuthStateChanged`.
   * Updates the `user` state when the authentication status changes.
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup the subscription on component unmount.
  }, []);

  /**
   * Signs in the user using email and password.
   * 
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<Object>} - Resolves to the authenticated user object.
   * @throws {Error} - Throws an error if sign-in fails.
   */
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user; // Return the authenticated user.
    } catch (error) {
      throw new Error(error.message); // Rethrow error to handle it in the component.
    }
  };

  /**
   * Signs out the currently authenticated user.
   * 
   * @returns {Promise<void>} - Resolves when the user is signed out.
   */
  const signOut = async () => {
    await auth.signOut();
    setUser(null); // Clear the user state after sign-out.
  };

  return { user, signIn, signOut }; // Return user, signIn, and signOut functions.
};
