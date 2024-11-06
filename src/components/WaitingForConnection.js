import React from 'react';

function WaitingForConnection({ onConnectDiary }) {
  return (
    <div>
      <h2>Waiting for Connection</h2>
      <p>Please wait while we connect your diary...</p>
      <button onClick={onConnectDiary}>Connect Diary</button>
    </div>
  );
}

export default WaitingForConnection;
