import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchDiaryInfo } from './api/diaryService';
import CreateDiary from './components/CreateDiary';
import WaitingForConnection from './components/WaitingForConnection';
import ReadDiary from './components/ReadDiary';
import DiaryMain from './components/DiaryMain';
import './App.css';
import Auth from './components/auth/Auth';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [diaryCreated, setDiaryCreated] = useState(false);
  const [diaryConnected, setDiaryConnected] = useState(true);
  const [showReadDiary, setShowReadDiary] = useState(false);

  const [diaryInfo, setDiaryInfo] = useState({
    name1: '',
    name2: '',
    date: '',
    days: 0,
  });

  const handleLogin = () => setIsRegistered(true);
  const handleDiaryCreation = () => setDiaryCreated(true);
  const handleDiaryConnection = () => setDiaryConnected(true);

  useEffect(() => {
    const getDiaryInfo = async () => {
      try {
        const data = await fetchDiaryInfo();
        setDiaryInfo({
          name1: data.name1,
          name2: data.name2,
          date: data.date,
          days: data.days,
        });
      } catch (error) {
        console.error("Error fetching diary info:", error);
      }
    };

    getDiaryInfo();
  }, []);

  return (
    <Router> {/* Wrap your app with BrowserRouter */}
      <div className="App">
        <main className="Wrapper">
          {!isRegistered ? (
              <Auth onRegister={handleLogin} setIsRegistered={setIsRegistered}/>
            ) : !diaryCreated ? (
              <CreateDiary onCreateDiary={handleDiaryCreation} />
            ) : !diaryConnected ? (
              <WaitingForConnection onConnectDiary={handleDiaryConnection} />
            ) : showReadDiary ? (
              <ReadDiary diaryInfo={diaryInfo} setShowReadDiary={setShowReadDiary}/>
            ) : (
              <DiaryMain diaryInfo={diaryInfo} setShowReadDiary={setShowReadDiary} />
            )
          }
        </main>
      </div>
    </Router> // Close Router here
  );
}

export default App;
