import React, { useState } from "react";

export default function PostItem({ onPost, onBack }) {
  const [item, setItem] = useState({
    title: "",
    status: "Lost",
    date: "",
  });

  function handleChange(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!item.title || !item.date) {
      alert("Please fill all fields");
      return;
    }
    onPost(item);
    alert("Item Posted Successfully!");
    onBack(); // Go back to home/list
  }

  return (
    <div className="form-container">
      <h2>Post an Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Item title"
          value={item.title}
          onChange={handleChange}
        />
        <select name="status" value={item.status} onChange={handleChange}>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>
        <input
          type="date"
          name="date"
          value={item.date}
          onChange={handleChange}
        />
        <button type="submit">Post Item</button>
      </form>

      <div style={{ marginTop: "10px" }}>
        <button onClick={onBack}>Go Back</button>
      </div>
    </div>
  );
}
