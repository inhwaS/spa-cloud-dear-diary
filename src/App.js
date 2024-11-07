import React, { useState, useEffect } from 'react';
import SignUp from './components/SignUp';
import CreateDiary from './components/CreateDiary';
import WaitingForConnection from './components/WaitingForConnection';
import './App.css';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [diaryCreated, setDiaryCreated] = useState(false);
  const [diaryConnected, setDiaryConnected] = useState(true); // Assume connected for styling demo
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
    // Fetch diary information from AWS Lambda API
    const fetchDiaryInfo = async () => {
      try {
        const response = await fetch('https://your-lambda-endpoint-url'); // Replace with your API endpoint
        const data = await response.json();
        
        // Assuming the API returns { name1, name2, date, days }
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

    fetchDiaryInfo();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dear Diary</h1>
        <nav>
          <span>Logout</span>
        </nav>
      </header>

      <main>
        {!isRegistered ? (
          <SignUp onRegister={handleLogin} />
        ) : !diaryCreated ? (
          <CreateDiary onCreateDiary={handleDiaryCreation} />
        ) : !diaryConnected ? (
          <WaitingForConnection onConnectDiary={handleDiaryConnection} />
        ) : (
          <div className="DiaryMain">
            <div className="DiaryHeader">
              <span>{diaryInfo.name1}</span>
              <img  src="./images/heart.png" alt="hearts" />
              <span>{diaryInfo.name2}</span>
            </div>
            <p>{diaryInfo.date} • {diaryInfo.days} days</p>
            <div className="DiaryIcon">
              <img src="./images/diary.png" alt="Diary" />
            </div>
            <div className="BasicButtonWrapper">
              <button className="BasicButton">New Entry</button>
              <button className="BasicButton">Read Diary</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
