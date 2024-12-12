const mongoose = require("mongoose");

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
  },
  {
    timestamps: true,
  }
);

// Create the Recipe model
const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
