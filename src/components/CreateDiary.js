import React, { useState } from 'react';
import { createDiary } from '../api/createDiary';

function Diary() {
  const [selectedAccordion, setSelectedAccordion] = useState(''); // To track which accordion is selected
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState(""); // Replace with your credentials state
  const [diaryCreated, setDiaryCreated] = useState(false);

  // Function to generate a random diary ID
  function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  // Handle the diary creation form submission
  const handleDiaryCreation = async (e) => {
    setLoading(true);
    e.preventDefault();
    const diaryId = generateRandomString();
    const response = await createDiary({diaryId, date, credentials});
    setDiaryCreated(true);
  };

  // Handle Connect Diary button click
  const handleConnectDiary = () => {
    // Logic for connecting the diary (this can be modified to match your implementation)
    console.log('Connecting to diary...');
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
                value={credentials} 
                onChange={(e) => setCredentials(e.target.value)} 
              />
              <button 
                onClick={handleConnectDiary} 
                className="BasicButton" 
                disabled={selectedAccordion !== 'connect'}
              >
                Connect
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Diary;
