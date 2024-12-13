import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RatingComponent from "../../components/RatingComponent/RatingComponent";
import CategoryTag from "../../components/CategoryTag/CategoryTag";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import ReviewList from "../../components/ReviewList/ReviewList";
import styles from "./RecipeDetail.module.css";
import axios from "axios";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipe = async () => {
    try {
      const { data } = await axios.get(`/api/recipes/${id}`);
      console.log(data);
      return data;
      
    } catch (error) {
      console.error("Error fetching recipe:", error.message);
      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Status Code:", error.response.status);
      }
      throw error;
    }
  };

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const fetchedRecipe = await fetchRecipe();

        // Split ingredients into an array if it's a single string
        if (
          fetchedRecipe.ingredients &&
          typeof fetchedRecipe.ingredients === "string"
        ) {
          fetchedRecipe.ingredients = fetchedRecipe.ingredients.split(",");
        }

        setRecipe(fetchedRecipe);
        console.log("Fetched Recipe:", fetchedRecipe);

        setLoading(false);
      } catch (err) {
        console.error("Error in RecipeDetail:", err);
        setError("Failed to fetch recipe");
        setLoading(false);
      }
    };

    getRecipe();
  }, [id]);

  const handleAddReview = (updatedReviews) => {
    setRecipe((prevRecipe) => ({ ...prevRecipe, reviews: updatedReviews }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className={styles.recipeDetail}>
      <h1 className={styles.recipeTitle}>{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className={styles.recipeImage}
      />
      <div className={styles.recipeInfo}>
        <p className={styles.recipeDescription}>{recipe.description}</p>
        <div className={styles.recipeMetadata}>
          <div className={styles.metadataItem}>
            <RatingComponent rating={recipe.rating} />
          </div>
          <div className={styles.metadataItem}>
            <span>Cooking Time: {recipe.cookingTime} minutes</span>
          </div>
          <div className={styles.metadataItem}>
            <span>Servings: {recipe.servings}</span>
          </div>
          <div className={styles.metadataItem}>
            <span>Difficulty: {recipe.difficulty}</span>
          </div>
        </div>
        <div className={styles.categories}>
          {recipe.categories.map((category, index) => (
            <CategoryTag key={index} category={category} />
          ))}
        </div>
        <div className={styles.tags}>
          {recipe.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.recipeContent}>
        <h2>Ingredients</h2>
        <ul className={styles.ingredientsList}>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h2>Instructions</h2>
        <p className={styles.instructions}>{recipe.instructions}</p>
        {recipe.nutrition && Object.keys(recipe.nutrition).length > 0 && (
          <div className={styles.nutritionSection}>
            <h2>Nutrition (mg)</h2>
            <ul className={styles.nutritionList}>
              {Object.entries(recipe.nutrition).map(
                ([key, value]) =>
                  value !== null && (
                    <li key={key}>
                      <strong>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </strong>{" "}
                      {value}
                    </li>
                  )
              )}
            </ul>
          </div>
        )}
      </div>
      <div className={styles.reviewSection}>
        <h2>Reviews</h2>
        <ReviewForm recipeId={recipe._id} onSubmit={handleAddReview} />
        <ReviewList reviews={recipe.reviews} />
      </div>
    </div>
  );
};

export default RecipeDetail;
