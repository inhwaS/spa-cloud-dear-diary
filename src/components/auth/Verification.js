import React, { useState } from 'react';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
  ClientId: process.env.NEXT_PUBLIC_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

function Verification({ email, loading, setLoading, setIsCodeVerified, setIsRegistered }) {
  const [validationCode, setValidationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleValidateCode = async () => {
    setLoading(true);

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);
    
    cognitoUser.confirmRegistration(validationCode, true, (err, result) => {
      setLoading(false);

      if (err) {
        setErrorMessage(err.message || JSON.stringify(err));
        return;
      }

      setIsCodeVerified(true);
      setIsRegistered(true);
    });
  };


  return (
    <div className="verification-container">
      <h3>Enter the Verification Code sent to your email</h3>
      <form className="form-container" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>Verification Code</label>
          <input
            type="text"
            placeholder="Enter the code"
            value={validationCode}
            onChange={(e) => setValidationCode(e.target.value)}
            required
          />
        </div>
      </form>
      <button
        type="button"
        className="BasicButton"
        disabled={loading}
        onClick={handleValidateCode}
      >
        {loading ? "Verifying..." : "Verify Code"}
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Verification;
