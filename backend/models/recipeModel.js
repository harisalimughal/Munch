const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to user
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Define the Recipe schema
const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Recipe title
    description: { type: String, required: true }, // Recipe description
    ingredients: { type: [String], required: true }, // List of ingredients
    instructions: { type: String, required: true }, // Cooking instructions
    cookingTime: { type: Number, required: true }, // Time in minutes
    servings: { type: Number, required: true }, // Number of servings
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"], // Restrict difficulty to specific values
      required: true,
    },
    categories: { type: [String], default: [] }, // Recipe categories (e.g., Italian, Quick Meals)
    tags: { type: [String], default: [] }, // Tags for searchability
    image: {
      type: String,
      required: true,
      default:
        "https://th.bing.com/th/id/OIP.-8CDy6EhAnKWNlsI0TnfGgHaLH?rs=1&pid=ImgDetMain",
    }, // URL for recipe image
    rating: { type: Number, min: 0, max: 5, default: 0 }, // Rating between 0 and 5
    user: {
      type: mongoose.Schema.Types.ObjectID,
      required: true,
      ref: "User",
    },
    nutrition: {
      calories: { type: Number, default: null }, // Optional: Calories in kcal
      protein: { type: Number, default: null }, // Optional: Protein in grams
      fat: { type: Number, default: null }, // Optional: Fat in grams
      carbs: { type: Number, default: null }, // Optional: Carbs in grams
      fiber: { type: Number, default: null }, // Optional: Fiber in grams
      sugar: { type: Number, default: null }, // Optional: Sugar in grams
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

// Create the Recipe model
const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
