import React, { useState } from 'react';
import styles from './FilterPanel.module.css';

const FilterPanel = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    cookingTime: [0, 120],
    difficulty: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.filterPanel}`}>
  <div className={`${styles.filterGroup}`}>
    <label htmlFor="cookingTime">Cooking Time (max minutes)</label>
    <input
      type="range"
      id="cookingTime"
      name="cookingTime"
      min="0"
      max="120"
      value={filters.cookingTime[1]}
      onChange={(e) =>
        setFilters((prevFilters) => ({
          ...prevFilters,
          cookingTime: [0, parseInt(e.target.value)],
        }))
      }
    />
    <span>{filters.cookingTime[1]} minutes</span>
  </div>
  <div className={`${styles.filterGroup}`}>
    <label htmlFor="difficulty">Difficulty</label>
    <select
      id="difficulty"
      name="difficulty"
      value={filters.difficulty}
      className="form-select"
      onChange={handleChange}
    >
      <option value="">All</option>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
  </div>
  <div className={`${styles.filterGroup}`}>
    <label htmlFor="category">Category</label>
    <input
      type="text"
      id="category"
      name="category"
      value={filters.category}
      className="form-control"
      onChange={handleChange}
      placeholder="Enter category"
    />
  </div>
  <button type="submit" className={styles.filterButton}>
    Apply Filters
  </button>
</form>

  );
};

export default FilterPanel;

