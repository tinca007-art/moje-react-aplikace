import React from "react";
import { Link, useLocation } from "react-router-dom";

export function Navigation() {
  const aktualniAdresa = useLocation();

  return (
    <nav className="nav-bar">
      <Link 
        to="/" 
        className={`nav-link ${aktualniAdresa.pathname === "/" ? "active" : ""}`}
      >
         Trénink
      </Link>

      <Link 
        to="/statistiky" 
        className={`nav-link ${aktualniAdresa.pathname === "/statistiky" ? "active" : ""}`}
      >
         Statistiky pokroku
      </Link>
    </nav>
  );
}
