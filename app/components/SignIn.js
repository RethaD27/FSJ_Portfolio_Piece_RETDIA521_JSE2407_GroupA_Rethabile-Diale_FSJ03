import { useState } from 'react';
import { signIn } from '../authFunctions';

/**
 * SignIn component for user authentication.
 *
 * This component allows users to sign in using their email and password.
 *
 * @component
 * @example
 * return (
 *   <SignIn />
 * )
 */
const SignIn = () => {
  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  /**
   * Handles the form submission for signing in the user.
   *
   * @async
   * @function handleSubmit
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   * @returns {Promise<void>} - A promise that resolves when the sign-in process is complete.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      alert('Sign-In Successful');
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
      <button type="submit">Sign In</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignIn;
