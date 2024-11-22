export const fetchDiaryInfo = async (credentials) => {
  console.log("upload image:", credentials.email);
  const userId = credentials.email;
  const fetchUrl = `${process.env.NEXT_PUBLIC_LAMBDA_URL}/upload-image`;

  try {
    const response = await fetch(fetchUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};