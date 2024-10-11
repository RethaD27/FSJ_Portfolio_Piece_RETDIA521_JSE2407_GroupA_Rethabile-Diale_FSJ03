"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../useAuth"; // Custom hook to access the user state
import { signIn, signOutUser, signUp } from "../authFunctions"; // Import authentication functions
import { FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";

/**
 * Header component that displays the navigation bar with links to different pages.
 *
 * @returns {JSX.Element} - The header component containing the website's logo and navigation links.
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const { user, setUser } = useAuth(); // Get the current authenticated user and setUser

  const handleSignIn = async (email, password) => {
    try {
      await signIn(email, password);
      setIsSignInModalOpen(false); // Close the modal on successful sign-in
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser(); // Call the sign-out function
      setUser(null); // Update user state
      console.log("Sign-out successful");
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  const handleSignUp = async (email, password) => {
    try {
      await signUp(email, password);
      setIsSignUpModalOpen(false); // Close the modal on successful sign-up
    } catch (error) {
      console.error("Sign-up error:", error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        {/* Website logo and title */}
        <Link href="/" className="flex items-center group">
          <span className="font-['Brush_Script_MT',_cursive] text-4xl text-white tracking-wider group-hover:text-yellow-300 transition-colors duration-300">
            QuickCart Emporium
          </span>
        </Link>

        {/* Hamburger menu button for mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white sm:hidden"
        >
          ☰
        </button>

        {/* Auth buttons */}
        {user ? (
          <div className="flex items-center space-x-4">
            <FaUser className="text-white text-2xl" />
            <Link
              href="#"
              onClick={handleSignOut}
              className="text-white flex items-center space-x-1 hover:text-yellow-300 transition-colors duration-300"
            >
              <FaSignOutAlt />
              <span>Sign Out</span>
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link
              href="#"
              onClick={() => setIsSignInModalOpen(true)}
              className="text-white flex items-center space-x-1 hover:text-yellow-300 transition-colors duration-300"
            >
              <FaSignInAlt />
              <span>Sign In</span>
            </Link>
            <Link
              href="#"
              onClick={() => setIsSignUpModalOpen(true)}
              className="text-white flex items-center space-x-1 hover:text-yellow-300 transition-colors duration-300"
            >
              <span>Sign Up</span>
            </Link>
          </div>
        )}

        {/* Navigation links */}
        <nav className={`${isMenuOpen ? "block" : "hidden"} sm:block`}>
          <ul className="flex space-x-8">
            <li>
              <Link
                href="/"
                className="text-white hover:text-yellow-300 transition-colors duration-300 text-lg font-semibold"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="text-white hover:text-yellow-300 transition-colors duration-300 text-lg font-semibold"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className="text-white hover:text-yellow-300 transition-colors duration-300 text-lg font-semibold"
              >
                Cart
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Modals */}
      {isSignInModalOpen && (
        <SignInModal
          onClose={() => setIsSignInModalOpen(false)}
          onSignIn={handleSignIn}
        />
      )}
      {isSignUpModalOpen && (
        <SignUpModal
          onClose={() => setIsSignUpModalOpen(false)}
          onSignUp={handleSignUp}
        />
      )}
    </header>
  );
}
