import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

function Auth({ setIsRegistered }) {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const handleRegister = () => {
    // Logic for registration (e.g., create new account)
    console.log("User registered!");
  };

  const handleTogglePage = () => {
    setIsLoginPage(!isLoginPage);  // Toggle between Login and SignUp
  };

  return (
    <div className='DiaryMain'>
      {isLoginPage ? (
        <Login setIsRegistered={setIsRegistered}/>
      ) : (
        <SignUp setIsRegistered={setIsRegistered} />
      )}
      <div onClick={handleTogglePage} className='DivForClick'>
        {isLoginPage ? 'No Account? Need to Sign Up' : 'Already have an account? Log In'}
      </div>
    </div>
  );
}

export default Auth;
