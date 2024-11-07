import React from 'react';

function SignUp({ onRegister }) {
  return (
    <div className='DiaryMain'>
      <h1>Welcome to Dear Diary</h1>
      <button onClick={onRegister} className='BasicButton'>Log In</button>
      <button onClick={onRegister} className='BasicButton'>Sign Up</button>
    </div>
  );
}

export default SignUp;
