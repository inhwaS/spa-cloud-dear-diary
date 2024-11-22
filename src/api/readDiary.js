export const readDiary = async ({ diaryInfo }) => {
    const fetchUrl = `${process.env.NEXT_PUBLIC_LAMBDA_URL}/read-diary`;
    
    try {
      const response = await fetch(fetchUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          diaryId: diaryInfo.diaryId,
        }),
      });
  
      if (!response.ok) {
      console.error('Failed to write diary:', response.status);
      return null;
      }
  
      console.log('Diary wrote successfully!');
      return await response.json(); // Return the response if needed
    } catch (error) {
      console.error('Error during diary writting:', error);
      return null; // Handle errors gracefully
    }
  };
    