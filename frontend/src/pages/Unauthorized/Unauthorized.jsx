import { Link } from "react-router-dom";
import "./unauthorized.css";

function Unauthorized() {
  return (
    <div className="unauthorized-container">
      <h1>403 - Accès refusé</h1>
      <p>Vous n'avez pas les droits pour accéder à cette page.</p>
      <Link to="/">
        <button className="back-home-button">Retour à l'accueil</button>
      </Link>
    </div>
  );
}

export default Unauthorized;