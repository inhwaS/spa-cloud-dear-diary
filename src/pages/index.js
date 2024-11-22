// pages/index.js
import React, { useState, useEffect } from 'react';
import Auth from '../components/auth/Auth';
import DiaryHome from '../components/DiaryHome';

export default function Home() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    name: '',
  });

  return (
    <div className="AppContainer">
      <main className="Wrapper">
        {!isRegistered ? (
          <Auth setIsRegistered={setIsRegistered} setCredentials={setCredentials}/>
        ) : (
          <DiaryHome credentials={credentials} />
        )}
      </main>
    </div>
  );
}
