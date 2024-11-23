import React, { useEffect, useState } from 'react';
import { readDiary } from '../api/readDiary';

function ReadDiary({ setShowReadDiary, diaryInfo }) {
  const [diaryContent, setDiaryContent] = useState([]); // State to store multiple diary entries
  const [loading, setLoading] = useState(true); // State to show loading status
  const [error, setError] = useState(null); // State to show any errors

  useEffect(() => {
    const readAllDiary = async () => {
      try {
        setLoading(true);
        const response = await readDiary({ diaryInfo });
        setDiaryContent(response); // Assuming response.data contains the array of diary entries
      } catch (error) {
        setError('Failed to load diary content. ', error); // Handle any errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    readAllDiary();
  }, []); // Empty dependency array ensures this runs only on mount

  const handleOnClick = () => {
    setShowReadDiary(false); // Update state to show the main diary view
  };

  // Convert s3:// URL to a publicly accessible URL
  const convertS3UrlToPublicUrl = (s3Url) => {
    return s3Url.replace('s3://', 'https://').replace('dear-diary-images', 'dear-diary-images.s3.us-east-1.amazonaws.com');
  };

  return (
    <div className="DiaryMain">
      <button className="BasicButton" onClick={handleOnClick}>Go Back</button>
      <h2>Read Diary</h2>

      {loading ? (
        <p>Loading...</p> // Show loading text while fetching data
      ) : error ? (
        <p className="error">{error}</p> // Show error message if fetching fails
      ) : (
        <div className="diary-content">
          {/* Map through diaryContent to render multiple diary entries */}
          {diaryContent.length > 0 ? (
            diaryContent.map((entry, index) => (
              <div key={index} className="diary-entry">
                <div className="diary-text">
                  <p>{entry?.labels}</p> {/* Assuming labels contain the diary text */}
                  <p><strong>Created on:</strong> {new Date(entry?.created_date).toLocaleString()}</p>
                  <p><strong>Wrote by:</strong> {entry?.name}</p>
                </div>

                {/* Render the image if available */}
                {entry?.s3_url && (
                  <div className="image-container">
                    <img
                      src={convertS3UrlToPublicUrl(entry.s3_url)} // Use the converted URL to show the image
                      alt={`Diary Image ${index + 1}`}
                      className="diary-image"
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No diary entries found.</p> // Display message if no diary entries exist
          )}
        </div>
      )}
    </div>
  );
}

export default ReadDiary;
