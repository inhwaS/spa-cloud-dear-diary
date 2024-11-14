import React, { useState } from 'react';

function Login({ setIsRegistered }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    setIsRegistered(true)
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
      <button type="submit" className="BasicButton" onClick={handleLoginSubmit} >Login</button>
    </div>
  );
}

export default Login;
