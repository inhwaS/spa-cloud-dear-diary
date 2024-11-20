import React from 'react';

function WaitingForConnection({ diaryInfo }) {
  return (
    <div>
      <h2>Waiting for Connection</h2>
      <div className="form-group">
      <p>Share the diary ID with your partner:</p>
      <input type="text" value={diaryInfo.diaryId} readOnly />
      </div>
    </div>
  );
}

export default WaitingForConnection;
