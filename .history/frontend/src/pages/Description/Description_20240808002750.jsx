import { useParams } from "react-router-dom";
import ContentDetail from "../../composants/ContentDetail/ContentDetail";
import ReviewSection from "../../composants/ReviewSection/ReviewSection";


function Description() {
  const { id } = useParams();

  return (
    <section>
      <ContentDetail contentId={id} />
     <ReviewSection contentId={id} />

    </section>
  );
}

export default Description;
