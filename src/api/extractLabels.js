export const extractLabels = async (s3_url) => {
  console.log(s3_url);
    const fetchUrl = `${process.env.NEXT_PUBLIC_LAMBDA_URL}/extract-labels`;
  
    try {
      const response = await fetch(fetchUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ s3_url }),
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