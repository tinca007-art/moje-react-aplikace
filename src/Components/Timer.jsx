import React, { useState, useEffect, useRef } from "react";

export function Timer() {
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null); // Reference pro bezpečné držení intervalu

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            // Spustíme alert až po vykreslení nuly
            setTimeout(() => {
              alert("⏱️ Pauza vypršela! Jde se na další sérii.");
            }, 50);
            return 60; 
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    // Čištění při odchodu z komponenty
    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  const handlePreset = (time) => {
    setIsActive(false);
    setSeconds(time);
  };

  return (
    <div className="timer-box">
      <h3>⏱️ Odpočinek</h3>
      <div className="timer-display" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{seconds}s</div>
      
      <div className="btn-group">
        <button 
          onClick={() => setIsActive(!isActive)} 
          className={`btn-timer ${isActive ? "pause" : "start"}`}
        >
          {isActive ? "Pauza" : "Start"}
        </button>
        <button 
          onClick={() => { setIsActive(false); setSeconds(60); }} 
          className="btn-timer reset"
        >
          Reset
        </button>
      </div>

      <div className="preset-group" style={{ marginTop: '10px' }}>
        <button onClick={() => handlePreset(45)} className="btn-preset">45s</button>
        <button onClick={() => handlePreset(60)} className="btn-preset">60s</button>
        <button onClick={() => handlePreset(90)} className="btn-preset">90s</button>
      </div>
    </div>
  );
}

