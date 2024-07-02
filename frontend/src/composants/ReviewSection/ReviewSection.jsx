// import { useState } from "react";
// import "./reviewsection.css";

// const ReviewSection = ({ contentId }) => {
//   const [reviews, setReviews] = useState([]);

  
//   useEffect(() => {
// const fetchReviews = async () => {
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${contentId}`
//         );
//         const data = await response.json();
//         setReviews(data);
//       } catch (error) {
//         console.error("Error fetching reviews", error);
//       }
//     };

//     fetchReviews();
//   }, [contentId]);

//   return (
//     <div className="review-section">
//       <h1 className="review-section-header">Reviews</h1>
//       <div className="add-review">
//         <div className="review-avatar"></div>
//         <input
//           className="add-review-input"
//           type="text"
//           placeholder="Add a review"
//           value={newReview}
//           onChange={(e) => setNewReview(e.target.value)}
//         />
//       </div>
//       <button className="add-review-button" onClick={handleAddReview}>
//         Post
//       </button>
//       {reviews.map((review) => (
//         <div key={review.review_id} className="review">
//           <div className="review-avatar"> {review.userimage}</div>
//           <div className="review-content">
//             <div className="review-header">
//               <span className="review-name">{review.userfirstname}</span>
//               <span className="review-time">{review.review_date}</span>
//             </div>
//             <div className="review-text">{review.review}</div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ReviewSection;


import { useState, useEffect } from "react";
import useUser from "../../contexts/UserContext"; // Adjust the import path as necessary
import "./reviewsection.css";

const ReviewSection = ({ contentId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${contentId}`
        );
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    };

    fetchReviews();
  }, [contentId]);

  return (
    <div className="review-section">
      <h1 className="review-section-header">Reviews</h1>
      {reviews.map((review) => (
        <div key={review.review_id} className="review">
          <div className="review-avatar">
            {review.user && review.user.image && (
              <img src={review.user.image} alt="user-avatar" className="user-avatar" />
            )}
          </div>
          <div className="review-content">
            <div className="review-header">
              <span className="review-name">{review.user && review.user.firstname}</span>
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

