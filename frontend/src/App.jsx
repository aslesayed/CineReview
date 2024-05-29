import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./composants/Navbar/Navbar";
import "./App.css";
import Footer from "./composants/Footer/Footer";

function App() {
  const location = useLocation();
  const hideComponents = location.pathname === "/inscription" || location.pathname === "/connection";

  return (
    <div className="body">
      {!hideComponents && <Navbar />}
      <Outlet />
      {!hideComponents && <Footer />}
    </div>
  );
}

export default App;


