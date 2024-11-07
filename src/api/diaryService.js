// services/diaryService.js

export const fetchDiaryInfo = async () => {
    try {
      const response = await fetch('https://your-lambda-endpoint-url'); // Replace with your API endpoint
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching diary info:", error);
      throw error; // Or handle errors as needed
    }
  };
  