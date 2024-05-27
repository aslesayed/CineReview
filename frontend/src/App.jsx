import "./app.css";
import { Outlet } from "react-router-dom";
import Navbar from "./composants/Navbar/Navbar";
import Footer from "./composants/Footer/Footer";

function App() {
  return (
    <div className="body">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
