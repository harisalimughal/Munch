import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './MealPlanner.module.css';

const MealPlanner = () => {
  const [mealPlan, setMealPlan] = useState({
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
    sunday: null,
  });

  const [shoppingList, setShoppingList] = useState([]);

  const handleAddToMealPlan = (day, recipeId) => {
    setMealPlan(prevPlan => ({
      ...prevPlan,
      [day]: recipeId,
    }));
    // Here you would typically make an API call to save the meal plan
  };

  const generateShoppingList = () => {
    // This is a mock function. In a real app, you would fetch the ingredients for each recipe in the meal plan
    const mockIngredients = [
      '200g pasta',
      '100g cheese',
      '500g chicken',
      'Vegetables of choice',
      'Olive oil',
      'Salt and pepper',
    ];
    setShoppingList(mockIngredients);
  };

  return (
    <div className={styles.mealPlanner}>
      <h1>Meal Planner</h1>
      <div className={styles.weekPlan}>
        {Object.entries(mealPlan).map(([day, recipeId]) => (
          <div key={day} className={styles.dayPlan}>
            <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
            {recipeId ? (
              <Link to={`/recipe/${recipeId}`}>View Recipe</Link>
            ) : (
              <button onClick={() => handleAddToMealPlan(day, '1')}>Add Recipe</button>
            )}
          </div>
        ))}
      </div>
      <button onClick={generateShoppingList} className={styles.generateButton}>
        Generate Shopping List
      </button>
      {shoppingList.length > 0 && (
        <div className={styles.shoppingList}>
          <h2>Shopping List</h2>
          <ul>
            {shoppingList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;

