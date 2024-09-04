import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUser from "../../contexts/UserContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./reviewsection.css";

const ReviewSection = ({ contentId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const { user } = useUser();
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!contentId) {
      console.error("No contentId provided");
      return;
    }

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/reviews/content/${contentId}`
        );

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
      navigate("/connection"); 
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

      if (response.status === 201) {
        const data = await response.json();
        setReviews((prevReviews) => [data, ...prevReviews]);
        setNewReview("");
      } else {
        console.error("Failed to add review", response.status);
      }
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.status === 204) {
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review.review_id !== reviewId)
        );
      } else {
        console.error("Failed to delete review", response.status);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleCancelReview = () => {
    setNewReview("");
  };

  return (
    <div className="review-section">
      <h1 className="review-section-header">Reviews</h1>
      <div className="add-review">
        <input
          className="add-review-input"
          type="text"
          placeholder="Add a review"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
      </div>
      <div className="review-buttons">
        <button className="cancel-review-button" onClick={handleCancelReview}>
          Cancel
        </button>
        <button className="add-review-button" onClick={handleAddReview}>
          Add review
        </button>
      </div>
      {reviews.map((review) => (
        <div key={review.review_id} className="review">
          <div className="review-avatar">
            <img
              src={
                review.thumbnail
                  ? `${import.meta.env.VITE_BACKEND_URL}${review.thumbnail}`
                  : `${
                      import.meta.env.VITE_BACKEND_URL
                    }/upload/defaultpicture.jpg`
              }
              alt="User Avatar"
            />
          </div>
          <div className="review-content">
            <div className="review-header">
             
              <span className="review-name">{`${review.firstname} `}</span>
              <span className="review-time">
                {review.review_date
                  ? new Date(review.review_date).toLocaleDateString()
                  : "Invalid Date"}
              </span>
              {user && user.user_id === review.user_id && (
                <button
                  onClick={() => handleDeleteReview(review.review_id)}
                  className="delete-review-button"
                >
                  <RiDeleteBin6Line className="delete-icon" />
                </button>
              )}
            </div>
            <div className="review-text">{review.review}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;
