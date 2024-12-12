import React, { useState, useEffect } from 'react';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import styles from './RecipeList.module.css';
import axios from "axios";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipes = async () => {
    try {
      const { data } = await axios.get("/api/recipes");
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
        setRecipes(fetchedRecipes); // Update the recipes state
        setFilteredRecipes(fetchedRecipes); // Set filtered recipes initially
        setLoading(false); // Stop loading
      } catch (err) {
        setError("Failed to fetch recipes"); // Handle error
        setLoading(false); // Stop loading even if there's an error
      }
    };

    getRecipes(); // Call async function inside useEffect
  }, []);

  const handleSearch = (query) => {
    const filtered = recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  const handleFilter = (filters) => {
    const filtered = recipes.filter((recipe) => {
      return (
        recipe.cookingTime <= filters.cookingTime[1] &&
        (filters.difficulty === "" ||
          recipe.difficulty === filters.difficulty) &&
        (filters.category === "" ||
          recipe.categories.includes(filters.category))
      );
    });
    setFilteredRecipes(filtered);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={`${styles.recipeList} container`}>
      <h1 className={styles.text}>Recipes</h1>
      <div className={styles.searchBarContainer}>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className={styles.layoutContainer}>
        {/* Filter Panel */}
        <div className={`${styles.filterPanel} p-3 rounded`}>
          <FilterPanel onFilter={handleFilter} />
        </div>

        {/* Recipe Cards Grid */}
        <div className={styles.recipeGrid}>
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeList;

