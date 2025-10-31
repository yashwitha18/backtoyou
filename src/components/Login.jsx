import React, { useState } from "react";

export default function Login({ onLogin, onRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please enter both email and password!");
      return;
    }

    alert("Login Successful!");
    onLogin(); // go to ItemList
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account?{" "}
        <button type="button" onClick={onRegister}>
          Register
        </button>
      </p>
    </div>
  );
}
