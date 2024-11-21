import React, { useEffect, useState } from 'react';
import DiaryMain from './DiaryMain';
import { fetchDiaryInfo } from '../api/fetchDiaryInfo';

export default function DiaryHome({ credentials }) {
  const [diaryCreated, setDiaryCreated] = useState(false);
  const [diaryConnected, setDiaryConnected] = useState(null);
  const [showReadDiary, setShowReadDiary] = useState(null);
  const [showWriteDiary, setShowWriteDiary] = useState(null);

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
    console.log(credentials.email);
    const diaryData = await fetchDiaryInfo(credentials.email);
    if (diaryData[0]) {
      const days = calculateDaysPassed(diaryData[0].startDate);
      setDiaryInfo({
        diaryId: diaryData[0].diaryId,
        name1: diaryData[0].user1Name,
        name2: diaryData[0].user2Name,
        date: diaryData[0].startDate,
        days: days,
        connected: diaryData[0].connected == 1 ? true : false,
      });
    };
  };

  useEffect(() => {
    if (credentials) {
      getDiaryInfo();
    }
  }, [credentials]);

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
    <div className="AppContainer">
      <main className="Wrapper">
        <DiaryMain
          credentials={credentials}
          diaryInfo={diaryInfo}
          diaryCreated={diaryCreated}
          diaryConnected={diaryConnected}
          setDiaryInfo={setDiaryInfo}
          setShowReadDiary={setShowReadDiary}
          setShowWriteDiary={setShowWriteDiary}
          setDiaryCreated={setDiaryCreated}
          setDiaryConnected={setDiaryConnected}
        />
      </main>
    </div>
  );
}
