import React from "react";
import styles from "./ReviewList.module.css";

const ReviewList = ({ reviews=[] }) => {
  return (
    <div className={styles.reviewList}>
      <h2>Public Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className={styles.review}>
            <strong>{review.user.name}</strong>
            <p>Rating: {review.rating}</p>
            <p>{review.comment}</p>
            <p className={styles.date}>
              {new Date(review.date).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
