import React, { useEffect, useState } from 'react';
import { fetchDiaryInfo } from '../api/fetchDiaryInfo';
import CreateDiary from '../components/CreateDiary';
import WaitingForConnection from '../components/WaitingForConnection';
import WriteDiary from '../components/WriteDiary';
import ReadDiary from '../components/ReadDiary';

const DiaryMain = ({
  credentials,
  diaryInfo,
  diaryCreated,
  diaryConnected,
  setDiaryInfo,
  setShowReadDiary,
  setShowWriteDiary,
  setDiaryCreated,
  setDiaryConnected,
}) => {
  const [showReadDiary, setShowReadDiaryLocal] = useState(false);
  const [showWriteDiary, setShowWriteDiaryLocal] = useState(false);

  return (
    <div className="DiaryMain">
      {/* Conditional Rendering of Components */}
      {!diaryCreated ? (
        <CreateDiary setDiaryCreated={setDiaryCreated} credentials={credentials} />
      ) : !diaryConnected ? (
        <WaitingForConnection diaryInfo={diaryInfo} />
      ) : showWriteDiary ? (
        <WriteDiary setShowWriteDiary={setShowWriteDiaryLocal} />
      ) : showReadDiary ? (
        <ReadDiary setShowReadDiary={setShowReadDiaryLocal} />
      ) : (
        <div className="DiaryContent">
          <div className="DiaryHeader">
            <span>{diaryInfo?.name1 || 'User1'}</span>
            <img src="./images/heart.png" alt="hearts" />
            <span>{diaryInfo?.name2 || 'User2'}</span>
          </div>
          <p>{diaryInfo?.date || 'Unknown date'} • {diaryInfo?.days || 0} days</p>
          {/* Diary Main Content */}
          <div className="DiaryIcon" onClick={() => setShowReadDiaryLocal(true)}>
            <img src="./images/diary.png" alt="Diary" style={{ cursor: 'pointer' }} />
          </div>
          <button className="BasicButton" onClick={() => setShowWriteDiaryLocal(true)}>
            New Entry
          </button>
        </div>
      )}
    </div>
  );
};

export default DiaryMain;
