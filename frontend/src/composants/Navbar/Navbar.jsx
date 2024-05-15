import "./navbar.css";

function Navbar() {
  return (
    <div className="whole-navbar">
      <div className="top-navbar">
        <div className="logo">CINEREVIEW</div>
        <div className="top-right-navbar">loupe profil</div>
      </div>
      <div className="bottom-navbar">
        <div className="bottom-left-navbar">FILMS SERIES GENRE</div>
        <div className="watchlist">watchlist</div>
      </div>
    </div>
  );
}

export default Navbar;
