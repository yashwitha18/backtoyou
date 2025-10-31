import React from "react";

export default function Header({ onHome, onLogout }) {
  return (
    <header className="header">
      <h1>Lost & Found</h1>
      <div className="header-buttons">
        <button onClick={onHome}>🏠 Home</button>
        <button onClick={onLogout}>🚪 Logout</button>
      </div>
    </header>
  );
}
