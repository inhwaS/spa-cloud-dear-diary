// src/components/DiaryMain.js
import React from 'react';

const DiaryMain = ({ diaryInfo, setShowReadDiary }) => {
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
      <button className="BasicButton">New Entry</button>
    </div>
  );
};

export default DiaryMain;
