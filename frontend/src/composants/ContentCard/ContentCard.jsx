import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./contentcard.css";

const ContentCard = () => {
  const [contents, setContents] = useState([]);

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
