import React from "react";

export function ExerciseCard({ exercise, onIncrement, onDecrement, onDeleteExercise }) {
  const beReady = exercise.completedSets === exercise.targetSets;
  const isCompleted = beReady;

  return (
    <div className={`exercise-card ${beReady ? "completed" : ""}`}>
      
      
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
            className={`btn-action btn-plus ${beReady ? "done" : ""}`}
          >
            {isCompleted ? "✓" : "+"}
          </button>           
          <button onClick={onDeleteExercise} className="btn-action btn-delete-exercise">X</button>
        </div>
      </div>

    </div>
  );
}
