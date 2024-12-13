import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaCalendarAlt,
  FaShoppingCart,
  FaDownload,
  FaPlusCircle,
  FaClipboardList,
} from "react-icons/fa";
import styles from "./MealPlanner.module.css";

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

  const [recipes, setRecipes] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;

      try {
        const { data } = await axios.get("http://localhost:5000/api/recipes/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRecipes(data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("userInfo");
          alert("Session expired. Please log in again.");
        }
        throw error;
      }
    };

    fetchRecipes();
  }, []);

  const handleAddToMealPlan = (day, recipeId) => {
    setMealPlan((prevPlan) => ({
      ...prevPlan,
      [day]: recipeId,
    }));
    setSelectedDay(null);
  };

  const generateShoppingList = async () => {
    try {
      const ingredients = [];

      for (const day in mealPlan) {
        if (mealPlan[day]) {
          const { data: recipe } = await axios.get(
            `/api/recipes/${mealPlan[day]}`
          );
          ingredients.push(...recipe.ingredients);
        }
      }

      setShoppingList([...new Set(ingredients)]);
    } catch (error) {
      console.error("Error generating shopping list:", error);
    }
  };

  const downloadShoppingList = () => {
    const element = document.createElement("a");
    const file = new Blob([shoppingList.join("\n")], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "shopping_list.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className={styles.mealPlannerContainer}>
      <div className={styles.header}>
        <h1>
          <FaCalendarAlt className={styles.headerIcon} />
          Meal Planner
        </h1>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.recipesSection}>
          <div className={styles.sectionHeader}>
            <FaClipboardList className={styles.sectionIcon} />
            <h2>Available Recipes</h2>
          </div>
          <div className={styles.recipeGrid}>
            {recipes.map((recipe) => (
              <div key={recipe._id} className={styles.recipeCard}>
                <div className={styles.recipeDetails}>
                  <h3>{recipe.title}</h3>
                  <button
                    onClick={() => setSelectedDay(recipe._id)}
                    className={styles.addToMealPlanButton}
                  >
                    <FaPlusCircle /> Add to Meal Plan
                  </button>
                </div>
                {selectedDay === recipe._id && (
                  <div className={styles.daySelector}>
                    {Object.keys(mealPlan).map((day) => (
                      <button
                        key={day}
                        onClick={() => handleAddToMealPlan(day, recipe._id)}
                        className={styles.dayButton}
                      >
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.mealPlanSection}>
          <div className={styles.sectionHeader}>
            <FaCalendarAlt className={styles.sectionIcon} />
            <h2>Weekly Meal Plan</h2>
          </div>
          <div className={styles.weekGrid}>
            {Object.entries(mealPlan).map(([day, recipeId]) => {
              const recipe = recipes.find((r) => r._id === recipeId);
              return (
                <div key={day} className={styles.dayCard}>
                  <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
                  {recipe ? (
                    <div className={styles.selectedRecipe}>
                      <p>{recipe.title}</p>
                      <Link
                        to={`/recipes/${recipeId}`}
                        className={styles.viewRecipeLink}
                      >
                        View Details
                      </Link>
                    </div>
                  ) : (
                    <p className={styles.noRecipeText}>No recipe selected</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.shoppingListSection}>
          <button
            onClick={generateShoppingList}
            className={styles.generateShoppingListButton}
          >
            <FaShoppingCart /> Generate Shopping List
          </button>

          {shoppingList.length > 0 && (
            <div className={styles.shoppingListCard}>
              <div className={styles.sectionHeader}>
                <FaShoppingCart className={styles.sectionIcon} />
                <h2>Shopping List</h2>
              </div>
              <ul className={styles.shoppingListItems}>
                {shoppingList.map((item, index) => (
                  <li key={index}>
                    <input type="checkbox" className={styles.checkboxItem} />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={downloadShoppingList}
                className={styles.downloadButton}
              >
                <FaDownload /> Download Shopping List
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;
