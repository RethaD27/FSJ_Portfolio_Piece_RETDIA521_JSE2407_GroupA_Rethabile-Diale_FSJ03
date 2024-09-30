"use client";

/**
 * GoBackButton component provides a button that, when clicked, navigates the user back to the previous page.
 * This is done by calling `window.history.back()` to move one step back in the browser's history stack.
 *
 * @component
 *
 * @example
 * // Example usage:
 * <GoBackButton />
 *
 * @returns {JSX.Element} A button that triggers the browser's back navigation.
 */
const GoBackButton = () => {
  /**
   * Navigates the user to the previous page in their browser history.
   * Triggered by clicking the "Go Back" button.
   */
  const goBack = () => {
    window.history.back();
  };

  return (
    <button
      onClick={goBack}
      className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 mb-8 transition-colors duration-300 group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 transform group-hover:-translate-x-1 transition-transform duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span className="font-semibold">Go Back</span>
    </button>
  );
};

export default GoBackButton;
