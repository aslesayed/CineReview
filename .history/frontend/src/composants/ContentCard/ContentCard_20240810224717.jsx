// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import useUser from "../../contexts/UserContext";
// import { IoCheckmarkSharp } from "react-icons/io5";
// import "./contentcard.css";

// const ContentCard = ({ contents = [], setDeleted }) => {
//   const { user } = useUser();
//   const navigate = useNavigate();
//   const [favoriteStatus, setFavoriteStatus] = useState({});

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       if (!user) return;

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
//           const status = {};
//           data.forEach((item) => {
//             status[item.content_id] = true;
//           });
//           setFavoriteStatus(status);
//         } else {
//           console.error("Failed to fetch favorites", response.status);
//         }
//       } catch (error) {
//         console.error("Error fetching favorites:", error);
//       }
//     };

//     fetchFavorites();
//   }, [user, setDeleted]);

//   const toggleFavorite = async (contentId) => {
//     try {
//       const isFavorite = favoriteStatus[contentId];
//       const response = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/api/watchlisted`,
//         {
//           method: isFavorite ? "DELETE" : "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             content_id: contentId,
//             user_id: user.user_id,
//           }),
//           credentials: "include",
//         }
//       );

//       if (response.status === 200 || response.status === 201) {
//         console.log(
//           `Successfully ${isFavorite ? "deleted from" : "added to"} favorites`
//         );
//         setFavoriteStatus((prevStatus) => ({
//           ...prevStatus,
//           [contentId]: !isFavorite,
//         }));
//         setDeleted((prev) => !prev); // Trigger re-fetch of favorites
//       } else {
//         console.error(
//           `Failed to ${isFavorite ? "delete from" : "add to"} favorites`,
//           response.status
//         );
//       }
//     } catch (error) {
//       console.error(
//         `Error ${isFavorite ? "deleting from" : "adding to"} favorites:`,
//         error
//       );
//     }
//   };

//   const handleAddToFavorites = (contentId) => {
//     if (user) {
//       toggleFavorite(contentId);
//     } else {
//       navigate("/connection");
//     }
//   };

//   const handleContentClick = (content) => {
//     const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
//     const updatedRecentlyViewed = [content, ...recentlyViewed.filter(c => c.content_id !== content.content_id)].slice(0, 10);
//     localStorage.setItem("recentlyViewed", JSON.stringify(updatedRecentlyViewed));
//   };

//   return (
//     <div className="content-list">
//       {contents.map((content) => {
//         const isFavorite = favoriteStatus[content.content_id];
//         return (
//           <div key={content.content_id}>
//             <div className="content-card">
//               <Link
//                 to={`/contents/${content.content_id}`}
//                 className="content-card-link"
//                 onClick={() => handleContentClick(content)}
//               >
//                 <img
//                   src={content.thumbnail}
//                   alt="Content Poster"
//                   className="content-image"
//                 />
//               </Link>
//               <div className="content-details">
//                 <div className="genre-rating-container">
//                   <div className="genre">{content.genre}</div>
//                   <div className="rating">
//                     {content.rating} <span className="star-symbol">★</span>{" "}
//                   </div>
//                 </div>
//                 <button
//                   className={
//                     isFavorite ? "added-to-favorites" : "add-to-favorites"
//                   }
//                   onClick={() => handleAddToFavorites(content.content_id)}
//                 >
//                   {isFavorite ? <IoCheckmarkSharp /> : "+"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ContentCard;