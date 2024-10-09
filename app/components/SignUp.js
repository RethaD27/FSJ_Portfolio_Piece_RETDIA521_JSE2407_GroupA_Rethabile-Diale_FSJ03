import { useState } from 'react';
import { signUp } from '../authFunctions';

/**
 * SignUp component for user registration.
 *
 * This component allows users to create a new account using their email and password.
 *
 * @component
 * @example
 * return (
 *   <SignUp />
 * );
 */
const SignUp = () => {
  // State variables for email, password, and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  /**
   * Handles the form submission for signing up the user.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   * @returns {Promise<void>} - A promise that resolves when the sign-up process is complete.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      alert('Sign-Up Successful');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign Up</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignUp;
