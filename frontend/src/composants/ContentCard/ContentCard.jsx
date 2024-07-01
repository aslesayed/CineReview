import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./contentcard.css";

const ContentCard = () => {
  const [contents, setContents] = useState([]);
  const [watchlist, setWatchlist] = useState(false);

  useEffect(() => {	
    const fetchContents = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/contents`
        );
        const data = await response.json();

        setContents(data);
      } catch (error) {
        console.error("Error fetching contents:", error);
      }
    };

    fetchContents();
  }, []);

  const togglewatchlist = async () => {
    try {
      if (watchlist) {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/watchlisted`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              artworks_id: artwork?.artworkUnique.artworks_id,
            }),
            credentials: "include",
          }
        );
        console.info(response.status);
        if (response.status === 200) {
          setWatchlist(false);
          setDeleted(artwork?.artworkUnique.artworks_id);
        } else {
          console.error("suppression du favori.");
        }
      } else {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/favoris`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              content_id: contentId,
            }),
            credentials: "include",
          }
        );
        console.info(response.status);
        if (response.status === 201) {
          setWatchlist(true);
        } else {
          console.error("Zrro.");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="content-list">
      {contents.map((content) => (
        <Link
          to={`/contents/${content.id}`}
          key={content.id}
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
                  handleAddToFavorites(content.id);
                }}
              >
                +
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ContentCard;

