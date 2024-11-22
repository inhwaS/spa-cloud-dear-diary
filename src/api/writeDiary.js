export const writeDiary = async ({ diaryInfo, credentials, s3_url, keywords }) => {
    const fetchUrl = `${process.env.NEXT_PUBLIC_LAMBDA_URL}/write-diary`;
    
    try {
      const response = await fetch(fetchUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          diaryId: diaryInfo.diaryId,
          labels: keywords,
          s3_url: s3_url,
          email: credentials.email,
          name: credentials.name,
          }),
      });
  
      if (!response.ok) {
      console.error('Failed to write diary:', response.status);
      return null;
      }
  
      return await response.json(); // Return the response if needed
    } catch (error) {
      console.error('Error during diary writting:', error);
      return null; // Handle errors gracefully
    }
  };
    