import React, { useEffect } from 'react';
import { FaSync } from 'react-icons/fa';

function WaitingForConnection({ diaryInfo, getDiaryInfo }) {

  useEffect(() => {
    if (diaryInfo) {
      console.log("diary Info has been changed!");
    }
  }, [diaryInfo]);

  const handleRefresh = () => {
    getDiaryInfo();
  };

  return (
    <div className="DiaryMain">
      <h2>Waiting for Connection</h2>
      <div className="form-group">
      <p>Share the diary ID with your partner:</p>
      <div className="input-refresh">
        <input type="text" value={diaryInfo.diaryId} readOnly />
        <button className="refresh-btn" onClick={handleRefresh}>
          <FaSync className="refresh-icon" />
        </button>
      </div>
      </div>
    </div>
  );
}

export default WaitingForConnection;
