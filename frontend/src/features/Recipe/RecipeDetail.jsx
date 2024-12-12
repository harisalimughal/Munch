import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RatingComponent from '../../components/RatingComponent/RatingComponent';
import CategoryTag from '../../components/CategoryTag/CategoryTag';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import ReviewList from '../../components/ReviewList/ReviewList';
import styles from './RecipeDetail.module.css';
import axios from 'axios';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   const fetchRecipes = async () => {
     try {
       const { data } = await axios.get(`/api/recipes/${id}`);
       return data;
     } catch (error) {
       console.error("Error fetching recipes:", error.message);
       if (error.response) {
         console.error("Response Data:", error.response.data);
         console.error("Status Code:", error.response.status);
       }
     }
   };


  useEffect(() => {
   const getRecipes = async () => {
      try {
        const fetchedRecipes = await fetchRecipes(); // Await fetchRecipes
        setRecipe(fetchedRecipes); // Update the recipes state
        setLoading(false); // Stop loading
      } catch (err) {
        setError("Failed to fetch recipes"); // Handle error
        setLoading(false); // Stop loading even if there's an error
      }
    };
    getRecipes();
  }, [id]);

  const handleAddReview = (newReview) => {
    setReviews([...reviews, newReview]);
    // Here you would typically make an API call to save the review
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className={styles.recipeDetail}>
      <h1 className={styles.recipeTitle}>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className={styles.recipeImage} />
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
            <span key={index} className={styles.tag}>#{tag}</span>
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
      </div>
      <div className={styles.reviewSection}>
        <h2>Reviews</h2>
        <ReviewForm onSubmit={handleAddReview} />
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
};

export default RecipeDetail;

