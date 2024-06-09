// import "./contentmanager.css";
// import ContentTable from "../../composants/ContentTable/ContentTable";
// import ContentUpload from "../../composants/ContentUpload/ContentUpload";

// function ContentManager() {
//   return (
//     <div className="content-manger" >

//       <ContentUpload />
//       <ContentTable />
      
//     </div>
//   );
// }

// export default ContentManager;
import "./contentmanager.css";
import ContentTable from "../../composants/ContentTable/ContentTable";
import ContentUpload from "../../composants/ContentUpload/ContentUpload";
import Footer from "../../composants/Footer/Footer";

function ContentManager() {
  return (
    <div className="main-container">
      <div className="content-wrapper">
        <ContentUpload />
        <ContentTable />
      </div>
      <Footer />
    </div>
  );
}

export default ContentManager;

