const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Recipe = require("../models/Recipe");
const recipes = require("./recipes");

dotenv.config();
const connectDB = require("../config/db");

// Seed database
const seedData = async () => {
  try {
    await connectDB();
    await Recipe.deleteMany(); // Clear existing data
    await Recipe.insertMany(recipes); // Insert new data
    console.log("Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
