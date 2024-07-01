// ContentSlider.jsx
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import ContentCard from "../ContentCard/ContentCard.jsx"
import "./contentSlider.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ContentSlider = () => {
    const [contents, setContents] = useState([]);
  
    useEffect(() => {    
      const fetchContents = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/contents`
          );
          const data = await response.json();
          console.log(data); // Log the data to check the structure
          setContents(data);
        } catch (error) {
          console.error("Error fetching contents:", error);
        }
      };
  
      fetchContents();
    }, []);
  
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 5, // Default to 5 for desktop
      slidesToScroll: 1,
      arrows: true,
      responsive: [
        {
          breakpoint: 700, // Adjust for desktop
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 480, // Adjust for mobile
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        }
      ]
    };
  
    return (
      <div className="content-slider">
        <Slider {...settings}>
          {contents.map((content) => (
            <div key={content.content_id}>
              <ContentCard contents={[content]} />
            </div>
          ))}
        </Slider>
      </div>
    );
  };
  
  export default ContentSlider;