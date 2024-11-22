import React, { useState } from 'react';
import { FaImage, FaMicrophoneAlt } from 'react-icons/fa';
import ImageUploader from './ImageUploader';
import LiveDictation from './LiveDictation';

function WriteDiary({ setShowWriteDiary, credentials, diaryInfo }) {
  const [isImageUploaderVisible, setIsImageUploaderVisible] = useState(false);
  const [isDictationVisible, setIsDictationVisible] = useState(false);

  const handleOnClick = () => {
    setShowWriteDiary(false);
  };

  const handleShowImageUploader = () => {
    setIsImageUploaderVisible(true);
    setIsDictationVisible(false);
  };

  const handleShowDictation = () => {
    setIsDictationVisible(true);
    setIsImageUploaderVisible(false);
  };

  return (
    <div className="DiaryMain">
      <div>
        <button className="BasicButton" onClick={handleOnClick}>
          Go Back
        </button>
        <div className="IconButtonWrapper">
          <button className="IconButton" onClick={handleShowImageUploader}>
            <FaImage className="upload-icon" />
          </button>
          <button className="IconButton" onClick={handleShowDictation}>
            <FaMicrophoneAlt className="microphone-icon" />
          </button>
        </div>

        {/* Conditionally show ImageUploader or LiveDictation */}
        {isImageUploaderVisible && (
          <ImageUploader
            setIsImageUploaded={setIsImageUploaderVisible}
            credentials={credentials}
            diaryInfo={diaryInfo}
            setShowWriteDiary={setShowWriteDiary}
          />
        )}
        {isDictationVisible && (
          <LiveDictation 
            diaryInfo={diaryInfo}
            credentials={credentials}
            setShowWriteDiary={setShowWriteDiary}
          />
        )}
      </div>
    </div>
  );
}

export default WriteDiary;
