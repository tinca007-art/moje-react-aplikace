import React from "react";
import { Link, useLocation } from "react-router-dom";

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="nav-bar">
      <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
        🏋️‍♂️ Trénink
      </Link>
      <Link to="/statistiky" className={`nav-link ${location.pathname === "/statistiky" ? "active" : ""}`}>
        📊 Statistiky pokroku
      </Link>
    </nav>
  );
}


