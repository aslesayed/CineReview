// ContentDetail.jsx
import { useState, useEffect } from "react";
import "./contentDetail.css";
import ReviewSection from "../ReviewSection/ReviewSection.jsx";

const ContentDetail = ({ contentId }) => {
  const [content, setContent] = useState(null);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const fetchContentDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/contents/${contentId}`
        );
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error("Error fetching content details:", error);
      }
    };

    const fetchActors = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/contents-actors/${contentId}`
        );
        const data = await response.json();
        setActors(data);
      } catch (error) {
        console.error("Error fetching actors:", error);
      }
    };

    fetchContentDetails();
    fetchActors();
  }, [contentId]);

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details-block">
      <div key={content.content_id} className="content-card-link2">
        <div className="content-title">{content[0].name}</div>
        <div className="content-card2">
          <img
            src={content[0].thumbnail}
            alt="Content Poster"
            className="content-image2"
          />
          <div className="content-details-info">
            <div className="genre-rating-container2">
              <div className="type2">{content[0].type}</div>
              <div className="genre2">{content[0].genre}</div>
              <div className="rating2">
                {content.rating} <span className="star-symbol">★</span>
              </div>
            </div>
            <button
              className="add-to-favorites2"
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
        <div className="more-info">
          <div className="desktop-title-watchlist">
            <div className="content-title-dektop">{content[0].name}</div>
            <button
              className="add-to-favorites2-desktop"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToFavorites(content.content_id);
              }}
            >
              +<p className="add-watchlist-header"> Add to watchlist</p>
            </button>
          </div>

          <div className="content-description">{content[0].description}</div>
          <div className="horizontal-bar"></div>
          <div className="content-release">{content[0].release_date}</div>
          <div className="horizontal-bar"></div>
          <div className="content-casting">
            {actors.map((actor) => (
              <div key={actor.actor_id}>{actor.firstname}  {actor.lastname}</div>
            ))}
          </div>
          <div className="horizontal-bar"></div>
        </div>
      </div>
      <ReviewSection />
    </div>
  );
};

export default ContentDetail;
