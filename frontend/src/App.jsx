import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./composants/Navbar/Navbar";
import "./app.css";
import Footer from "./composants/Footer/Footer";


function App() {
  const location = useLocation();
  // const showNavbar = location.pathname !== "/inscription";
  // const showFooter = location.pathname !== "/inscription";
  const hideComponents = location.pathname === "/inscription" || location.pathname === "/connection";

  return (
    <div className="body">
      {!hideComponents && <Navbar />}
      {!hideComponents &&  <Footer />}
      <Outlet />
     
    </div>
  );
}

export default App;

