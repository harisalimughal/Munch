import React, { useState, useEffect } from 'react';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import styles from './RecipeList.module.css';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock API call to fetch recipes
    const fetchRecipes = async () => {
      try {
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock recipe data
        const mockRecipes = [
          {
            id: '1',
            title: 'Spaghetti Carbonara',
            description: 'Classic Italian pasta dish',
            cookingTime: 30,
            difficulty: 'medium',
            categories: ['Italian', 'Pasta'],
            rating: 4.5,
            image: 'https://t3.ftcdn.net/jpg/09/08/95/82/360_F_908958253_FzbMvigDE8GuL3AMe96NSabzK1lSIoAL.jpg',
          },
          {
            id: '2',
            title: 'Chicken Stir Fry',
            description: 'Quick and healthy Asian-inspired dish',
            cookingTime: 20,
            difficulty: 'easy',
            categories: ['Asian', 'Quick Meals'],
            rating: 4.2,
            image: 'https://t3.ftcdn.net/jpg/09/08/95/82/360_F_908958253_FzbMvigDE8GuL3AMe96NSabzK1lSIoAL.jpg',
          },

          {
            id: '3',
            title: 'Spaghetti Carbonara',
            description: 'Classic Italian pasta dish',
            cookingTime: 30,
            difficulty: 'medium',
            categories: ['Italian', 'Pasta'],
            rating: 4.5,
            image: 'https://t3.ftcdn.net/jpg/09/08/95/82/360_F_908958253_FzbMvigDE8GuL3AMe96NSabzK1lSIoAL.jpg',
          },
          {
            id: '4',
            title: 'Chicken Stir Fry',
            description: 'Quick and healthy Asian-inspired dish',
            cookingTime: 20,
            difficulty: 'easy',
            categories: ['Asian', 'Quick Meals'],
            rating: 4.2,
            image: 'https://t3.ftcdn.net/jpg/09/08/95/82/360_F_908958253_FzbMvigDE8GuL3AMe96NSabzK1lSIoAL.jpg',
          },

          {
            id: '5',
            title: 'Spaghetti Carbonara',
            description: 'Classic Italian pasta dish',
            cookingTime: 30,
            difficulty: 'medium',
            categories: ['Italian', 'Pasta'],
            rating: 4.5,
            image: 'https://t3.ftcdn.net/jpg/09/08/95/82/360_F_908958253_FzbMvigDE8GuL3AMe96NSabzK1lSIoAL.jpg',
          },
          {
            id: '6',
            title: 'Chicken Stir Fry',
            description: 'Quick and healthy Asian-inspired dish',
            cookingTime: 20,
            difficulty: 'easy',
            categories: ['Asian', 'Quick Meals'],
            rating: 4.2,
            image: 'https://t3.ftcdn.net/jpg/09/08/95/82/360_F_908958253_FzbMvigDE8GuL3AMe96NSabzK1lSIoAL.jpg',
          },
          // Add more mock recipes here
        ];

        setRecipes(mockRecipes);
        setFilteredRecipes(mockRecipes);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch recipes');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearch = (query) => {
    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query.toLowerCase()) ||
      recipe.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  const handleFilter = (filters) => {
    const filtered = recipes.filter(recipe => {
      return (
        recipe.cookingTime <= filters.cookingTime[1] &&
        (filters.difficulty === '' || recipe.difficulty === filters.difficulty) &&
        (filters.category === '' || recipe.categories.includes(filters.category))
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

