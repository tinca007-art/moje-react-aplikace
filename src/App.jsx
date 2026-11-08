import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./Components/Navigation";
import { Dashboard } from "./Pages/Dashboard"; 
import { Analytics } from "./Pages/Analytics";
import defaultData from './database/exercises.json';

export function App() {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/exercises")
      .then((response) => response.json()) 
      .then((data) => {
        setExercises(data); 
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Server neběží, načítám náhradní data...");

        const saved = localStorage.getItem("workout_progress");

        if (saved) {
          const parsedData = JSON.parse(saved);

          if (parsedData.length > 0) {
            setExercises(parsedData);
            setIsLoading(false);
            return; 
          }
        }

        if (Array.isArray(defaultData)) {
          setExercises(defaultData);
        } else if (defaultData.exercises) {
          setExercises(defaultData.exercises);
        }

        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isLoading === false) {
      const dataToString = JSON.stringify(exercises);
      localStorage.setItem("workout_progress", dataToString);
    }
  }, [exercises, isLoading]);

  const handleSetChange = (id, increment) => {
    const upravitCviky = exercises.map((ex) => {
      if (ex.id === id) {
        const newSerie = ex.completedSets + increment;
        
        if (newSerie >= 0 && newSerie <= ex.targetSets) {
          return { ...ex, completedSets: newSerie };
        }
      }
      return ex; 
    });
    setExercises(upravitCviky);
  };

  const handleAddExercise = (newEx) => {
    let maxId = 0;

    
    exercises.forEach((ex) => {
      const idAsNumber = Number(ex.id);
      if (idAsNumber > maxId) {
        maxId = idAsNumber;
      }
    });

    const novyCvik = {
      id: maxId + 1, 
      name: newEx.name,
      targetSets: Number(newEx.targetSets), 
      reps: newEx.reps,
      completedSets: 0, 
    };

    setExercises([...exercises, novyCvik]); 
  };

  // 5. Smazání cviku ze seznamu
  const handleDeleteExercise = (id) => {
    const zbyvajiciCviky = exercises.filter((ex) => ex.id !== id);
    setExercises(zbyvajiciCviky);
  };

  const resetWorkout = () => {
    const confirmReset = window.confirm("Opravdu chcete restartovat celý trénink?");
    if (confirmReset) {
      const resetExercises = exercises.map((ex) => {
        return { ...ex, completedSets: 0 };
      });
      setExercises(resetExercises); 
    }
  };
  
  if (isLoading) {
    return <div className="loading-screen">Načítání tréninku...</div>;
  }

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
