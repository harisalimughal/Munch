import React from 'react';
import { Link } from 'react-router-dom';
import RatingComponent from '../RatingComponent/RatingComponent';
import CategoryTag from '../CategoryTag/CategoryTag';
import styles from './RecipeCard.module.css';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="col-6 col-md-4 col-lg-4 mb-4">
      <div className={`card ${styles.recipeCard}`}>
        <img 
          src={recipe.image} 
          className={`card-img-top ${styles.recipeImage}`} 
          alt={recipe.title} 
        />
        <div className={`card-body ${styles.cardBody}`}>
          <h5 className={`card-title ${styles.cardTitle}`}>{recipe.title}</h5>
          <RatingComponent rating={recipe.rating} />
          <p className={`card-text ${styles.cardText}`}>
            Cooking Time: {recipe.cookingTime} minutes
          </p>
          <div className={styles.categoryContainer}>
            {recipe.categories.map((category, index) => (
              <CategoryTag key={index} category={category} />
            ))}
          </div>
          <Link to={`/recipes/${recipe.id}`} className={styles.button}>
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
