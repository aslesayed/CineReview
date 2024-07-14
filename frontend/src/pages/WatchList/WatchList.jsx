import React, { useState, useEffect } from "react";
import ContentCard from "../../composants/ContentCard/ContentCard";
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

  return (
    <div>
      <div className="favorite_title">
        <h2>Vos favoris</h2>
      </div>
      <div className="favorites-container">
        {favorites.map((favorite) => (
          <div key={favorite.content_id} className="favorite-item">
            <ContentCard setDeleted={setDeleted} contents={[favorite]} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WatchList;
