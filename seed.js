// backend/database/seed.js
const mongoose = require("mongoose");
const connectDB = require("./connect");
const User = require("../models/User"); // example model

const seed = async () => {
  await connectDB();

  // Clear existing users
  await User.deleteMany({});

  // Add test users
  await User.create([
    { name: "Test User 1", email: "user1@example.com" },
    { name: "Test User 2", email: "user2@example.com" }
  ]);

  console.log("Database seeded successfully!");
  process.exit();
};

seed();
