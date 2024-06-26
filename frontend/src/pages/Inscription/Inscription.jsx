import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { useState, useRef } from "react";
import "./inscription.css";

function Inscription() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const firstname = useRef();
  const lastname = useRef();
  const navigate = useNavigate();

  const handlePassword = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validatePassword = (password) => {
    const regexPattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setIsPasswordValid(regexPattern.test(password));
  };

  const validateEmail = () => {
    const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(regexPattern.test(email));
  };

  const validatePhoneNumber = () => {
    if (telephone === "") {
      setIsPhoneValid(true);
      return;
    }
    const telephoneRegex = /^(\+?[1-9]\d{1,14}|\d{10,15})$/;
    setIsPhoneValid(telephoneRegex.test(telephone));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    validateEmail();
    validatePhoneNumber();

    if (
      isEmailValid &&
      isPhoneValid &&
      isPasswordValid &&
      password === confirmPassword
    ) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstname: firstname.current.value,
              lastname: lastname.current.value || null,
              email,
              telephone: telephone || null,
              password,
              thumbnail: null,
            }),
          }
        );
        console.info(response.status);
        if (response.status === 201) {
          console.log("User created successfully.");
          alert("User created successfully.");
          navigate("/connection");
        } else {
          console.error("Failed to create user.");
        }
      } catch (error) {
        console.error("Error creating user:", error);
      }
    } else {
      alert("Please ensure all the mendatory fields are valid.");
    }
  };

  return (
    <div className="container-form">
      <h1 className="top-header">CINÉREVIEW</h1>

      <div className="form-inscription">
        <h2 className="form-header">Create Account</h2>
        <form className="form-body" onSubmit={handleRegisterSubmit}>
          <input
            className="form-input"
            type="text"
            placeholder="First Name *"
            required
            ref={firstname}
          />
          <input
            className="form-input"
            type="text"
            placeholder="Last Name"
            ref={lastname}
          />

          <input
            className="form-input"
            type="text"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
            required
          />
          {!isEmailValid && email && (
            <p className="unmatch-header">Invalid email address</p>
          )}

          <input
            className="form-input"
            type="text"
            placeholder="Telephone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            onBlur={validatePhoneNumber}
          />
          {!isPhoneValid && telephone && (
            <p className="unmatch-header">Invalid phone number</p>
          )}

          <div className="input-icon">
            <input
              className="form-input"
              type={passwordVisible ? "text" : "password"}
              placeholder="Password *"
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
              placeholder="Re-enter password *"
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
            <p className="unmatch-header">Passwords do not match</p>
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
