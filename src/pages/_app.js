// pages/_app.js
import '../styles/index.css'; // Global CSS
import React from 'react';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
