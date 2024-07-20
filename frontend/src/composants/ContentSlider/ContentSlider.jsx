// import React, { useState, useEffect } from "react";
// import Slider from "react-slick";
// import ContentCard from "../ContentCard/ContentCard.jsx";
// import "./contentSlider.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const ContentSlider = ({ type, genre }) => {
//   const [contents, setContents] = useState([]);

//   useEffect(() => {
//     const fetchContents = async () => {
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_BACKEND_URL}/api/contents`
//         );
//         const data = await response.json();
//         setContents(data);
//       } catch (error) {
//         console.error("Error fetching contents:", error);
//       }
//     };

//     fetchContents();
//   }, []);

//   const filteredContents = contents.filter((content) => {
//     if (genre) {
//       return content.type === type && content.genre === genre;
//     }
//     return content.type === type;
//   });

//   const settings = {
//     infinite: true,
//     speed: 500,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     arrows: true,
//     responsive: [
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
//     <div className="content-slider">
//       <Slider {...settings}>
//         {filteredContents.map((content) => (
//           <div key={content.content_id}>
//             <ContentCard contents={[content]} />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import ContentCard from "../ContentCard/ContentCard.jsx";
import "./contentSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ContentSlider = ({ type, genre, slidesToShow = 5 }) => {
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

  const filteredContents = contents.filter((content) => {
    if (genre) {
      return content.type === type && content.genre === genre;
    }
    return content.type === type;
  });

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="content-slider">
      <Slider {...settings}>
        {filteredContents.map((content) => (
          <div key={content.content_id}>
            <ContentCard contents={[content]} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ContentSlider;


