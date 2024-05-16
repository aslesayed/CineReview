
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo_profil">
      <Link to="/" className="logo">
        <p >CINÉREVIEW</p>
        </Link>
        <div className="search">loupe </div>
        <Link to="/profil" className="button-profil">
          <p>Profil</p>
        </Link>
      </div>


      <div className="filter_content">
        <div className="genre-film-series">
      <Link to="/profil" className="button-filter">
          <p>FILMS</p>
        </Link>
        <Link to="/series" className="button-filter">
          <p>SERIES</p>
        </Link>
        <Link to="/genre" className="button-filter">
          <p>GENRE</p>
        </Link>
        </div>
        <Link to="/watchlist" className="button-watchlist">
          <p>WATCHLIST</p>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
