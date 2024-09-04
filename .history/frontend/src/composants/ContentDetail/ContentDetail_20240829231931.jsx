// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./contentDetail.css";
// import ContentSlider from "../ContentSlider/ContentSlider";

// import useUser from "../../contexts/UserContext";
// import { IoCheckmarkSharp } from "react-icons/io5";
// import { AiOutlinePlus } from "react-icons/ai";

// const ContentDetail = ({ contentId }) => {
//   const { user } = useUser();
//   const navigate = useNavigate();
//   const [content, setContent] = useState(null);
//   const [actors, setActors] = useState([]);
//   const [genre, setGenre] = useState("");
//   const [favoriteStatus, setFavoriteStatus] = useState(false);

//   useEffect(() => {
//     const fetchContentDetails = async () => {
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_BACKEND_URL}/api/contents/${contentId}`
//         );
//         const data = await response.json();
//         setContent(data);
//         setGenre(data[0].genre);
//       } catch (error) {
//         console.error("Error fetching content details:", error);
//       }
//     };

//     const fetchActors = async () => {
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_BACKEND_URL}/api/contents-actors/${contentId}`
//         );
//         const data = await response.json();
//         setActors(data);
//       } catch (error) {
//         console.error("Error fetching actors:", error);
//       }
//     };

//     const fetchFavoriteStatus = async () => {
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
//           setFavoriteStatus(
//             data.some((item) => item.content_id === parseInt(contentId))
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching favorite status:", error);
//       }
//     };

//     fetchContentDetails();
//     fetchActors();
//     fetchFavoriteStatus();
//   }, [contentId, user]);

//   const toggleFavorite = async () => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/api/watchlisted`,
//         {
//           method: favoriteStatus ? "DELETE" : "POST",
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
//         setFavoriteStatus(!favoriteStatus);
//       } else {
//         console.error(
//           `Failed to ${favoriteStatus ? "delete from" : "add to"} favorites`,
//           response.status
//         );
//       }
//     } catch (error) {
//       console.error(
//         `Error ${favoriteStatus ? "deleting from" : "adding to"} favorites:`,
//         error
//       );
//     }
//   };

//   const handleAddToFavorites = () => {
//     if (user) {
//       toggleFavorite();
//     } else {
//       navigate("/connection");
//     }
//   };

//   if (!content) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="details-block">
//       <div key={content.content_id} className="content-card-link2">
//         <div className="content-title">{content[0].name}</div>
//         <div className="content-card2">
//           <img
//             src={content[0].thumbnail}
//             alt="Content Poster"
//             className="content-image2"
//           />
//           <div className="content-details-info">
//             <div className="genre-rating-container2">
//               <div className="type2">{content[0].type}</div>
//               <div className="genre2">{content[0].genre}</div>
//               <div className="rating2">
//                 {content[0].rating} <span className="star-symbol">★</span>
//               </div>
//             </div>
//             <button
//               className={
//                 favoriteStatus ? "added-to-favorites2" : "add-to-favorites2"
//               }
//               onClick={(e) => {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 handleAddToFavorites(content.content_id);
//               }}
//             >
//               {favoriteStatus ? (
//                 <IoCheckmarkSharp style={{ width: "60px", height: "30px" }} />
//               ) : (
//                 <AiOutlinePlus style={{ width: "60px", height: "30px" }}/>
//               )}
//             </button>
//           </div>
//         </div>
//         <div className="more-info">
//           <div className="desktop-title-watchlist">
//             <div className="content-title-dektop">{content[0].name}</div>
//             <button
//               className={
//                 favoriteStatus
//                   ? "added-to-favorites2-desktop"
//                   : "add-to-favorites2-desktop"
//               }
//               onClick={(e) => {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 handleAddToFavorites(content.content_id);
//               }}
//             >
//               {favoriteStatus ? (
//                 <IoCheckmarkSharp style={{ width: "60px", height: "30px" }} />
//               ) : (
//                 <AiOutlinePlus style={{ width: "60px", height: "30px" }}/>
//               )}
//               <p className="add-watchlist-header">
//                 {favoriteStatus ? "Added to" : "Add to"} watchlist
//               </p>
//             </button>
//           </div>

//           <div className="content-description">{content[0].description}</div>
//           <div className="horizontal-bar"></div>
//           <div className="content-release">
//             Release date: {content[0].release_date}
//           </div>
//           <div className="horizontal-bar"></div>
//           <div className="content-casting">
//             {actors.map((actor) => (
//               <div key={actor.actor_id}>
//                 {" "}
//                 Casting: {actor.firstname} {actor.lastname},
//               </div>
//             ))}
//           </div>
//           <div className="horizontal-bar"></div>
//         </div>
//       </div>

//       <div className="similar-genre-container">
//         <p className="similar-genre-header">Same Genre</p>
//         <ContentSlider genre={genre} type={content[0].type} slidesToShow={6} />
//       </div>
//     </div>
//   );
// };

// export default ContentDetail;