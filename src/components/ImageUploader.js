import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import { uploadImage } from '../api/uploadImage';
import { extractLabels } from '../api/extractLabels';
import { chatCompletion } from '../api/chatCompletion';

const ImageUploader = ({ setIsImageUploaded, credentials, diaryInfo }) => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null); // For displaying the image preview
  const [loading, setLoading] = useState(false);
  const [isDiaryEntry, setDiaryEntry] = useState(false);
  const [keywords, setKeywords] = useState(""); // Initialize with an empty string

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      if (selectedFile.size <= 5 * 1024 * 1024) { // 5 MB limit
        setFile(selectedFile);
        setFilePreview(URL.createObjectURL(selectedFile)); // Generate preview URL
        setIsImageUploaded(true);
      } else {
        alert('File size must be less than 5MB');
      }
    } else {
      alert('Please upload a valid image file');
    }
  };

  const handleUpload = async () => {
    if (file) {
      setLoading(true);
      const data = await uploadImage({ credentials, file, diaryInfo });
      console.log(data.s3_url);
      const keywords = await extractLabels(data.s3_url); // Get keywords from image

      const diaryEntry = await chatCompletion(keywords); // Get diary entry based on keywords
      setLoading(false);
      setDiaryEntry(true); // Set to true after diary entry is fetched
      setKeywords(diaryEntry.reply); // Set the diary entry text to the textarea value
    } else {
      alert('No file selected');
    }
  };

  const handleWrite = async () => {
    // Handle writing the diary entry or saving it as needed
    console.log("Writing the diary...");
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
        {filePreview ? (
            <img 
            src={filePreview} 
            alt="Selected preview" 
            className="preview-image" 
            />
        ) : (
            <FaImage />
        )}
      </label>
      {/* Upload button disabled until a file is selected */}
      {!isDiaryEntry ? (
        <button 
          onClick={handleUpload} 
          className="upload-button" 
          disabled={!file} // Disabled if no file is selected
        >
          {loading ? "Uploading image..." : "Upload"}
        </button>
      ) : (
        <div>
          {/* Display the diary entry in a textarea */}
          <textarea
            value={keywords} // Set the value to `keywords`
            onChange={(e) => setKeywords(e.target.value)} // Optional: Allow editing of the diary entry
            rows="6" // Adjust rows for better UI
            className="diary-textarea"
          />
          <button 
            onClick={handleWrite} 
            className="upload-button"
            disabled={loading} // Disabled while writing
          >
            {loading ? "Writing diary..." : "Write"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
