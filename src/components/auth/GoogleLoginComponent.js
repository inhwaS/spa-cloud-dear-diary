import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const OAuthCallback = ({ setIsRegistered, setLoading, setCredentials }) => {
  const [error, setError] = useState(null);
  const handleGoogleLogin = (response) => {
    setLoading(true);
    if (response.credential) {
      const googleIdToken = response.credential;
      fetchTokensFromBackend(googleIdToken);
    }
  };

  const fetchTokensFromBackend = async (googleToken) => {
    const fetchUrl = `${process.env.NEXT_PUBLIC_LAMBDA_URL}/dear-diary-cognito-verification`;
    fetch(fetchUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ googleIdToken: googleToken }),
    })
      .then(response => {
        if (!response.ok) {
          setError(response.error);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setIsRegistered(true)
        console.log(data.email);
        setCredentials(data.email);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <GoogleLogin 
        clientId={clientId}
        onSuccess={handleGoogleLogin} 
        onError={(error) => console.log(error)} />
    </div>
  );
};

export default OAuthCallback;
