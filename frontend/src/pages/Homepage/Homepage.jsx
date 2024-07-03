// Homepage.jsx
import "./homepage.css";
import ContentSlider from "../../composants/ContentSlider/ContentSlider";

function Homepage() {
  return (
    <div>
      <h2 className="Slidername">Top Movies</h2>
      <ContentSlider type="Movie" />
      <h2 className="Slidername">Top Series</h2>
      <ContentSlider type="Serie" />
    </div>
  );
}

export default Homepage;
