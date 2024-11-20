export const fetchDiaryInfo = async (userId) => {
  console.log("Fetching diary info for user:", userId);
  const fetchUrl = `${process.env.NEXT_PUBLIC_LAMBDA_URL}/fetch-diary`;

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
    console.error("Error fetching diary info:", error);
    return null;
  }
};