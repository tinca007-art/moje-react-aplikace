import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./Components/Navigation";
import { initialExercises } from "./Components/ExerciseCard";
import { Dashboard } from "./Pages/Dashboard"; 
import { Analytics } from "./Pages/Analytics";
import { AddExerciseCard } from "./Components/AddExercisesCard";

export function App() {
  const [exercises, setExercises] = useState(() => {
    const saved = localStorage.getItem("workout_progress");
    return saved ? JSON.parse(saved) : initialExercises;
  });

  useEffect(() => {
    localStorage.setItem("workout_progress", JSON.stringify(exercises));
  }, [exercises]);

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

  const handleAddExercise = (newEx) => {
    setExercises((prevExercises) => [
      ...prevExercises,
      {
        id: Date.now(), 
        name: newEx.name,
        targetSets: newEx.targetSets,
        reps: newEx.reps,
        completedSets: 0,
      },
    ]);
  };
  const handleDeleteExercise = (id) => {
    setExercises((prevExercises) => prevExercises.filter((ex) => ex.id !== id));
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
                onAddExercise={handleAddExercise}
                onDeleteExercise={handleDeleteExercise}
              />
            } 
          />
      
          <Route path="/statistiky" element={<Analytics exercises={exercises} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
