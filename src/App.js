import React, { useState } from "react";
import "./styles.css";
import ItemList from "./components/ItemList";
import PostItem from "./components/PostItem";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  const [page, setPage] = useState("login");
  const [items, setItems] = useState([
    { id: 1, title: "Lost Wallet", status: "Lost", date: "2025-10-25" },
    { id: 2, title: "Found USB Drive", status: "Found", date: "2025-10-27" },
  ]);

  // Add new item to list
  function addItem(newItem) {
    setItems((prev) => [...prev, { id: prev.length + 1, ...newItem }]);
  }

  // Hide header on login/register
  const showHeader = page !== "login" && page !== "register";

  return (
    <div>
     {showHeader && (
  <Header onHome={() => setPage("list")} onLogout={() => setPage("login")} />
     )}


      {page === "login" && (
        <Login
          onLogin={() => setPage("list")}
          onRegister={() => setPage("register")}
        />
      )}

      {page === "register" && (
        <Register onRegistered={() => setPage("login")} />
      )}

      {page === "list" && (
        <ItemList
          items={items}
          onAdd={() => setPage("post")}
          onLogout={() => setPage("login")}
        />
      )}

      {page === "post" && (
        <PostItem onBack={() => setPage("list")} onPost={addItem} />
      )}
    </div>
  );
}
