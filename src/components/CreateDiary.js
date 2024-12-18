import React, { useState } from 'react';
import { createDiary } from '../api/createDiary';
import { connectDiary } from '../api/connectDiary';

function Diary({ setDiaryCreated, credentials, setDiaryConnected}) {
  const [selectedAccordion, setSelectedAccordion] = useState("");
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [diaryId, setDiaryId] = useState("");

  function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  const handleDiaryCreation = async (e) => {
    setLoading(true);
    e.preventDefault();
    const diaryId = generateRandomString();
    await createDiary({diaryId, date, credentials});
    setDiaryCreated(true);
  };

  const handleConnectDiary = async (e) => {
    setLoading(true);
    e.preventDefault();
    await connectDiary({diaryId, credentials});
    setDiaryConnected(true);
  };

  return (
    <div className="DiaryMain">
      <div>
        {/* Accordion 1: Create Diary */}
        <div className="accordion">
          <button className='AccordionButton'
            onClick={() => setSelectedAccordion(selectedAccordion === 'create' ? '' : 'create')}
            aria-expanded={selectedAccordion === 'create'}
          >
            <h3>New Diary</h3>
          </button>

          {selectedAccordion === 'create' && (
            <div className="accordion-content">
              <form onSubmit={handleDiaryCreation}>
                <div className="date-input-container">
                  <h4>Our journey began at &nbsp;&nbsp;</h4>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="BasicButton" 
                  disabled={selectedAccordion !== 'create'}
                >
                  {loading ? "Creating Diary..." : "Create Diary"}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Accordion 2: Connect Diary */}
        <div className="accordion">
          <button className='AccordionButton'
            onClick={() => setSelectedAccordion(selectedAccordion === 'connect' ? '' : 'connect')}
            aria-expanded={selectedAccordion === 'connect'}
          >
            <h3>Connect Diary</h3>
          </button>
          {selectedAccordion === 'connect' && (
            <div className="form-group">
              <input 
                type="text" 
                placeholder="Enter diary ID" 
                value={diaryId}
                onChange={(e) => setDiaryId(e.target.value)}
                required
              />
              <button 
                onClick={handleConnectDiary} 
                className="BasicButton" 
                disabled={selectedAccordion !== 'connect'}
              >
                {loading ? "Connecting..." : "Connect"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Diary;
