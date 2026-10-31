import React from "react";
import { ExerciseCard } from "../Components/ExerciseCard";
import { Timer } from "../Components/Timer";

export function Dashboard({ exercises, handleSetChange, resetWorkout }) {
  return (
    <div className="app-content">
      <main className="exercise-list">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onIncrement={() => handleSetChange(exercise.id, 1)}
            onDecrement={() => handleSetChange(exercise.id, -1)}
          />
        ))}
        <button onClick={resetWorkout} className="btn-reset-workout">
          Resetovat celý trénink
        </button>
      </main>
      <aside className="sidebar">
        <Timer />
      </aside>
    </div>
  );
}

