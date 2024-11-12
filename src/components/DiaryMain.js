// src/components/DiaryMain.js
import React, { useEffect } from 'react';
import { fetchDiaryInfo } from '../api/diaryService'

const DiaryMain = ({ diaryInfo, setDiaryInfo, setShowReadDiary, setShowWriteDiary }) => {
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
  }, [setDiaryInfo]); 

  return (
    <div className="DiaryMain">
      <div className="DiaryHeader">
        <span>{diaryInfo.name1}</span>
        <img src="./images/heart.png" alt="hearts" />
        <span>{diaryInfo.name2}</span>
      </div>
      <p>{diaryInfo.date} • {diaryInfo.days} days</p>

      {/* Diary Icon as button */}
      <div className="DiaryIcon" onClick={() => setShowReadDiary(true)}>
        <img src="./images/diary.png" alt="Diary" style={{ cursor: 'pointer' }} />
      </div>
      <button 
        className="BasicButton" 
        onClick={() => setShowWriteDiary(true)}
      >
        New Entry
      </button>
    </div>
  );
};

export default DiaryMain;
