import "./serieslist.css";
import ContentSlider from "../../composants/ContentSlider/ContentSlider";

function SeriesList() {
  return (
    <div>
      <h2 className="Slidername">Top Horror Series</h2>
      <ContentSlider type="Serie" genre="Horror" />
      <h2 className="Slidername">Top Comedy Series</h2>
      <ContentSlider type="Serie" genre="Comedy" />
    </div>
  );
};

export default SeriesList;
