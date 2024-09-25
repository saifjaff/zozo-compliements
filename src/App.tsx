import { useState, useEffect } from "react";
import { Heart, Smile, Frown, Trophy, Star } from "lucide-react";
import "./App.css";

const compliments = {
  happy: [
    "Zozo, your smile brightens my day!",
    "Your laughter is contagious!",
    "Seeing you happy makes everything better.",
    "Your joy radiates and lights up the room!",
    "I love seeing you in such high spirits!",
    "Your happiness is a gift to everyone around you.",
    "That smile of yours is absolutely gorgeous, Zoya!",
    "You make the world a brighter place just by being you!",
    "Your positive energy is absolutely incredible!",
    "Babe, your happiness is the perfect cure for any bad day!",
  ],
  sad: [
    "I'm here for you, always.",
    "Zoya, this too shall pass. You're stronger than you know.",
    "Wish I could give you a big hug right now.",
    "It's okay to not be okay sometimes. Your feelings are valid.",
    "I'm just a call away if you need to talk.",
    "You're not alone in this. We'll get through it together.",
    "Sending you all my love and support, Zozo.",
    "You're so brave for facing these feelings.",
    "I believe in your strength to overcome this, babe.",
    "Remember, even the darkest night will end and the sun will rise.",
  ],
  needsMotivation: [
    "You've got this! Your dedication to dental school is inspiring!",
    "Remember how far you've come in your studies. You're amazing!",
    "Every challenge you overcome is a step towards becoming an incredible dentist!",
    "Your commitment to learning is truly admirable, Zoya!",
    "You're going to make such a difference in your patients' lives!",
    "Keep pushing forward. Your hard work will pay off!",
    "Zozo, you have the power to transform smiles and boost confidence!",
    "Your passion for dentistry shines through in everything you do!",
    "Believe in yourself as much as I believe in you, babe!",
    "Remember, every expert was once a beginner. You're on your way to greatness!",
  ],
  missingYou: [
    "I miss you more than words can express.",
    "Counting down the moments until I see you again.",
    "The world feels a little less bright without you here.",
    "Zozo, every love song I hear reminds me of you.",
    "I see reminders of you in the little things around me.",
    "The distance is tough, but our love is tougher.",
    "Carrying you in my thoughts until I can hold you in my arms.",
    "Zoya, you're the missing piece to my puzzle right now.",
    "Babe, can't wait to create more memories with you soon!",
    "Missing your smile, your laugh, and everything about you.",
  ],
};

type Mood = keyof typeof compliments;

const App = () => {
  const [currentMood, setCurrentMood] = useState<Mood | null>(null);
  const [currentCompliment, setCurrentCompliment] = useState("");

  const getRandomCompliment = (mood: Mood) => {
    const moodCompliments = compliments[mood];
    const randomIndex = Math.floor(Math.random() * moodCompliments.length);
    return moodCompliments[randomIndex];
  };

  useEffect(() => {
    if (currentMood) {
      setCurrentCompliment(getRandomCompliment(currentMood));
    }
  }, [currentMood]);

  const handleMoodSelection = (mood: Mood) => {
    setCurrentMood(mood);
  };

  const handleNewCompliment = () => {
    if (currentMood) {
      setCurrentCompliment(getRandomCompliment(currentMood));
    }
  };

  const resetMood = () => {
    setCurrentMood(null);
    setCurrentCompliment("");
  };

  return (
    <div className="compliment-container">
      <div className="compliment-card">
        <img 
          src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif" 
          alt="cute love bear" 
          className="love-image"
        />
        {currentMood ? (
          <>
            <h2 className="compliment-text">{currentCompliment}</h2>
            <button
              className="new-compliment-button"
              onClick={handleNewCompliment}
            >
              New Message <Heart className="inline-icon" />
            </button>
            <button onClick={resetMood} className="change-mood-button">
              Change Mood
            </button>
          </>
        ) : (
          <>
            <h2 className="mood-prompt">How are you feeling today, my favorite dentist?</h2>
            <div className="mood-buttons">
              <button onClick={() => handleMoodSelection('happy')} className="mood-button happy">
                <Smile /> Happy
              </button>
              <button onClick={() => handleMoodSelection('sad')} className="mood-button sad">
                <Frown /> Sad
              </button>
              <button onClick={() => handleMoodSelection('needsMotivation')} className="mood-button motivation">
                <Trophy /> Need Motivation
              </button>
              <button onClick={() => handleMoodSelection('missingYou')} className="mood-button missing">
                <Star /> Missing You
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;