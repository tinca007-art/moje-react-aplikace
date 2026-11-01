import React from "react";
import { ExerciseCard } from "../Components/ExerciseCard";
import { Timer } from "../Components/Timer";
import { AddExerciseCard } from "../Components/AddExercisesCard";

export function Dashboard({ exercises, handleSetChange, resetWorkout, onAddExercise, onDeleteExercise }) {
  return (
    <div className="app-content">
      <main className="exercise-list">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onIncrement={() => handleSetChange(exercise.id, 1)}
            onDecrement={() => handleSetChange(exercise.id, -1)}
            onDeleteExercise={() => onDeleteExercise(exercise.id)}
          />
        ))}
        <button onClick={resetWorkout} className="btn-reset-workout">
          Resetovat celý trénink
        </button>
      </main>
      <aside className="sidebar">
        <Timer />
        <AddExerciseCard onAddExercise={onAddExercise} />
      </aside>
    </div>
  );
}

