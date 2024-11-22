import React, { useEffect, useState } from 'react';
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
  getDiaryInfo,
}) => {
  const [showReadDiary, setShowReadDiaryLocal] = useState(false);
  const [showWriteDiary, setShowWriteDiaryLocal] = useState(false);

  useEffect(() => {
    if (diaryInfo.diaryId) {
      setDiaryCreated(true);
      if(diaryInfo.connected){
          setDiaryConnected(true);
      }else{
          setDiaryConnected(false);
      }
    }
    console.log('diaryCreated >> ', diaryCreated);
    console.log('diaryConnected>> ', diaryConnected);

  }, [diaryInfo]);


  useEffect(() => {
    if (diaryCreated) {
      console.log('Diary has been successfully created. Fetching diary info...');
      getDiaryInfo();
    }
  }, [diaryCreated]);

  useEffect(() => {
    if (diaryConnected) {
      console.log('Diary has been successfully connected. getting diary info...');
      getDiaryInfo();
    }
  }, [diaryConnected]);

  return (
    <div>
      {/* Conditional Rendering of Components */}
      {!diaryCreated ? (
        <CreateDiary setDiaryCreated={setDiaryCreated} setDiaryConnected={setDiaryConnected} credentials={credentials} />
      ) : !diaryConnected ? (
        <WaitingForConnection diaryInfo={diaryInfo} getDiaryInfo={getDiaryInfo}/>
      ) : showWriteDiary ? (
        <WriteDiary setShowWriteDiary={setShowWriteDiaryLocal} />
      ) : showReadDiary ? (
        <ReadDiary setShowReadDiary={setShowReadDiaryLocal} />
      ) : (
        <div className="DiaryMain">
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
