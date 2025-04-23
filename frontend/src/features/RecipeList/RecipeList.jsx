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
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;

  try {
    const { data } = await axios.get("/api/recipes/", {
      
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("userInfo"); // Clear invalid user info
      alert("Session expired. Please log in again.");
      window.location.href = "/login"; // Redirect to login page
    }
    throw error; // Re-throw for other cases
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
         recipe.difficulty.toLowerCase() ===
           filters.difficulty.toLowerCase()) &&
       (filters.category === "" ||
         recipe.categories.some(
           (category) =>
             category.toLowerCase() === filters.category.toLowerCase()
         ))
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

