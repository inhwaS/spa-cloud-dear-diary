import React from 'react';

function SignUp({ onRegister }) {
  return (
    <div>
      <h2>Sign Up</h2>
      <button onClick={onRegister}>Sign Up with Amazon Cognito</button>
    </div>
  );
}

export default SignUp;
