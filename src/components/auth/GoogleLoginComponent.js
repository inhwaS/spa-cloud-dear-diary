import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const OAuthCallback = ({ setIsRegistered }) => {
  const [error, setError] = useState(null);
  const router = useRouter(); // Hook to manage routing

  const handleGoogleLogin = (response) => {
    if (response.credential) {
      const googleIdToken = response.credential;
      console.log(googleIdToken);
      fetchTokensFromBackend(googleIdToken);
    }
  };

  const fetchTokensFromBackend = async (googleToken) => {
    const response = await fetch(process.env.NEXT_PUBLIC_LAMBDA_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ googleIdToken: googleToken }),
    });

    setIsRegistered(true);
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
