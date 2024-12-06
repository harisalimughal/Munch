import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../../components/RecipeForm/RecipeForm';
import styles from './Recipe.module.css';

const AddRecipe = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = (recipeData) => {
    // Mock API call to add a recipe
    console.log('Adding recipe:', recipeData);
    // Simulate a successful addition
    setTimeout(() => {
      navigate('/recipes');
    }, 1000);
  };

  return (
    <div className={styles.addRecipeContainer}>
      {error && <p className={styles.error}>{error}</p>}
      <RecipeForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddRecipe;

