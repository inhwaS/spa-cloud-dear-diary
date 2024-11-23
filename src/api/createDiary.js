export const createDiary = async ({ diaryId, date, credentials }) => {
  const fetchUrl = `${process.env.NEXT_PUBLIC_LAMBDA_URL}/create-diary`;

  try {
    const response = await fetch(fetchUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        diaryId: diaryId,
        startDate: date,
        connected: false,
        user1: credentials.email,
        user1Name: credentials.name,
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
  