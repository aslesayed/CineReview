import { useState } from "react";
// import { Link } from "react-router-dom";
import "./contentDetail.css";
import ReviewSection from "../ReviewSection/ReviewSection.jsx";

const fakeData = [
  {
    id: 1,
    image: "https://via.placeholder.com/200x300.png?text=Movie+1",
    title: "Dune",
    type: "Movie",
    genre: "Action",
    rating: "8.3",
    description:
      "Paul Atreides, a brilliant and gifted young man with a destiny greater than himself and whatever the fuck the story is i still like it and enjoyed it tho, and Timothée kinda gay not gonna lie",
    cast: "Cast : Zendaya, Thimothée Chalamet, Rebecca Ferguson",
    release: "Release Date : 15 September 2021",
  },
];

const ContentDetail = () => {
  const [favorites, setFavorites] = useState([]);
  const handleAddToFavorites = (contentId) => {
    setFavorites([...favorites, contentId]);
  };

  return (
    <div className="details-block">
      {fakeData.map((content) => (
        <div key={content.id} className="content-card-link2">
          <div className="content-title">{content.title}</div>
          <div className="content-card2">
            <img
              src={content.image}
              alt="Content Poster"
              className="content-image2"
            />
            <div className="content-details-info">
              <div className="genre-rating-container2">
                <div className="type2">{content.type}</div>
                <div className="genre2">{content.genre}</div>
                <div className="rating2">{content.rating} ★ </div>
              </div>
              <button
                className="add-to-favorites2"
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
          <div className="more-info">
            <div className="content-title-dektop">{content.title}</div>
            <div className="content-description">{content.description}</div>
            <div className="horizontal-bar"></div>
            <div className="content-release">{content.release}</div>
            <div className="horizontal-bar"></div>
            <div className="content-casting">{content.cast}</div>
            <div className="horizontal-bar"></div>
          </div>
        </div>
      ))}
      <ReviewSection />
    </div>
  );
};

export default ContentDetail;
