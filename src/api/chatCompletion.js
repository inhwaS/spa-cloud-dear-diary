export const chatCompletion = async (keywords) => {
    console.log("creating chat for: ", keywords);
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
      return null;
    }
  };