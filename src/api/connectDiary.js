export const connectDiary = async ({ diaryId, credentials }) => {
    console.log("connect diary info for user:", credentials, diaryId);
    const fetchUrl = `${process.env.NEXT_PUBLIC_LAMBDA_URL}/connect-diary`;
    
    try {
      const response = await fetch(fetchUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          diaryId: diaryId,
          connected: '1',
          user2: credentials.email,
          user2Name: credentials.name,
          }),
      });
  
      if (!response.ok) {
      console.error('Failed to create diary:', response.status);
      return null;
      }
  
      console.log('Diary connected successfully!');
      return await response.json(); // Return the response if needed
    } catch (error) {
      console.error('Error during diary creation:', error);
      return null; // Handle errors gracefully
    }
  };
    