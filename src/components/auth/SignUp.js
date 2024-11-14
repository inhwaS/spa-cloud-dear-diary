import React, { useState } from 'react';
import Verification from './Verification';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
  ClientId: process.env.NEXT_PUBLIC_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

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
    userPool.signUp(email, password, [{ Name: 'email', Value: email }], null, (err, result) => {
      setLoading(false);
      if (err) {
        setErrorMessage(err.message || JSON.stringify(err));
        return;
      }
      setIsCodeSent(true);
    });
  };

  return (
    <div className="AuthPage">
      <h2>Sign Up for Dear Diary</h2>

      <form className="form-container">
        {/* Email and password fields */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isCodeSent || isCodeVerified}
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
            disabled={isCodeSent || isCodeVerified}
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
            disabled={isCodeSent || isCodeVerified}
            required
          />
        </div>
      </form>
      {/* Only show SignUp button if code is not sent */}
        {!isCodeSent ? (
        <button className="BasicButton" disabled={loading} onClick={handleSignUpSubmit}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      ) : null}

      {/* Show Verification Component after signup */}
      {isCodeSent && !isCodeVerified && (
        <Verification
          email={email}
          loading={loading}
          setLoading={setLoading}
          setIsCodeVerified={setIsCodeVerified}
          setIsRegistered={setIsRegistered}
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
