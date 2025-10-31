import React from "react";

export default function ItemList({ items, onAdd, onLogout }) {
  return (
    <div className="item-list">
      <div className="item-list-header">
        <h2>Lost & Found Items</h2>
        <div>
          <button onClick={onAdd}>➕ Post Item</button>
          <button onClick={onLogout}>🚪 Go to Login</button>
        </div>
      </div>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong> — {item.status} ({item.date})
          </li>
        ))}
      </ul>
    </div>
  );
}
