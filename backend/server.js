const express = require("express");
const path = require("path");
const recipes = require("./data/recipes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const cors = require("cors");

// Initialize app
const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());

// API routes
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.get("/api/recipes/:id", (req, res) => {
  const recipe = recipes.find((n) => n.id === req.params.id);
  res.json(recipe);
});

// ====== Serve React frontend ======
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.resolve(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
