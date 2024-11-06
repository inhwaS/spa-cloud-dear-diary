import React from 'react';

function CreateDiary({ onCreateDiary }) {
  return (
    <div>
      <h2>Create Diary</h2>
      <button onClick={onCreateDiary}>Create Diary</button>
    </div>
  );
}

export default CreateDiary;
