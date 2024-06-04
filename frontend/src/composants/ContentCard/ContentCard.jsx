import { useState } from "react";
import { Link } from "react-router-dom";
import "./contentcard.css";

const fakeData = [
  {
    id: 1,
    image: "https://via.placeholder.com/200x300.png?text=Movie+1",
    genre: "Horror",
    rating: "8.3",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/200x300.png?text=Movie+2",
    genre: "Drama",
    rating: "7.5",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/200x300.png?text=Movie+3",
    genre: "Action",
    rating: "9.1",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/200x300.png?text=Movie+4",
    genre: "Romance",
    rating: "6.9",
  },
];

const ContentCard = () => {
  const [favorites, setFavorites] = useState([]);

  const handleAddToFavorites = (contentId) => {
    setFavorites([...favorites, contentId]);
  };

  return (
    <div className="content-list">
      {fakeData.map((content) => (
        <Link to="/moviedetail" key={content.id} className="content-card-link">
          <div className="content-card">
            <img
              src={content.image}
              alt="Content Poster"
              className="content-image"
            />
            <div className="content-details">
              <div className="genre-rating-container">
                <div className="genre">{content.genre}</div>
                <div className="rating">{content.rating} ★ </div>
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
