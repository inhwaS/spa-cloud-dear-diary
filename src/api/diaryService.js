export const fetchDiaryInfo = async () => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_LAMBDA_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching diary info:", error);
    // throw error;
  }
};
