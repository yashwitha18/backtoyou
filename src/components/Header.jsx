import React from "react";

export default function Header({ onHome, onLogout, isDarkMode, setIsDarkMode }) {
  return (
    <header className="header">
      <h1>🔍 back2you</h1>
      <div className="header-buttons">
        <button onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? "☀️" : "🌙"}
        </button>
        <button onClick={onHome}>🏠 Home</button>
        <button onClick={onLogout}>🚪 Logout</button>
      </div>
    </header>
  );
}
