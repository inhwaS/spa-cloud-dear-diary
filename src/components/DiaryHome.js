import React, { useEffect, useState } from 'react';
import DiaryMain from './DiaryMain';
import { fetchDiaryInfo } from '../api/fetchDiaryInfo'

export default function DiaryHome({ credentials }) {
  const [diaryCreated, setDiaryCreated] = useState(false);
  const [diaryConnected, setDiaryConnected] = useState(false);
  const [showReadDiary, setShowReadDiary] = useState(null);
  const [showWriteDiary, setShowWriteDiary] = useState(null);
  const [loading, setLoading] = useState(true);

  const [diaryInfo, setDiaryInfo] = useState({
    diaryId: '',
    name1: '',
    name2: '',
    date: '',
    days: 0,
    connected: false,
  });

  const calculateDaysPassed = (inputDate) => {
    const today = new Date();
    const givenDate = new Date(inputDate);
    const differenceInMillis = today - givenDate;
    const daysPassed = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24));
  
    return daysPassed;
  };
  
  const getDiaryInfo = async () => {
    
    const diaryData = await fetchDiaryInfo(credentials);
    
    if (diaryData[0]) {
      console.log(diaryData[0].diaryId);  
      setDiaryCreated(true);
      const days = calculateDaysPassed(diaryData[0].startDate);
      setDiaryInfo({
        diaryId: diaryData[0].diaryId,
        name1: diaryData[0].user1Name,
        name2: diaryData[0].user2Name,
        date: diaryData[0].startDate,
        days: days,
        connected: diaryData[0].connected == 1 ? true : false,
      });

      if(diaryInfo.connected){
        setDiaryConnected(true);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (credentials.email) {
      getDiaryInfo();
    }
  }, [credentials]);
  useEffect(() => {
    if (diaryConnected) {
      getDiaryInfo();
    }
  }, [diaryConnected]);

  return (
    <div className="AppContainer">
      {loading ? (
        <div className="DiaryMain">
          <h3>Loading...</h3>
        </div>        
       ) : (
        <main className="Wrapper">
          <DiaryMain
            credentials={credentials}
            diaryInfo={diaryInfo}
            diaryCreated={diaryCreated}
            diaryConnected={diaryConnected}
            showWriteDiary={showWriteDiary}
            showReadDiary={showReadDiary}
            setDiaryInfo={setDiaryInfo}
            setShowReadDiary={setShowReadDiary}
            setShowWriteDiary={setShowWriteDiary}
            setDiaryCreated={setDiaryCreated}
            setDiaryConnected={setDiaryConnected}
            getDiaryInfo={getDiaryInfo}
          />
          </main>
       )
      }
    </div>
  );
}
