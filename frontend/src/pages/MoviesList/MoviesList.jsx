import "./movieslist.css";
import ContentSlider from "../../composants/ContentSlider/ContentSlider";

function MoviesList() {
  return (
    <div>
      <h2 className="Slidername">Top Drama Movies</h2>
      <ContentSlider type="Movie" genre="Drama" />
      <h2 className="Slidername">Top Actions Movies</h2>
      <ContentSlider type="Movie" genre="Action" />
    </div>
  );
};

export default MoviesList;
