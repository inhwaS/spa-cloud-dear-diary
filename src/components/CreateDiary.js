import React from 'react';

function CreateDiary({ onCreateDiary }) {
  return (
    <div className='DiaryMain'>
      <h2>Create Diary</h2>
      <button onClick={onCreateDiary} className='BasicButton'>Create Diary</button>
    </div>
  );
}

export default CreateDiary;
