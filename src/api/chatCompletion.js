export const chatCompletion = async (keywords) => {
    const fetchUrl = `${process.env.NEXT_PUBLIC_LAMBDA_URL}/chat-completion`;
  
    try {
      const response = await fetch(fetchUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keywords }),
      });
  
      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };