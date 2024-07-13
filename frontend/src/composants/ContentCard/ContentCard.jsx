import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../../contexts/UserContext";
import "./contentcard.css";

const ContentCard = ({ contents = [], setDeleted }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [favoriteStatus, setFavoriteStatus] = useState({});

  const toggleFavorite = async (contentId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/watchlisted`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content_id: contentId,
            user_id: user.user_id,
          }),
          credentials: "include",
        }
      );

      if (response.status === 201) {
        console.log("Successfully added to favorites");
        setFavoriteStatus((prevStatus) => ({
          ...prevStatus,
          [contentId]: true,
        }));
        setDeleted((prev) => !prev); // Trigger re-fetch of favorites
      } else {
        console.error("Failed to add to favorites", response.status);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const deleteFavorite = async (contentId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/watchlisted`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content_id: contentId,
            user_id: user.user_id,
          }),
          credentials: "include",
        }
      );

      if (response.status === 200) {
        console.log("Successfully deleted from favorites");
        setFavoriteStatus((prevStatus) => ({
          ...prevStatus,
          [contentId]: false,
        }));
        setDeleted((prev) => !prev); // Trigger re-fetch of favorites
      } else {
        console.error("Failed to delete from favorites", response.status);
      }
    } catch (error) {
      console.error("Error deleting from favorites:", error);
    }
  };

  const handleAddToFavorites = (contentId) => {
    if (user) {
      toggleFavorite(contentId);
    } else {
      navigate("/connection");
    }
  };

  const handleDeleteFromFavorites = (contentId) => {
    if (user) {
      deleteFavorite(contentId);
    } else {
      navigate("/connection");
    }
  };

  return (
    <div className="content-list">
      {contents.map((content) => {
        const isFavorite = favoriteStatus[content.content_id];
        return (
          <div key={content.content_id}>
            <div className="content-card">
              <Link
                to={`/contents/${content.content_id}`}
                className="content-card-link"
              >
                <img
                  src={content.thumbnail}
                  alt="Content Poster"
                  className="content-image"
                />
              </Link>
              <div className="content-details">
                <div className="genre-rating-container">
                  <div className="genre">{content.genre}</div>
                  <div className="rating">
                    {content.rating} <span className="star-symbol">★</span>{" "}
                  </div>
                </div>
                {isFavorite ? (
                  <>
                    <button
                      className="added-to-favorites"
                      onClick={() =>
                        handleDeleteFromFavorites(content.content_id)
                      }
                    >
                      ✗
                    </button>
                    <button className="added-to-favorites">✓</button>
                  </>
                ) : (
                  <button
                    className="add-to-favorites"
                    onClick={() => handleAddToFavorites(content.content_id)}
                  >
                    +
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContentCard;
