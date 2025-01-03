const express = require("express");
const recipes = require("./data/recipes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const cors = require("cors");

// Initialize Express application
const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());

// API route handlers
app.use("/api/users", userRoutes);  // Handle requests to /api/users with userRoutes
app.use("/api/recipes", recipeRoutes); // Handle requests to /api/recipes with recipeRoutes (Find all recipes)
app.get("/api/recipes/:id", (req, res) => {              // Find recipe by id
  const recipe = recipes.find((n) => n.id === req.params.id);
  res.json(recipe);
});
app.use(notFound); // Middleware to handle 404 not found errors
app.use(errorHandler); // Middleware to handle other errors

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
