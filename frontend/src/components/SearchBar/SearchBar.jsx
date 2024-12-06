import React, { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.searchBar} d-flex`}>
  <input
    type="text"
    className={`${styles.searchInput} form-control`}
    placeholder="Search recipes..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />
  <button type="submit" className={styles.searchButton}>
    Search
  </button>
</form>

  );
};

export default SearchBar;

