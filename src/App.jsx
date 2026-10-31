import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./Components/Navigation";
import { initialExercises } from "./Components/ExerciseCard";
import { Dashboard } from "./Pages/Dashboard"; 
import { Analytics } from "./Pages/Analytics";

export function App() {
  const [exercises, setExercises] = useState(() => {
    const saved = localStorage.getItem("workout_progress");
    return saved ? JSON.parse(saved) : initialExercises;
  });

  // Ukládání do localStorage při každé změně serií
  useEffect(() => {
    localStorage.setItem("workout_progress", JSON.stringify(exercises));
  }, [exercises]);

  // OPRAVA: Precizní aktualizace stavu s okamžitým překreslením
  const handleSetChange = (id, increment) => {
    setExercises((prevExercises) => {
      return prevExercises.map((ex) => {
        if (ex.id === id) {
          const newSets = ex.completedSets + increment;
          if (newSets >= 0 && newSets <= ex.targetSets) {
            return { ...ex, completedSets: newSets };
          }
        }
        return ex;
      });
    });
  };

  const resetWorkout = () => {
    if (window.confirm("Opravdu chcete restartovat celý trénink?")) {
      setExercises(initialExercises);
    }
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <h1> Můj Tréninkový Deník</h1>
          <Navigation />
        </header>

        <Routes>
          <Route 
            path="/" 
            element={
              <Dashboard 
                exercises={exercises} 
                handleSetChange={handleSetChange} 
                resetWorkout={resetWorkout} 
              />
            } 
          />
          {/* OPRAVA: Předáváme aktuální stav přímo do Analytics, aby data nebyla zamrzlá */}
          <Route path="/statistiky" element={<Analytics exercises={exercises} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
