// 

import React, { useState, useEffect } from "react";
import ContentCard from "../../composants/ContentCard/ContentCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useUser from "../../contexts/UserContext";
import "./watchlist.css";

function WatchList() {
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]);
  const [deleted, setDeleted] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        console.error("User not logged in");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/watchlisted/${user.user_id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setFavorites(data);
        } else if (response.status === 404) {
          console.error("Endpoint not found");
        } else {
          console.error(`Failed to fetch favorites: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [user, deleted]);

  const getSlidesToShow = () => {
    if (favorites.length === 0) return 0;
    if (favorites.length === 1) return 1; // Show 1 slide if there's only 1 item
    if (favorites.length === 2) return 2; // Show 2 slides if there are 2 items
    return 6; // Default number of slides to show
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: getSlidesToShow(), // Use dynamic slidesToShow
    slidesToScroll: 1,
    arrows: favorites.length > 1, // Only show arrows if there are more than 1 item
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: getSlidesToShow(), // Use dynamic slidesToShow
          slidesToScroll: 1,
          infinite: true,
          arrows: favorites.length > 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: getSlidesToShow(), // Use dynamic slidesToShow
          slidesToScroll: 1,
          infinite: true,
          arrows: favorites.length > 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Show one slide on very small screens
          slidesToScroll: 1,
          infinite: true,
          arrows: favorites.length > 1,
        },
      },
    ],
  };

  return (
    <div className="fav-container">
      {favorites.length > 0 && <h2 className="fav-header">Your Watchlist</h2>}
      <div className="fav-slider">
        {favorites.length > 0 ? (
          <Slider {...settings}>
            {favorites.map((favorite) => (
              <div key={favorite.content_id} className="favorite-item">
                <ContentCard setDeleted={setDeleted} contents={[favorite]} />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="no-favorites">
            <p>You have no items in your watchlist.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WatchList;
