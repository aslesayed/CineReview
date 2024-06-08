import { Link } from "react-router-dom";
import "./inscription.css";

function Inscription() {
  return (
    <div className="container-inscription ">
      <h1 className="inscription-header">CINÉREVIEW</h1>

      <div className="form-inscription">
        <h2 className="create-header">Create Account</h2>
        <form className="form-body">
          <input
            className="inscription-input"
            type="text"
            placeholder="First Name  *"
            required
          />
          <input
            className="inscription-input"
            type="text"
            placeholder="Last Name"
          />
          <input
            className="inscription-input"
            type="tel"
            placeholder="Telephone"
          />
          <input
            className="inscription-input"
            type="email"
            placeholder="Email  *"
            required
          />
          <input
            className="inscription-input"
            type="password"
            placeholder="Password  *"
            required
          />
          <input
            className="inscription-input"
            type="password"
            placeholder="Re enter password  *"
            required
          />
          <button className="create-button" type="submit">
            Submit
          </button>
        </form>
      </div>

      <p className="link-to-sign-in">Already have an account?</p>
      <Link to="/connection" className="button-to-sign-in">
        <p>Sign In</p>
      </Link>
    </div>
  );
}

export default Inscription;
