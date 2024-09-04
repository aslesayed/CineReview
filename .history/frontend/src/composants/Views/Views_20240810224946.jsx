import React, { useState, useEffect } from "react";
import ContentSlider from "../ContentSlider/ContentSlider.jsx";

const View = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const storedRecentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    setRecentlyViewed(storedRecentlyViewed);
  }, []);

  return (
    <div className="recently-viewed">
      {recentlyViewed.length > 0 ? (
        <ContentSlider type="RecentlyViewed" contents={recentlyViewed} slidesToShow={6} />
      ) : (
        <p>No recently viewed content.</p>
      )}
    </div>
  );
};

export default View;