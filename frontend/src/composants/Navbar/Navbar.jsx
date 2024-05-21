import { Link } from "react-router-dom";
import ProfilIcon from "../../assets/images/Profilicon.png";
import "./navbar.css";
import SearchBar from "../SearchBar/SearchBar.jsx";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo_profil">
        <Link to="/" className="button-filter-link">
          <p className="logo">CINÉREVIEW</p>
        </Link>
        <div className="search-profil">
          <SearchBar />
          <Link to="/profil">
            <img className="profil-icon" src={ProfilIcon} alt="ProfilIcon" />
          </Link>
        </div>
      </div>

      <div className="filter_content">
        <div className="genre-film-series">
          <Link to="/movieslist" className="button-filter-link">
            <p className="button-filter">MOVIES</p>
          </Link>
          <Link to="/serieslist" className="button-filter-link">
            <p className="button-filter">SERIES</p>
          </Link>
          <Link to="/genrelist" className="button-filter-link">
            <p className="button-filter">GENRE</p>
          </Link>
        </div>
        <Link to="/watchlist" className="button-filter-link">
          <p className="button-filter">WATCHLIST</p>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
