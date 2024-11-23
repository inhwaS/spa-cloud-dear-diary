export const uploadImage = async ({credentials, file, diaryInfo }) => {
  const fetchUrl = `${process.env.NEXT_PUBLIC_LAMBDA_URL}/upload-image`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('userId', credentials.email);
  formData.append('diaryId', diaryInfo.diaryId);
  formData.append('name', credentials.name);

  try {
    const response = await fetch(fetchUrl, {
      method: 'POST',
      mode: 'cors',
      body: formData,
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
