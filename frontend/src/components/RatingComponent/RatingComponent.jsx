import React, { useState } from 'react';
import styles from './RatingComponent.module.css';

const RatingComponent = ({ initialRating, onRate }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleRate = (value) => {
    setRating(value);
    if (onRate) {
      onRate(value);
    }
  };

  return (
    <div className={styles.ratingContainer}>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <span
            key={index}
            className={`${styles.star} ${ratingValue <= (hover || rating) ? styles.filled : ''}`}
            onClick={() => handleRate(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default RatingComponent;

