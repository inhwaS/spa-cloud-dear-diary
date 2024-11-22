import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';

const ImageUploader = ({ setIsImageUploaded }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      if (selectedFile.size <= 5 * 1024 * 1024) { // 5 MB limit
        setFile(selectedFile);
        setIsImageUploaded(true);
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
    <div className="image-uploader-container">
      {/* Hidden file input */}
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        id="fileInput"
        className="file-input"
      />
      {/* Label styled as upload button */}
      <label htmlFor="fileInput" className="upload-icon">
        <FaImage />
      </label>
      {file && <p className="file-name">{file.name}</p>}
      {/* Upload button disabled until a file is selected */}
      <button 
        onClick={handleUpload} 
        className="upload-button" 
        disabled={!file} // Disabled if no file is selected
      >
        Upload
      </button>
    </div>
  );
};

export default ImageUploader;
