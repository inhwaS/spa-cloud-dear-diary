// src/components/WriteDiary.js
import React, { useState } from 'react';
import { FaImage, FaMicrophoneAlt } from 'react-icons/fa'; // Importing React Icons

function WriteDiary({ setShowWriteDiary }) {
  const [content, setContent] = useState('');
  const [refinedContent, setRefinedContent] = useState(null);

  const handleRefineContent = () => {
    // Simulate LLM refinement process
    setRefinedContent(`Refined: ${content}`);
    // TODO
    setContent(false);
  };

  const handleOnClick = () => {
    console.log("Go back to main diary view");
    setShowWriteDiary(false); // Update state to show the main diary view
  };

  return (
    <div className="DiaryMain">
      <div>
        <button className="BasicButton" onClick={handleOnClick}>Go Back</button>
        <h2>Write Diary</h2>
        {/* Container for the icons */}
        <div className="IconButtonWrapper">
          {/* Icon for uploading pictures */}
          <div className="IconButton" onClick={handleRefineContent}>
            <FaImage style={{ fontSize: '40px', cursor: 'pointer', color: '#3498db' }} />
          </div>

          {/* Icon for voice dictation */}
          <div className="IconButton" onClick={handleRefineContent}>
            <FaMicrophoneAlt style={{ fontSize: '40px', cursor: 'pointer', color: '#e74c3c' }} />
          </div>
        </div>
        {refinedContent && <p><strong>Refined Content:</strong> {refinedContent}</p>}
      </div>
    </div>
  );
}

export default WriteDiary;
