import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

/**
 * Sign up a new user with email and password.
 * 
 * This function creates a new user account using Firebase Authentication's 
 * `createUserWithEmailAndPassword` method. If the operation is successful, 
 * the user's credentials are returned.
 * 
 * @async
 * @function
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the new account.
 * @returns {Promise<Object>} A promise that resolves to the user's credentials.
 * @throws {Error} Throws an error if the sign-up process fails.
 */
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

/**
 * Sign in a user with email and password.
 * 
 * This function allows users to sign in using their email and password via Firebase Authentication's
 * `signInWithEmailAndPassword` method. If successful, the user's credentials are returned.
 * 
 * @async
 * @function
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the user's account.
 * @returns {Promise<Object>} A promise that resolves to the user's credentials.
 * @throws {Error} Throws an error if sign-in fails.
 */
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

/**
 * Sign out the currently logged-in user.
 * 
 * This function logs out the current user using Firebase Authentication's `signOut` method.
 * 
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the sign-out is successful.
 * @throws {Error} Throws an error if sign-out fails.
 */
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

/**
 * Listen for changes in the authentication state.
 * 
 * This function sets up a listener to monitor authentication state changes using Firebase Authentication's
 * `onAuthStateChanged` method. The provided callback is invoked whenever the authentication state changes.
 * 
 * @function
 * @param {function} callback - A callback function that receives the user object when the authentication state changes.
 * @returns {function} A function to unsubscribe from the authentication state listener.
 */
export const authStateListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
