// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { fetchDiaryInfo } from './api/diaryService';
import CreateDiary from './components/CreateDiary';
import WaitingForConnection from './components/WaitingForConnection';
import ReadDiary from './components/ReadDiary';
import DiaryMain from './components/DiaryMain';
import WriteDiary from './components/WriteDiary';  // Assuming you have a WriteDiary component
import './App.css';
import Auth from './components/auth/Auth';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [diaryCreated, setDiaryCreated] = useState(false);
  const [diaryConnected, setDiaryConnected] = useState(true);
  const [showReadDiary, setShowReadDiary] = useState(false);
  const [showWriteDiary, setShowWriteDiary] = useState(false); // State for WriteDiary visibility

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
    <Router>
      <div className="App">
        <main className="Wrapper">
          {!isRegistered ? (
            <Auth onRegister={handleLogin} setIsRegistered={setIsRegistered} />
          ) : !diaryCreated ? (
            <CreateDiary onCreateDiary={handleDiaryCreation} />
          ) : !diaryConnected ? (
            <WaitingForConnection onConnectDiary={handleDiaryConnection} />
          ) : showWriteDiary ? (  // Conditionally render WriteDiary
            <WriteDiary setShowWriteDiary={setShowWriteDiary}/>
          ) : showReadDiary ? (
            <ReadDiary  setShowReadDiary={setShowReadDiary} />
          ) : (
            <DiaryMain
              diaryInfo={diaryInfo}
              setShowReadDiary={setShowReadDiary}
              setShowWriteDiary={setShowWriteDiary}  // Pass the function to DiaryMain
            />
          )}
        </main>
      </div>
    </Router>
  );
}

export default App;
