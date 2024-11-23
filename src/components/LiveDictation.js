import React, { useState } from 'react';
import { writeDiary } from '../api/writeDiary';

const LiveDictation = ({ diaryInfo, credentials, setShowWriteDiary }) => {
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [keywords, setKeywords] = useState('');

  const handleStartDictation = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Web Speech API is not supported in your browser.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = 0; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      setKeywords(transcript.trim());
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleStopDictation = () => {
    setIsListening(false);
  };

  const handleWrite = async () => {
    setLoading(true);
    const s3_url = '#TRANSCRIBE#';
    const response = await writeDiary({ diaryInfo, credentials, s3_url, keywords });
    if(response){
      setLoading(false);
      setShowWriteDiary(false);
    }
  };  

  return (
    <div className="IconButton">
      <div className="image-uploader-container">
        {/* Conditionally render Transcribe/Stop buttons */}
        {!isListening ? (
          <button
            onClick={handleStartDictation}
            className="transcribe-button"
          >
            Transcribe
          </button>
        ) : (
          <button
            onClick={handleStopDictation}
            className="stop-button"
          >
            Stop
          </button>
        )}
      </div>

      {/* Display transcribed text in the textarea */}
      <textarea
        className="DiaryContentTextarea"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="Start speaking or type here..."
      />
      {/* Write Button, only visible when transcription has stopped */}
      {!isListening && keywords && (
          <button
            onClick={handleWrite}
            className="upload-button"
            disabled={loading}
            >
              {loading ? "Writing diary..." : "Write"}
          </button>
        )}
    </div>
  );
};

export default LiveDictation;
