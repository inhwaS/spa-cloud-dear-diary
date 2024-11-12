// Verification.js
import React, { useState } from 'react';

function Verification({ email, onVerifyCode, loading }) {
  const [validationCode, setValidationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleValidateCode = async (e) => {
    // e.preventDefault();
    // try {
    //   // Call the API to verify the code
    //   await axios.post('/api/authentication/verify', { email, validationCode });
    //   onVerifyCode(); // Notify parent that the code has been verified
    // } catch (error) {
    //   setErrorMessage("Invalid validation code. Please try again.");
    // }
    setErrorMessage("Invalid validation code. Please try again.");
    onVerifyCode();
  };

  return (
    <div className="verification-container">
      <h3>Enter the Verification Code sent to your email</h3>
      <form className="form-container">
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
      <button type="submit" className="BasicButton" disabled={loading} onClick={handleValidateCode} >
          {loading ? "Verifying..." : "Verify Code"}
        </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Verification;
