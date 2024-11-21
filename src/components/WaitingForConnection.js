import React, { useEffect } from 'react';

function WaitingForConnection({ diaryInfo }) {

  useEffect(() => {
    if (diaryInfo) {
      console.log('lets get diaryInfo');
    }
  }, [diaryInfo]);

  return (
    <div className="DiaryMain">
      <h2>Waiting for Connection</h2>
      <div className="form-group">
      <p>Share the diary ID with your partner:</p>
      <input type="text" value={diaryInfo.diaryId} readOnly />
      </div>
    </div>
  );
}

export default WaitingForConnection;
