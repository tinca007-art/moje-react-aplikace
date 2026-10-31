import React from "react";


export const initialExercises = [
  { id: 1, name: "Dřepy s činkou", targetSets: 4, reps: "10-12", completedSets: 0 },
  { id: 2, name: "Bench-press", targetSets: 4, reps: "8-10", completedSets: 0 },
  { id: 3, name: "Mrtvý tah", targetSets: 3, reps: "8", completedSets: 0 },
  { id: 4, name: "Shyby (Přítahy)", targetSets: 3, reps: "Max", completedSets: 0 },
];

export function ExerciseCard({ exercise, onIncrement, onDecrement }) {
  const isCompleted = exercise.completedSets === exercise.targetSets;

  return (
    <div className={`exercise-card ${isCompleted ? "completed" : ""}`}>
      <div className="exercise-info">
        <h3>{exercise.name}</h3>
        <p>Cíl: {exercise.targetSets} série po {exercise.reps} opakováních</p>
      </div>
      
      <div className="counter-container">
        <span className="status-number">
          {exercise.completedSets} / {exercise.targetSets}
        </span>
        <div className="btn-group">
          <button onClick={onDecrement} className="btn-action btn-minus">-</button>
          <button 
            onClick={onIncrement} 
            className={`btn-action btn-plus ${isCompleted ? "done" : ""}`}
          >
            {isCompleted ? "✓" : "+"}
          </button>
        </div>
      </div>
    </div>
  );
}

