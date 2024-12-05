import React from 'react';
import styles from './CategoryTag.module.css';

const CategoryTag = ({ category }) => {
  return <span className={styles.categoryTag}>{category}</span>;
};

export default CategoryTag;

