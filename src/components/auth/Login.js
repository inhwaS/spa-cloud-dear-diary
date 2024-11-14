import React, { useState } from 'react';
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
  ClientId: process.env.NEXT_PUBLIC_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

function Login({ setIsRegistered }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);


  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    // Create a CognitoUser object
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    // Authenticate the user
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        setLoading(false);
        setIsRegistered(true);
      },
      onFailure: (err) => {
        setLoading(false);
        setErrorMessage(err.message || JSON.stringify(err));
      },
    });
  };

  return (
    <div className="auth-container">
      <h2>Log In</h2>
      <form className="form-container">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </form>
      <button className="BasicButton" onClick={handleLoginSubmit} >
        {loading ? "Logging In..." : "Log In"}
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Login;
