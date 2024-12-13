import React, { useState } from "react";
import axios from "axios";
import RatingComponent from "../RatingComponent/RatingComponent";
import styles from "./ReviewForm.module.css";

const ReviewForm = ({ recipeId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;

      const { data } = await axios.post(
        `/api/recipes/${recipeId}/reviews`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      setRating(0);
      setComment("");
      onReviewAdded(data.reviews); // Pass updated reviews to parent component
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.reviewForm}>
      {error && <div className={styles.error}>{error}</div>}
      {success && (
        <div className={styles.success}>Review added successfully!</div>
      )}
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
      <button type="submit" className={styles.submitButton}>
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
