import { useParams } from "react-router-dom";
import ContentDetail from "../../composants/ContentDetail/ContentDetail";

function MovieDetail() {
  const { id } = useParams();

  return (
    <section>
      <ContentDetail contentId={id} />
    </section>
  );
}

export default MovieDetail;