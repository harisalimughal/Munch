import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RatingComponent from '../../components/RatingComponent/RatingComponent';
import CategoryTag from '../../components/CategoryTag/CategoryTag';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import ReviewList from '../../components/ReviewList/ReviewList';
import styles from './RecipeDetail.module.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock API call to fetch recipe details
    const fetchRecipe = async () => {
      try {
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock recipe data
        const mockRecipe = {
          id: id,
          title: 'Delicious Pasta',
          description: 'A quick and easy pasta dish thats perfect for weeknight dinners.',
          ingredients: ['200g pasta', '100g cheese', '50g butter', 'Salt and pepper to taste'],
          instructions: 'Cook pasta according to package instructions. In a separate pan, melt butter and add cheese. Drain pasta and mix with the cheese sauce. Season with salt and pepper to taste.',
          cookingTime: 20,
          servings: 2,
          difficulty: 'easy',
          categories: ['Italian', 'Quick Meals'],
          tags: ['pasta', 'cheese', 'easy'],
          images: ['/placeholder.svg?height=400&width=600'],
          rating: 4.5,
        };

        setRecipe(mockRecipe);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch recipe');
        setLoading(false);
      }
    };

    fetchRecipe();
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
      <img src={recipe.images[0]} alt={recipe.title} className={styles.recipeImage} />
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

