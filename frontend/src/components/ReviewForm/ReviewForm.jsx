import React, { useState } from 'react';
import RatingComponent from '../RatingComponent/RatingComponent';
import styles from './ReviewForm.module.css';

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, comment, date: new Date().toISOString() });
    setRating(0);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.reviewForm}>
      <div className={styles.ratingContainer}>
        <label>Your Rating:</label>
        <RatingComponent rating={rating} onRate={setRating} />
      </div>
      <div className={styles.commentContainer}>
        <label htmlFor="comment">Your Review:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      <button type="submit" className={styles.submitButton}>Submit Review</button>
    </form>
  );
};

export default ReviewForm;

