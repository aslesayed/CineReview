// import React, { useState, useEffect } from "react";
// import ContentCard from "../../composants/ContentCard/ContentCard";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import useUser from "../../contexts/UserContext";
// import "./watchlist.css";

// function WatchList() {
//   const { user } = useUser();
//   const [favorites, setFavorites] = useState([]);
//   const [deleted, setDeleted] = useState(null);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       if (!user) {
//         console.error("User not logged in");
//         return;
//       }

//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_BACKEND_URL}/api/watchlisted/${user.user_id}`,
//           {
//             method: "GET",
//             credentials: "include",
//           }
//         );
//         if (response.status === 200) {
//           const data = await response.json();
//           setFavorites(data);
//         } else if (response.status === 404) {
//           console.error("Endpoint not found");
//         } else {
//           console.error(`Failed to fetch favorites: ${response.status}`);
//         }
//       } catch (error) {
//         console.error("Error fetching favorites:", error);
//       }
//     };

//     fetchFavorites();
//   }, [user, deleted]);

//   const settings = {
//     infinite: true,
//     speed: 500,
//     slidesToShow: 6,
//     slidesToScroll: 1,
//     arrows: true,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 6,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 700,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="fav-container">
//       {favorites.length > 0 && <h2 className="fav-header">Your Watchlist</h2>}
//       <div className="fav-slider">
//         {favorites.length > 0 ? (
//           <Slider {...settings}>
//             {favorites.map((favorite) => (
//               <div key={favorite.content_id} className="favorite-item">
//                 <ContentCard setDeleted={setDeleted} contents={[favorite]} />
//               </div>
//             ))}
//           </Slider>
//         ) : (
//           <div className="no-favorites">
//             <p>You have no items in your watchlist.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default WatchList;
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
    if (favorites.length >= 6) return 6;
    if (favorites.length === 1) return 1;
    if (favorites.length === 2) return 2;
    if (favorites.length === 3) return 3;
    if (favorites.length === 4) return 4;
    if (favorites.length === 5) return 5;
    return favorites.length; // Show as many slides as items if less than 6
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: getSlidesToShow(), // Use dynamic slidesToShow
    slidesToScroll: 1,
    arrows: favorites.length > 1, // Only show arrows if there are more than 1 item
    centerMode: favorites.length === 1, // Center mode for a single item
    centerPadding: favorites.length === 1 ? "0" : "10px", // No padding for single item
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
          favorites.length === 1 ? (
            <div className="single-item">
              <ContentCard setDeleted={setDeleted} contents={favorites} />
            </div>
          ) : (
            <Slider {...settings}>
              {favorites.map((favorite) => (
                <div key={favorite.content_id} className="favorite-item">
                  <ContentCard setDeleted={setDeleted} contents={[favorite]} />
                </div>
              ))}
            </Slider>
          )
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
