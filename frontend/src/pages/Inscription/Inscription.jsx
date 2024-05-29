import { Link } from "react-router-dom";
import "./inscription.css";

function Inscription() {
  return (
    <div className="container-form">
      <h1 className="top-header">CINÉREVIEW</h1>

      <div className="form-inscription">
        <h2 className="form-header">Create Account</h2>
        <form className="form-body">
          <input
            className="form-input"
            type="text"
            placeholder="First Name  *"
            required
          />
          <input className="form-input" type="text" placeholder="Last Name" />
          <input className="form-input" type="tel" placeholder="Telephone" />
          <input
            className="form-input"
            type="email"
            placeholder="Email  *"
            required
          />
          <input
            className="form-input"
            type="password"
            placeholder="Password  *"
            required
          />
          <input
            className="form-input"
            type="password"
            placeholder="Re enter password  *"
            required
          />
          <button className="form-button" type="submit">
            Create
          </button>
        </form>
      </div>

      <p className="connect-header">Already have an account?</p>
      <Link to="/connection" className="button-to-connect">
        <p className="connect-link">Sign In</p>
      </Link>
    </div>
  );
}

export default Inscription;
