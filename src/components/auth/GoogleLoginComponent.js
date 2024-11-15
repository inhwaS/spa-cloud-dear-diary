import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const OAuthCallback = ({ setIsRegistered, setLoading }) => {
  const [error, setError] = useState(null);
  const router = useRouter(); // Hook to manage routing

  const handleGoogleLogin = (response) => {
    setLoading(true);
    if (response.credential) {
      const googleIdToken = response.credential;
      console.log(googleIdToken);
      fetchTokensFromBackend(googleIdToken);
    }
  };

  const fetchTokensFromBackend = async (googleToken) => {
    fetch(process.env.NEXT_PUBLIC_LAMBDA_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ googleIdToken: googleToken }),
    })
      .then((response) => {

        if(response.ok){
          const data = response.json(); 
          console.log(data); 
        }else{
          console.log(response);
        }
        setLoading(false);
        setIsRegistered(true);
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
