import "./app.css";
import { Outlet } from "react-router-dom";
import Navbar from "./composants/Navbar/Navbar";

function App() {
  return (
    <div className="body">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
