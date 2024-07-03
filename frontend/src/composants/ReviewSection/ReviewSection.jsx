import { useState, useEffect } from "react";

import "./reviewsection.css";

const ReviewSection = ({ contentId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  // Function to handle adding a new review
  const handleAddReview = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            review: newReview,
            content_id: contentId,
            user_id: user.user_id, 
          }),
        }
      );

      if (response.status === 201) {
        const data = await response.json();
        setReviews([...reviews, data]); // Add the new review to the state
        setNewReview(""); // Clear the input field
      } else {
        console.error("Failed to add review");
      }
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="review-section">
      <h1 className="review-section-header">Reviews</h1>
      <div className="add-review">
        <div className="review-avatar"></div>
        <input
          className="add-review-input"
          type="text"
          placeholder="Add a review"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
      </div>
      <button className="add-review-button" onClick={handleAddReview}>
        Post
      </button>
      {reviews.map((review) => (
        <div key={review.review_id} className="review">
          <div className="review-avatar"> {review.userimage}</div>
          <div className="review-content">
            <div className="review-header">
              <span className="review-name">{review.userfirstname}</span>
              <span className="review-time">{review.review_date}</span>
            </div>
            <div className="review-text">{review.review}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;
