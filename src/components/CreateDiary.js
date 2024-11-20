import React, { useState } from 'react';

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
    const fetchUrl = `${process.env.NEXT_PUBLIC_LAMBDA_URL}/create-diary`;

    try {
      const response = await fetch(fetchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          diaryId: diaryId,
          startDate: date,
          connected: false,
          user1: credentials,
        }),
      });

      if (!response.ok) {
        console.error('Failed to create diary:', response.status);
        return;
      }

      console.log('Diary created successfully!');
      setDiaryCreated(true); // Notify parent of successful diary creation
      setLoading(false);
    } catch (error) {
      console.error('Error during diary creation:', error);
      setLoading(false);
    }
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
