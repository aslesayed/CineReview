import { useState } from "react";
import "./reviewsection.css";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  const handleAddReview = () => {
    if (newReview.trim()) {
      const newReviewObj = {
        id: reviews.length + 1,
        name: "User",
        time: "Just now",
        text: newReview,
      };
      setReviews([...reviews, newReviewObj]);
      setNewReview("");
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
        <div key={review.id} className="review">
          <div className="review-avatar"></div>
          <div className="review-content">
            <div className="review-header">
              <span className="review-name">{review.name}</span>
              <span className="review-time">{review.time}</span>
            </div>
            <div className="review-text">{review.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;
