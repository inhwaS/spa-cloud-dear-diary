import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

function Auth({ setIsRegistered, setCredentials }) {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const handleTogglePage = () => {
    setIsLoginPage(!isLoginPage);
  };

  return (
    <div className='DiaryMain'>
      {isLoginPage ? (
        <Login setIsRegistered={setIsRegistered} setCredentials={setCredentials}/>
      ) : (
        <SignUp setIsRegistered={setIsRegistered} setCredentials={setCredentials}/>
      )}
      <div onClick={handleTogglePage} className='DivForClick'>
        {isLoginPage ? 'No Account? Need to Sign Up' : 'Already have an account? Log In'}
      </div>
    </div>
  );
}

export default Auth;
