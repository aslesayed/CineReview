

import { useEffect, useState } from "react";
import useUser from "../../contexts/UserContext"; // Adjust the import based on your project structure

import "./reviewsection.css";

const ReviewSection = ({ contentId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const { user } = useUser(); // Get user data from UserContext

  // Debugging: Check if contentId is being received
  useEffect(() => {
    console.log("Received contentId:", contentId);
  }, [contentId]);

  useEffect(() => {
    if (!contentId) {
      console.error("No contentId provided");
      return;
    }

    // Fetch reviews for the given contentId when the component mounts
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/content/${contentId}`);
        
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        } else {
          console.error("Failed to fetch reviews", response.status);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [contentId]);

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
            user_id: user.user_id, // Use user_id from UserContext
          }),
        }
      );

      if (response.status === 201) {
        const data = await response.json();
        setReviews([...reviews, data]); // Add the new review to the state
        setNewReview(""); // Clear the input field
      } else {
        console.error("Failed to add review", response.status);
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
          <div className="review-avatar"> {/* Update to show user's image if available */}</div>
          <div className="review-content">
            <div className="review-header">
              {/* <span className="review-name">User {review.user_id}</span> */}

              <span className="review-name">{`${review.firstname} ${review.lastname}`}</span>
              <span className="review-time">{new Date(review.review_date).toLocaleString()}</span>
            </div>
            <div className="review-text">{review.review}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;

