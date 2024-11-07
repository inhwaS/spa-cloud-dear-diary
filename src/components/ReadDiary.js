import React from 'react';

function ReadDiary({ diaryInfo, setShowReadDiary }) {
  const handleOnClick = () => {
    setShowReadDiary(false); // Update state to show the main diary view
  };

  return (
    <div className='DiaryMain'>
      <button className="BasicButton" onClick={handleOnClick}>Go Back</button>
      <h2>Read Diary</h2>
      <p>This is where you can read your diary entries.</p>
    </div>
  );
}

export default ReadDiary;
