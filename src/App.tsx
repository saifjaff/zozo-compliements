import React, { useState } from "react";
import "./App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const phrases = [
  "No",
  "Are you sure Rubab?",
  "Really sure?",
  "RUBAB ?!?!??",
  "Please reconsider",
  "Don't do this to me... RUBAB ?!?",
  "I'm gonna cry Rubab...",
  "You're breaking my heart Rubab;(",
];

const foodOptions = ["Coffee", "Sushi", "Ice Cream", "Dosa"];
const kanyeImageUrl = "https://i.kym-cdn.com/entries/icons/facebook/000/033/421/cover2.jpg";
const clbImageUrl = "https://upload.wikimedia.org/wikipedia/en/7/79/Drake_-_Certified_Lover_Boy.png";
const dondaImageUrl = "https://upload.wikimedia.org/wikipedia/commons/a/a0/Almost_black_square_020305.png";
const denverNuggetsJeansImageUrl = "https://i.ytimg.com/vi/eE7weltxfh8/hqdefault.jpg";
const yankeeNoBrimImageUrl = "https://i.kym-cdn.com/entries/icons/facebook/000/033/446/cover4.jpg";

const App: React.FC = () => {
  const [noCount, setNoCount] = useState<number>(0);
  const [showThankYouPage, setShowThankYouPage] = useState<boolean>(false);
  const [showCalendarPage, setShowCalendarPage] = useState<boolean>(false);
  const [showKanyeImage, setShowKanyeImage] = useState<boolean>(false);
  const [showGame, setShowGame] = useState<boolean>(false);
  const [gameStage, setGameStage] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [food, setFood] = useState<string>("");
  const [q1, setQ1] = useState<string>("");
  const [q2, setQ2] = useState<string>("");
  const yesButtonSize: number = noCount * 20 + 16;

  const handleNoClick = (): void => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = (): string => {
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const handleYesClick = (): void => {
    setShowGame(true);
    setShowKanyeImage(true);
    setShowThankYouPage(true);
  };

  const handleSetTimeClick = (): void => {
    setShowThankYouPage(false);
    setShowCalendarPage(true);
  };

  const handleGameClick = (): void => {
    setShowGame(true);
    setShowKanyeImage(false);
    setShowThankYouPage(false);
  };

  const handleGameChoice = (choice: string): void => {
    if (gameStage === 0) {
      setQ1(choice);
    } else if (gameStage === 1) {
      setQ2(choice);
    }
    setGameStage(gameStage + 1);
  };

  const isDateInRange = (date: Date): boolean => {
    const startDate = new Date("April 11, 2024");
    const endDate = new Date("April 25, 2024");
    return date >= startDate && date <= endDate;
  };

  const handleSubmit = async (): Promise<void> => {
    const response = {
      response: noCount,
      date: selectedDate.toDateString(),
      place: food, 
      q1: q1,
      q2: q2,
      user: "Rubab", 
      time: new Date().toISOString(),
    };

    try {
      const netlifyResponse = await fetch('/.netlify/functions/submitResponse', {
        method: 'POST',
        body: JSON.stringify({ data: [response] }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!netlifyResponse.ok) {
        throw new Error('Network response was not ok');
      }

      setShowCalendarPage(false); // Hide calendar page after submission
      setShowKanyeImage(true);    // Show Kanye image after submission

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const renderGameOptions = () => {
    switch (gameStage) {
      case 0:
        return (
          <>
            <img src={clbImageUrl} alt="CLB" style={{ width: "150px", height: "auto" }} />
            <button onClick={() => handleGameChoice("CLB")}>CLB</button>
            <img src={dondaImageUrl} alt="DONDA" style={{ width: "150px", height: "auto" }} />
            <button onClick={() => handleGameChoice("DONDA")}>DONDA</button>
          </>
        );
      case 1:
        return (
          <>
            <img src={denverNuggetsJeansImageUrl} alt="Denver Nuggets Jeans" style={{ width: "150px", height: "auto" }} />
            <button onClick={() => handleGameChoice("Denver Nuggets Jeans")}>Denver Nuggets Jeans</button>
            <img src={yankeeNoBrimImageUrl} alt="Yankee No Brim" style={{ width: "150px", height: "auto" }} />
            <button onClick={() => handleGameChoice("Yankee No Brim")}>Yankee No Brim</button>
          </>
        );
      default:
        return <p>SEE YOU ON {selectedDate.toDateString()} FOR {food}</p>;
    }
  };

  return (
    <div className="valentine-container">
      {showThankYouPage ? (
        <>
          <img alt="bears kissing" src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" />
          <div className="text">Thank you!</div>
          <button onClick={handleSetTimeClick}>Set Time</button>
        </>
      ) : showCalendarPage ? (
        <>
          <DatePicker selected={selectedDate} onChange={(date: Date) => setSelectedDate(date)} filterDate={isDateInRange} dateFormat="MMMM d, yyyy" />
          <select value={food} onChange={(e) => setFood(e.target.value)}>
            <option value="">Select Food Preference</option>
            {foodOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
          <button onClick={handleSubmit}>Next</button>
        </>
      ) : showKanyeImage ? (
        <>
          <img src={kanyeImageUrl} alt="Kanye West" style={{ width: "100%", height: "auto" }} />
          <button onClick={handleGameClick} style={{ display: "block", margin: "20px auto" }}>
            Want to play a quick game?
          </button>
          {showThankYouPage && <div className="text">Thank you!</div>}
        </>
      ) : showGame ? (
        <div style={{ textAlign: "center" }}>{renderGameOptions()}</div>
      ) : (
        <>
          <img alt="bear with hearts" src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif" />
          <div>Ms. Rubab Raza, will you go out with me?</div>
          <div>
            <button className="yesButton" style={{ fontSize: yesButtonSize }} onClick={handleYesClick}>Yes</button>
            <button className="noButton" onClick={handleNoClick}>{getNoButtonText()}</button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;