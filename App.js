import React, { useState, useEffect } from 'react';
import './App.css';

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing tests are a fun way to improve your skills.",
  "JavaScript is a versatile programming language.",
  "React makes building user interfaces a breeze.",
  "Consistency is the key to success in coding."
];

function App() {
  const [userInput, setUserInput] = useState("");
  const [currentText, setCurrentText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [remark, setRemark]=useState("");

  // Select a random text when the app loads or resets
  useEffect(() => {
    setCurrentText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
  }, []);

  // Handle user input
  const handleInputChange = (event) => {
    if (!startTime) {
      setStartTime(new Date());
    }
    setUserInput(event.target.value);
  };

  // Manually end the test
  const handleEndTest = () => {
    setEndTime(new Date());
    setIsTestComplete(true);
  };

  // Calculate speed, accuracy, and elapsed time
  useEffect(() => {
    if (isTestComplete) {
      const timeTakenInMilliseconds = endTime - startTime;
      const timeTakenInMinutes = timeTakenInMilliseconds / 1000 / 60;
      const elapsedSecs = Math.floor(timeTakenInMilliseconds / 1000);
      setElapsedTime(elapsedSecs);

      const wordsTyped = userInput.trim().split(" ").length;
      const typingSpeed = Math.round(wordsTyped / timeTakenInMinutes);

      const correctChars = userInput
        .split("")
        .filter((char, index) => char === currentText[index]).length;
      const accuracyPercentage = Math.round(
        (correctChars / currentText.length) * 100
      );

      setSpeed(typingSpeed);
      setAccuracy(accuracyPercentage);
      if(typingSpeed>30)
      {
        setRemark("Good");
      }
      else{
        setRemark("Keep Practice");
      }

    }

  }, [isTestComplete, userInput, currentText, startTime, endTime]);

  // Reset the test
  const resetTest = () => {
    setUserInput("");
    setStartTime(null);
    setEndTime(null);
    setIsTestComplete(false);
    setSpeed(0);
    setAccuracy(0);
    setElapsedTime(0);
    setCurrentText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
  };

  return (
    <div className="container-fluid">
      <h1>Typing Speed Test</h1>
      <div className='row d-flex py-5'>
        <div className='sample-text-area col-lg-6'>
        <p className="sample-text">{currentText}</p>
        </div>
     
      <div className="test-area col-lg-6">
       
        <textarea
          value={userInput}
          onChange={handleInputChange}
          onPaste={(e) => e.preventDefault()} // Disable paste
          rows="1"
          cols="50"
          disabled={isTestComplete}
          placeholder="Start typing here..."
        ></textarea>
       
      </div>

      {!isTestComplete && (
          <button onClick={handleEndTest} className="submit-button mx-auto">
            End Test
          </button>
        )}

      </div>

      {isTestComplete && (
        <div className="results">
          <h2>Results:</h2>
          <p>Typing Speed: {speed} WPM</p>
          <p>Accuracy: {accuracy}%</p>
          <p>Time Taken: {elapsedTime} seconds</p>
          <p>Remark: {remark}</p>
          <button onClick={resetTest}>Retry</button>
        </div>
      )}
    </div>
  );
}

export default App;
