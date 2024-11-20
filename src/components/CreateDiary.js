import React, { useState } from 'react';
import { createDiary } from '../api/createDiary';

function CreateDiary({ setDiaryCreated, credentials }) {
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  const handleDiaryCreation = async (e) => {
    setLoading(true);
    e.preventDefault();
    const diaryId = generateRandomString();
    const response = await createDiary(credentials, diaryId, date);
    console.log(response);

  };

  return (
    <div className="DiaryMain">
      <h2>Create Diary</h2>
      <form onSubmit={handleDiaryCreation}>
        <div className="date-input-container">
          <h4>Our journey began at &nbsp;&nbsp;</h4>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="BasicButton">
          {loading ? "Creating Diary..." : "Create Diary"}
        </button>
      </form>
    </div>
  );
}

export default CreateDiary;
