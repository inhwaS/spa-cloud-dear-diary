export const connectDiary = async ({ diaryId, credentials }) => {
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
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error during diary creation:', error);
    return null;
  }
};
    