import "./contentmanager.css";
import ContentTable from "../../composants/ContentTable/ContentTable";
import ContentUpload from "../../composants/ContentUpload/ContentUpload";

function ContentManager() {
  return (
    <div >

      <ContentUpload />
      <ContentTable />
      
    </div>
  );
}

export default ContentManager;
