// App.js
import React, { useState } from 'react';
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

  return (
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
            setDiaryInfo={setDiaryInfo}
            setShowReadDiary={setShowReadDiary}
            setShowWriteDiary={setShowWriteDiary}
          />
        )}
      </main>
    </div>
  );
}

export default App;
