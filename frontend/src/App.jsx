import "./app.css";
import { Outlet } from "react-router-dom";
import Navbar from "./composants/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
