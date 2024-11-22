export const uploadImage = async ({credentials, file, diaryInfo }) => {
  const fetchUrl = `${process.env.NEXT_PUBLIC_LAMBDA_URL}/upload-image`;

  // Create a FormData object
  const formData = new FormData();
  formData.append('file', file); // Add the image file
  formData.append('userId', credentials.email); // Add metadata
  formData.append('diaryId', diaryInfo.diaryId); // Add diaryId if applicable
  formData.append('name', credentials.name); // Add name if applicable

  try {
    const response = await fetch(fetchUrl, {
      method: 'POST',
      mode: 'cors',
      body: formData, // Use FormData for the request body
    });

    if (!response.ok) {
      console.error("Failed to upload image:", response.statusText);
      return null;
    }

    const data = await response.json();
    console.log("Image upload successful:", data);
    return data;
  } catch (error) {
    console.error("Error uploading image:", error.message);
    return null;
  }
};
