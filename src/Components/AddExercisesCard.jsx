import React, { useState } from "react";

export function AddExerciseCard({ onAddExercise }) {
  const [name, setName] = useState("");
  const [targetSets, setTargetSets] = useState(4);
  const [reps, setReps] = useState("10-12");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Předání nového cviku do nadřazeného stavu v App
    onAddExercise({
      name: name.trim(),
      targetSets: parseInt(targetSets, 10) || 4,
      reps: reps.trim() || "10",
    });

    // Reset formuláře
    setName("");
    setTargetSets(4);
    setReps("10-12");
  };

  return (
    <div className="exercise-card add-exercise-card">
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <h3 style={{ margin: "0 0 15px 0", color: "dodgerblue" }}>Přidat vlastní cvik</h3>
        
        <div className="form-grid">
          <div className="form-group">
            <label>Název cviku</label>
            <input
              type="text"
              placeholder="Např. Bicepsový zdvih"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-row-inner">
            <div className="form-group">
              <label>Série</label>
              <input
                type="number"
                min="1"
                max="10"
                value={targetSets}
                onChange={(e) => setTargetSets(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Opakování</label>
              <input
                type="text"
                placeholder="Např. 10-12 nebo Max"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn-add-submit">
          Uložit cvik do tréninku
        </button>
      </form>
    </div>
  );
}
