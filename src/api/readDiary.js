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

    return await response.json();
  } catch (error) {
    console.error('Error during diary writting:', error);
    return null;
  }
};
    