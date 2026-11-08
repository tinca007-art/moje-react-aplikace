import React, { useState, useEffect } from "react";

export function Timer() {
  const [seconds, setSeconds] = useState(60);   
  const [isActive, setIsActive] = useState(false); 

  useEffect(() => {
    
    if (!isActive) return;

    const countDown = setInterval(() => {
      setSeconds((oldTime) => {
       
        if (oldTime <= 1) {
          setIsActive(false); 
          alert("Pauza vypršela! Jde se na další sérii."); 
          return 60; 
        }
        return oldTime - 1;
      });
    }, 1000);

    return () => clearInterval(countDown);
  }, [isActive]); 

  const changeSpeedTime = (seconds) => {
    setIsActive(false); 
    setSeconds(seconds); 
  };

  return (
    <div className="timer-box">
      <h3>Odpočinek</h3>
      <div className="timer-display" style={{ fontSize: "2rem", fontWeight: "bold" }}>
        {seconds}s
      </div>
      
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

      <div className="preset-group" style={{ marginTop: "10px" }}>
        <button onClick={() => changeSpeedTime(45)} className="btn-preset">45s</button>
        <button onClick={() => changeSpeedTime(60)} className="btn-preset">60s</button>
        <button onClick={() => changeSpeedTime(90)} className="btn-preset">90s</button>
      </div>
    </div>
  );
}
