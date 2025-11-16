import React, { useState } from "react";
import "./styles.css";
import ItemList from "./components/ItemList";
import PostItem from "./components/PostItem";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminLogin from "./components/AdminLogin";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [page, setPage] = useState("login");
  const [items, setItems] = useState([]);

  // Fetch items from backend
  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/items");
      const data = await response.json();
      console.log("Fetched items:", data);
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        console.error("Data is not an array:", data);
        setItems([]);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      setItems([]);
    }
  };

  // Load items when page changes to list
  React.useEffect(() => {
    if (page === "list") {
      fetchItems();
    }
  }, [page]);

  // Apply dark mode to body
  React.useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  // Add new item to list
  function addItem(newItem) {
    setItems((prev) => [...prev, newItem]);
    fetchItems(); // Refresh items from backend
  }

  // Handle item deletion
  function handleItemDeleted() {
    fetchItems(); // Refresh items from backend
  }

  // Hide header on login/register
  const showHeader = page !== "login" && page !== "register";

  return (
    <div className={isDarkMode ? "dark-mode" : ""}>
      {!showHeader && (
        <div className="toggle-container">
          <button
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>
      )}

      {showHeader && (
        <Header
          onHome={() => setPage("list")}
          onLogout={() => setPage("login")}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
      )}

      {page === "login" && (
        <Login
          onLogin={() => setPage("list")}
          onRegister={() => setPage("register")}
          onAdminLogin={() => setPage("admin-login")}
        />
      )}

      {page === "register" && (
        <Register onRegistered={() => setPage("login")} />
      )}

      {page === "admin-login" && (
        <AdminLogin
          onAdminLogin={() => setPage("admin")}
          onBackToLogin={() => setPage("login")}
        />
      )}

      {page === "admin" && (
        <ItemList
          items={items}
          onAdd={() => setPage("post")}
          onLogout={() => setPage("login")}
          onDelete={handleItemDeleted}
        />
      )}

      {page === "list" && (
        <ItemList
          items={items}
          onAdd={() => setPage("post")}
          onLogout={() => setPage("login")}
          onDelete={handleItemDeleted}
        />
      )}

      {page === "post" && (
        <PostItem onBack={() => setPage("list")} onPost={addItem} />
      )}
    </div>
  );
}
