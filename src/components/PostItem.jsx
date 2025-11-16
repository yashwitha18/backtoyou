import React, { useState } from "react";

export default function PostItem({ onPost, onBack }) {
  const [item, setItem] = useState({
    title: "",
    status: "Lost",
    date: "",
    category: "Other",
    location: "",
    description: "",
    image: null,
  });

  function handleChange(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  function handleImageChange(e) {
    setItem({ ...item, image: e.target.files[0] });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!item.title || !item.date) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", item.title);
    formData.append("status", item.status.toLowerCase()); // Convert to lowercase
    formData.append("date", item.date);
    formData.append("category", item.category);
    formData.append("location", item.location);
    formData.append("description", item.description);
    if (item.image) {
      formData.append("image", item.image);
    }

    fetch("http://localhost:5000/api/items", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((r) => {
        if (!r.ok) {
          return r.json().then((data) => {
            throw new Error(data.message || "Failed to post item");
          });
        }
        return r.json();
      })
      .then((data) => {
        console.log("Posted item:", data);
        onPost(data);
        alert("Item Posted Successfully!");
        onBack();
      })
      .catch((err) => {
        console.error("Error posting item:", err);
        alert("Error: " + err.message);
      });
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
          required
        />
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={item.description}
          onChange={handleChange}
          rows="3"
        />
        <select name="category" value={item.category} onChange={handleChange}>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
          <option value="Documents">Documents</option>
          <option value="Clothing">Clothing</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          name="location"
          placeholder="Location (optional)"
          value={item.location}
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
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button type="submit">Post Item</button>
      </form>

      <div style={{ marginTop: "10px" }}>
        <button onClick={onBack}>Go Back</button>
      </div>
    </div>
  );
}
