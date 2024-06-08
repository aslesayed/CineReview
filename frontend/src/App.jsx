import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./composants/Navbar/Navbar";
import "./app.css";
import Footer from "./composants/Footer/Footer";


function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== "/inscription";

  return (
    <div className="body">
      {showNavbar && <Navbar />}
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;

