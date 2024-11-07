import React, { useState } from 'react';
import axios from 'axios'; // For API calls to the backend
import Verification from './Verification'; // Import the Verification component

function SignUp({ setIsRegistered }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    // try {
    //   // Send sign-up request to API (backend: AWS Lambda)
    //   await axios.post('/api/authentication/signup', { email, password });

    //   setIsCodeSent(true); // Show verification code input field after signup
    //   setLoading(false);
    // } catch (error) {
    //   setLoading(false);
    //   setErrorMessage("Sign up failed. Please try again.");
    // }

    // TODO
    setIsCodeSent(true); // Show verification code input field after signup
    setLoading(false);
  };

  const handleCodeVerification = () => {
    setIsCodeVerified(true); // Successfully verified the code
    setIsRegistered(true); // Notify parent component that registration is complete
  };

  return (
    <div className="AuthPage">
      <h1>Sign Up for Dear Diary</h1>

      <form className='form-container'>
        {/* Email and password fields */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isCodeSent || isCodeVerified} // Disable input fields after signup
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isCodeSent || isCodeVerified} // Disable input fields after signup
            required
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isCodeSent || isCodeVerified} // Disable input fields after signup
            required
          />
        </div>
      </form>
      {!isCodeSent ? (
        <button className="BasicButton" disabled={loading} onClick={handleSignUpSubmit} >
        {loading ? "Signing Up..." : "Sign Up"}
        </button>
    ) : null}

      {/* Show Verification Component after signup */}
      {isCodeSent && !isCodeVerified && (
        <Verification
          email={email}
          onVerifyCode={handleCodeVerification}
          loading={loading}
        />
      )}

      {isCodeVerified && (
        <div>
          <h2>Account Successfully Created!</h2>
          <p>You are now registered and can log in.</p>
        </div>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default SignUp;
