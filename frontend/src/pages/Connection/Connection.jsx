// import { Link } from "react-router-dom";
// import "./connection.css";

// function Connection() {
//   return (
//     <div className="container-inscription ">
//       <h1 className="inscription-header">CINÉREVIEW</h1>

//       <div className="form-connection">
//         <h2 className="create-header">Sign In</h2>
//         <form className="form-body">
//           <input
//             className="inscription-input"
//             type="tel"
//             placeholder="Telephone"
//           />
//           <input
//             className="inscription-input"
//             type="email"
//             placeholder="Email"
//             required
//           />
//           <input
//             className="inscription-input"
//             type="password"
//             placeholder="Password"
//             required
//           />

//           <button className="create-button" type="submit">
//             Connect
//           </button>
//         </form>
//       </div>
//       <div className="create-account-link">
//         <p className="link-to-sign-in">New here?</p>
//         <Link to="/inscription" className="button-to-sign-in">
//           <p>Create Account </p>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Connection;

import { Link } from "react-router-dom";
import { useState } from "react";
import "./connection.css";

function Connection() {
  const [inputValue, setInputValue] = useState("");

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
            placeholder="Email or Telephone"
            value={inputValue}
            onChange={handleInputChange}
            required
          />
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            required
          />

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
