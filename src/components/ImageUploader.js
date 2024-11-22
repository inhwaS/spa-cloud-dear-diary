import React, { useState } from 'react';

const ImageUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      if (selectedFile.size <= 5 * 1024 * 1024) { // 5 MB limit
        setFile(selectedFile);
      } else {
        alert('File size must be less than 5MB');
      }
    } else {
      alert('Please upload a valid image file');
    }
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      fetch('/upload-image-endpoint', { 
        method: 'POST', 
        body: formData 
      })
      .then(response => response.json())
      .then(data => alert('Upload successful: ' + data.message))
      .catch(err => alert('Error: ' + err.message));
    } else {
      alert('No file selected');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUploader;
