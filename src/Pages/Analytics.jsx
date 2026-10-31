import React from "react";

export function Analytics({ exercises }) {
  const totalSets = exercises.reduce((sum, ex) => sum + ex.targetSets, 0);
  const completedSets = exercises.reduce((sum, ex) => sum + ex.completedSets, 0);
  const percentage = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

  return (
    <div className="analytics-container">
      <h2>📊 Analýza Dnešního Výkonu</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Dokončené série</h4>
          <p className="stat-value">{completedSets} z {totalSets}</p>
        </div>
        <div className="stat-card">
          <h4>Celková splněnost</h4>
          <p className="stat-value">{percentage}%</p>
        </div>
      </div>

      <div className="progress-bar-container" style={{ background: '#eee', borderRadius: '4px', height: '10px', margin: '15px 0' }}>
        <div className="progress-bar-fill" style={{ width: `${percentage}%`, background: '#4caf50', height: '10px', borderRadius: '4px', transition: 'width 0.3s' }}></div>
      </div>

      <div className="analytics-summary">
        <h3>Přehled cviků:</h3>
        {exercises.map(ex => (
          <div key={ex.id} className="analytic-row" style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0' }}>
            <span>{ex.name}</span>
            <span style={{ color: ex.completedSets === ex.targetSets ? "green" : "inherit" }}>
              {ex.completedSets === ex.targetSets ? "✅ Hotovo" : `${ex.completedSets}/${ex.targetSets} sérií`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
