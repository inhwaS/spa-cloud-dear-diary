export const writeDiary = async ({ diaryInfo, s3_url, keywords }) => {
    const diaryId = diaryInfo.diaryId;
    console.log("connect diary info for user:", diaryId, s3_url);
    const fetchUrl = `${process.env.NEXT_PUBLIC_LAMBDA_URL}/write-diary`;
    
    try {
      const response = await fetch(fetchUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          diaryId: diaryId,
          labels: keywords,
          s3_url: s3_url,
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
    