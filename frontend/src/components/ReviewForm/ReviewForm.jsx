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

    // Clear both success and error messages before submission
    setError(null);
    setSuccess(false);

    try {
      // Get token from local storage (ensure user is logged in)
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;

      if (!token) {
        // Handle the case where token is not found (not logged in)
        setError("You must be logged in to submit a review.");
        return;
      }

      // Send the review to the backend API
      const { data } = await axios.post(
        `/api/recipes/${recipeId}/reviews`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // After successful submission, show success message
      setSuccess(true);
      setRating(0);
      setComment(""); // Clear form fields
      onReviewAdded(data.reviews); // Pass updated reviews to parent component
    } catch (err) {
      // If error occurs, show the error message
      setError(
        err.response?.data?.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.reviewForm}>
      {/* Show error if any */}
      {error && <div className={styles.error}>{error}</div>}

      {/* Show success if review added */}
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
