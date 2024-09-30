'use client';

/**
 * Error component to display an error message and provide a reset button to retry.
 * 
 * @param {Object} props - The properties passed to the Error component.
 * @param {Error} props.error - The error object containing the error details.
 * @param {Function} props.reset - The function to reset the error state and retry the operation.
 * @returns {JSX.Element} - A component that displays an error message and a retry button.
 */
export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      {/* Display error message */}
      <p>{error.message}</p>
      {/* Button to retry the operation */}
      <button onClick={reset}>Try again</button>
    </div>
  );
}
