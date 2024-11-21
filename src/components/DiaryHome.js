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

  const getDiaryInfo = async () => {
    const diaryData = await fetchDiaryInfo(credentials);
    if (diaryData[0]) {
      setDiaryInfo({
        diaryId: diaryData[0].diaryId,
        name1: diaryData[0].user1,
        name2: diaryData[0].user2,
        date: diaryData[0].startDate,
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
      getDiaryInfo();
    }
  }, [diaryCreated]);

  useEffect(() => {
    if (diaryConnected) {
      console.log('Diary has been successfully connected.');
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
          setDiaryConnected={setDiaryConnected}
          setDiaryInfo={setDiaryInfo}
          setShowReadDiary={setShowReadDiary}
          setShowWriteDiary={setShowWriteDiary}
          setDiaryCreated={setDiaryCreated}
        />
      </main>
    </div>
  );
}
