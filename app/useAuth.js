import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user; // Return user if needed
    } catch (error) {
      throw new Error(error.message); // Throw error to handle in your component
    }
  };

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
  };

  return { user, signIn, signOut }; // Return user, signIn and signOut functions
};
