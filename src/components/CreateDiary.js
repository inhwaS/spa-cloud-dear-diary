import React, { useState } from 'react';

function CreateDiary({ setDiaryCreated, credentials }) {
  const [date, setDate] = useState('');

  function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
  }
  
  const handleDiaryCreation = async () => {
    const diaryId = generateRandomString();
    const fetchUrl = `${process.env.NEXT_PUBLIC_LAMBDA_URL}/insertDiary`;
    console.log('Sending request to:', fetchUrl);
  
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
  
      console.log('API response:', response);
  
      if (!response.ok) {
        console.error('Failed to create diary:', response.status);
        return;  // Stop further execution if there's an error
      }
  
      // Handle success response here
      console.log('Diary created successfully!');
    } catch (error) {
      console.error('Error during diary creation:', error);
    }
  };
  
  

  return (
    <div className='DiaryMain'>
      <h2>Create Diary</h2>
      <form onSubmit={handleDiaryCreation}>
        <div className='date-input-container'>
        <h4>Our journey began at &nbsp;&nbsp;</h4>
        <input type='date' value={date} onChange={(e) => setDate(e.target.value)} required/>
        </div>
        <button type='submit' className='BasicButton'>Create Diary</button>
      </form>
    </div>
  );
}

export default CreateDiary;
