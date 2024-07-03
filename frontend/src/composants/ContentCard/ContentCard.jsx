// ContentCard.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../../contexts/UserContext";
import "./contentcard.css";

const ContentCard = ({ contents = [] }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  // // useEffect(() => {
  // //   const loadFavorites = async () => {
  // //     try {
  // //       const response = await fetch(
  // //         `${import.meta.env.VITE_BACKEND_URL}/api/watchlisted`,
  // //         {
  // //           method: "GET",
  // //           headers: { "Content-Type": "application/json" },
  // //           credentials: "include",
  // //         }
  // //       );
  // //       if (response.status === 200) {
  // //         const favs = await response.json();
  // //         favs.forEach((fav) => {
  // //           if (fav.content_id === contents.content_id) setIsFavorite(true);
  // //         });
  // //       } else {
  // //         console.error("Error loading favorites:", response.statusText);
  // //       }
  // //     } catch (error) {
  // //       console.error("Error loading favorites:", error);
  // //     }
  // //   };
  // //   loadFavorites();
  // // }, []);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/watchlisted`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              content_id: contents.content_id,
            }),
            credentials: "include",
          }
        );
        console.info(response.status);
        if (response.status === 200) {
          setIsFavorite(false);
          setDeleted(contents.content_id);
        } else {
          console.error("Error removing favorite:", response.statusText);
        }
      } else {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/watchlisted`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              content_id: contents.content_id,
            }),
            credentials: "include",
          }
        );
        console.info(response.status);
        if (response.status === 201) {
          setIsFavorite(true);
        } else {
          console.error("Error adding favorite:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div className="content-list">
      {contents.map((content) => {
        console.log(content.content_id); // Log the content_id to ensure it is defined
        return (
          <div>
            <div className="content-card">
              <Link
                to={`/contents/${content.content_id}`} // Use content.content_id to navigate to the detail page
                key={content.content_id}
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
                <button
                  className="add-to-favorites"
                  onClick={
                    user
                      ? () => toggleFavorite()
                      : () => {
                          navigate("/connection");
                        }
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContentCard;
