import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import "./connection.css";

function Connection() {
  const [inputValue, setInputValue] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(inputValue) || validatePhoneNumber(inputValue)) {
      // Handle successful validation
      console.log("Valid input:", inputValue);
    } else {
      // Handle validation error
      console.log("Invalid input:", inputValue);
      alert("Please enter a valid email or phone number.");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format for international phone numbers
    return phoneRegex.test(phone);
  };

  return (
    <div className="container-form">
      <h1 className="top-header">CINÉREVIEW</h1>

      <div className="form-connection">
        <h2 className="form-header">Sign In</h2>
        <form className="form-body" onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            placeholder="Email or Phone"
            value={inputValue}
            onChange={handleInputChange}
            required
          />
          <div className="input-icon">
            <input
              className="form-input"
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              required
            />
            <div
              onClick={() => setPasswordVisible((prevState) => !prevState)}
              className="text_visible"
              onKeyDown={() => setPasswordVisible((prevState) => !prevState)}
              tabIndex="0"
              role="button"
            >
              {passwordVisible ? (
                <FaRegEye icon="gridicons:not-visible" width="20" />
              ) : (
                <FaEyeSlash icon="gridicons:visible" width="20" />
              )}
            </div>
          </div>

          <button className="form-button" type="submit">
            Connect
          </button>
        </form>
      </div>
      <div className="create-account-link">
        <p className="connect-header">New here?</p>
        <Link to="/inscription" className="button-to-connect">
          <p className="connect-link">Create Account</p>
        </Link>
      </div>
    </div>
  );
}

export default Connection;
