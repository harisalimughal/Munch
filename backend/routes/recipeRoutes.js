const express = require("express");
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Define routes
router.route("/").get(protect, getAllRecipes);
router.route("/create").post(createRecipe);
router.route("/").get(getAllRecipes).put(updateRecipe).delete(deleteRecipe);

// router.get("/:id", getRecipeById); // Fetch a recipe by ID
// router.post("/", createRecipe); // Create a new recipe
// router.put("/:id", updateRecipe); // Update a recipe by ID
// router.delete("/:id", deleteRecipe); // Delete a recipe by ID

module.exports = router;
