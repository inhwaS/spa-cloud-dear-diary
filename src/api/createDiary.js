// src/api/createDiary.js

export const createDiary = async ({ diaryId, startDate, credentials }) => {
    console.log("createDiary diary info for user:", credentials, diaryId, startDate);
    const fetchUrl = `${process.env.NEXT_PUBLIC_LAMBDA_URL}/insert-diary`;
  
    try {
      const response = await fetch(fetchUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            diaryId: diaryId,
            startDate: startDate,
            connected: false,
            user1: credentials,
          }),
      });
  
      if (!response.ok) {
        console.error('Failed to create diary:', response.status);
        return null;
      }
  
      console.log('Diary created successfully!');
      return await response.json(); // Return the response if needed
    } catch (error) {
      console.error('Error during diary creation:', error);
      return null; // Handle errors gracefully
    }
  };
  