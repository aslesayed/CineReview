import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./composants/Navbar/Navbar";
import "./app.css";

function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== "/inscription";

  return (
    <div className="body">
      {showNavbar && <Navbar />}
      <Outlet />
    </div>
  );
}

export default App;

