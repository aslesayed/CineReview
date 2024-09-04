
import "./homepage.css";
import ContentSlider from "../../composants/ContentSlider/ContentSlider";
import View from "../../composants/View/View";
import { useLocation } from "react-router-dom";

function Homeage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const genre = searchParams.get("genre");

  const getTitle = (type) => {
    if (genre) {
      return `Top ${genre} ${type === "Movie" ? "Movies" : "Series"}`;
    }
    return `Top ${type === "Movie" ? "Movies" : "Series"}`;
  };

  return (
    <div>
      <h1 className="title-home">
        Pick your perfect movie coz it can turn an ordinary night into a magical experience.
      </h1>
      <h2 className="Slidername">{getTitle("Movie")}</h2>
      <ContentSlider type="Movie" genre={genre} />

      <h2 className="Slidername">Recently Viewed</h2>
      <View />
      <h2 className="Slidername">{getTitle("Serie")}</h2>
      <ContentSlider type="Serie" genre={genre} />
      
    </div>
  );
}

export default HomePage;
