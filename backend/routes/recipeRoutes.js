const express = require("express");
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  addReview,
} = require("../controllers/recipeController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Define routes
router.route("/").get(protect, getAllRecipes); // get all recipes
router.route("/create").post(protect, createRecipe);// Create a new recipe
router.route("/:id").get(getRecipeById).put(protect, updateRecipe).delete(protect, deleteRecipe); // search by id, update, delete Recips
router.post("/:id/reviews", protect, addReview);



module.exports = router;
