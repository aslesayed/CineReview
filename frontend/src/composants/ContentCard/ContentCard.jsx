// ContentCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./contentcard.css";

const ContentCard = ({ contents = [] }) => {
  const handleAddToFavorites = (contentId) => {
    console.log(`Adding content ${contentId} to favorites`);
    // Logic to add to favorites
  };

  return (
    <div className="content-list">
      {contents.map((content) => {
        console.log(content.content_id); // Log the content_id to ensure it is defined
        return (
          <Link
            to={`/contents/${content.content_id}`} // Use content.content_id to navigate to the detail page
            key={content.content_id}
            className="content-card-link"
          >
            <div className="content-card">
              <img
                src={content.thumbnail}
                alt="Content Poster"
                className="content-image"
              />
              <div className="content-details">
                <div className="genre-rating-container">
                  <div className="genre">{content.genre}</div>
                  <div className="rating">
                    {content.rating} <span className="star-symbol">★</span>{" "}
                  </div>
                </div>
                <button
                  className="add-to-favorites"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToFavorites(content.content_id);
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ContentCard;