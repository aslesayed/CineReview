import "./footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="Footer">
      <Link className="top-footer" to="/profil">
        My Account
      </Link>
      <div className="middle-footer">
        <Link className="social-link" to="https://instagram.com">
          Instagram
        </Link>
        <Link className="social-link" to="https://pinterest.com">
          Pinterest
        </Link>
        <Link className="social-link" to="https://facebook.com">
          Facebook
        </Link>
      </div>
      <div className="bottom-footer">
        <Link className="social-link" to="/GDPR">
          GDPR
        </Link>
        <div className="social-link">@2024 CinéReview</div>
      </div>
    </div>
  );
}

export default Footer;
