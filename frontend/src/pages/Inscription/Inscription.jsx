import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import "./inscription.css";

function Inscription() {
  const [inputValue, setInputValue] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

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
    if (validatePassword(password)) {
      // Handle successful validation
      console.log("Valid input:", inputValue);
    } else {
      // Handle password validation error
      console.log("Invalid password");
      alert(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one number."
      );
    }
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  };
  return (
    <div className="container-form">
      <h1 className="top-header">CINÉREVIEW</h1>

      <div className="form-inscription">
        <h2 className="form-header">Create Account</h2>
        <form className="form-body" onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            placeholder="First Name  *"
            required
          />
          <input className="form-input" type="text" placeholder="Last Name" />

          <input
            className="form-input"
            type="text"
            placeholder="Email or Phone  * "
            value={inputValue}
            onChange={handleInputChange}
            required
          />
          <div className="input-icon">
            <input
              className="form-input"
              type={passwordVisible ? "text" : "password"}
              placeholder="Password  *"
              value={password}
              onChange={handlePassword}
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

          <div className="input-icon">
            <input
              className="form-input"
              type={passwordVisible ? "text" : "password"}
              placeholder="Re enter password  *"
              value={confirmPassword}
              onChange={handleConfirmPassword}
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

          {password === confirmPassword ? null : (
            <p className="unmatch-header">Password not identical</p>
          )}

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
