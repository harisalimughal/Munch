import React from 'react';
import RatingComponent from '../RatingComponent/RatingComponent';
import styles from './ReviewList.module.css';

const ReviewList = ({ reviews }) => {
  return (
    <div className={styles.reviewList}>
      {reviews.map((review, index) => (
        <div key={index} className={styles.review}>
          <RatingComponent rating={review.rating} />
          <p className={styles.comment}>{review.comment}</p>
          <p className={styles.date}>{new Date(review.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;

