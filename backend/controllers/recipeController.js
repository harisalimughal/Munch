const Recipe = require("../models/recipeModel");

// @desc    Fetch all recipes
// @route   GET /api/recipes
// @access  Public
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find(); // Fetch all recipes
    res.status(200).json(recipes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch recipes", error: error.message });
  }
};

// @desc    Fetch a single recipe by ID
// @route   GET /api/recipes/:id
// @access  Public
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id); // Fetch recipe by ID
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch recipe", error: error.message });
  }
};

// @desc    Create a new recipe
// @route   POST /api/recipes
// @access  Public (or Private if authentication is implemented)
const createRecipe = async (req, res) => {
  const {
    title,
    description,
    ingredients,
    instructions,
    cookingTime,
    servings,
    difficulty,
    categories,
    tags,
    image,
    rating,
    nutrition, // Add nutrition to destructured request body
  } = req.body;

  // Validate required fields
  if (
    !title ||
    !description ||
    !ingredients ||
    !instructions ||
    !cookingTime ||
    !servings ||
    !difficulty ||
    !image
  ) {
    return res
      .status(400)
      .json({ message: "Please fill in all required fields" });
  }

  try {
    const newRecipe = new Recipe({
      user: req.user._id,
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
      servings,
      difficulty,
      categories,
      tags,
      image,
      rating,
      nutrition: {
        calories: nutrition?.calories || null,
        protein: nutrition?.protein || null,
        fat: nutrition?.fat || null,
        carbs: nutrition?.carbs || null,
        fiber: nutrition?.fiber || null,
        sugar: nutrition?.sugar || null,
      }, // Include optional nutrition details
    });

    const savedRecipe = await newRecipe.save(); // Save to DB
    res.status(201).json(savedRecipe);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create recipe", error: error.message });
  }
};


// @desc    Update a recipe by ID
// @route   PUT /api/recipes/:id
// @access  Public (or Private if authentication is implemented)
const updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return the updated document and validate data
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(updatedRecipe);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update recipe", error: error.message });
  }
};


// @desc    Delete a recipe by ID
// @route   DELETE /api/recipes/:id
// @access  Public (or Private if authentication is implemented)
const deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete recipe", error: error.message });
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
