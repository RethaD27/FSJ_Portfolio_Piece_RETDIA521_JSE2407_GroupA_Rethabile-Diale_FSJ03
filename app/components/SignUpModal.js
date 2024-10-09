import { useState } from 'react';

/**
 * SignUpModal component for user registration in a modal.
 *
 * This component provides a form for users to sign up by entering their email and password.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {Function} props.onClose - Function to close the modal.
 * @param {Function} props.onSignUp - Function to handle user sign-up.
 * @example
 * return (
 *   <SignUpModal onClose={handleClose} onSignUp={handleSignUp} />
 * );
 */
const SignUpModal = ({ onClose, onSignUp }) => {
  // State variables for email, password, error, and success messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  /**
   * Handles the form submission for user sign-up.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   * @returns {Promise<void>} - A promise that resolves when the sign-up process is complete.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await onSignUp(email, password);
      setSuccess('Sign-up successful! Please log in.');
      setEmail('');
      setPassword('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-amber-600 text-white py-2 px-4 rounded hover:bg-amber-700"
          >
            Sign Up
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-red-500">Close</button>
      </div>
    </div>
  );
};

export default SignUpModal;
