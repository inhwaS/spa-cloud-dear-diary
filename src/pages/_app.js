// pages/_app.js
import '../styles/index.css'; // Global CSS
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App({ Component, pageProps }) {
  return (
    // Wrap your app with GoogleOAuthProvider and pass your Google Client ID
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
}