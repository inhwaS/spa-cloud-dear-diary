import React, { useEffect, useState } from 'react';
import { readDiary } from '../api/readDiary';

function ReadDiary({ setShowReadDiary, diaryInfo }) {
  const [diaryContent, setDiaryContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const readAllDiary = async () => {
      try {
        setLoading(true);
        const response = await readDiary({ diaryInfo });
        setDiaryContent(response);
      } catch (error) {
        setError('Failed to load diary content. ', error);
      } finally {
        setLoading(false);
      }
    };

    readAllDiary();
  }, []);

  const handleOnClick = () => {
    setShowReadDiary(false);
  };

  const convertS3UrlToPublicUrl = (s3Url) => {
    return s3Url.replace('s3://', 'https://').replace('dear-diary-images', 'dear-diary-images.s3.us-east-1.amazonaws.com');
  };

  return (
    <div className="DiaryMain">
      <button className="BasicButton" onClick={handleOnClick}>Go Back</button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="diary-content">
          {/* Map through diaryContent to render multiple diary entries */}
          {diaryContent.length > 0 ? (
            diaryContent.map((entry, index) => (
              <div key={index} className="diary-entry">
                <div className="diary-text">
                  <p>{entry?.labels}</p>
                  <p><strong>Created on:</strong> {new Date(entry?.created_date).toLocaleString()}</p>
                  <p><strong>Written by:</strong> {entry?.name}</p>
                </div>

                {/* Render the image if available */}
                {entry?.s3_url && (
                  <div className="image-container">
                    <img
                      src={convertS3UrlToPublicUrl(entry.s3_url)}
                      alt={`Diary Image ${index + 1}`}
                      className="diary-image"
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No diary entries found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ReadDiary;
