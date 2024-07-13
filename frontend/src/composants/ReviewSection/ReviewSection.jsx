import { useEffect, useState } from "react";
import useUser from "../../contexts/UserContext";
import "./reviewsection.css";

const ReviewSection = ({ contentId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const { user } = useUser();

  useEffect(() => {
    if (!contentId) {
      console.error("No contentId provided");
      return;
    }

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

  const handleAddReview = async () => {
    if (!user) {
      console.error("User not logged in");
      return;
    }

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

      console.log("Response status:", response.status);

      if (response.status === 201) {
        const data = await response.json();
        console.log("New review data:", data);
        setReviews(prevReviews => [...prevReviews, data]);
        setNewReview("");
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
        {user && (
          <div className="review-avatar">
            <img src={user.thumbnail ? `${import.meta.env.VITE_BACKEND_URL}${user.thumbnail}` : `${import.meta.env.VITE_BACKEND_URL}/upload/defaultpicture.jpg`} alt="User Avatar" />
          </div>
        )}
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

          <div className="review-avatar">
            <img src={review.thumbnail ? `${import.meta.env.VITE_BACKEND_URL}${review.thumbnail}` : `${import.meta.env.VITE_BACKEND_URL}/upload/defaultpicture.jpg`} alt="User Avatar" />
          </div>
          <div className="review-content">
            <div className="review-header">
              <span className="review-name">{`${review.firstname || ''} ${review.lastname || ''}`}</span>
              <span className="review-time">{review.review_date ? new Date(review.review_date).toLocaleDateString() : 'Invalid Date'}</span>

            </div>
            <div className="review-text">{review.review}</div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default ReviewSection;

