// import { Link } from "react-router-dom";
// import { FaRegEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useRef, useState } from "react";
// import useUser from "../../contexts/UserContext";
// import "./connection.css";

// function Connection() {

//   const navigate = useNavigate();
//   const { setUser, setIsLoading } = useUser();
//   const email = useRef();
//   const password = useRef();
//  const [passwordVisible, setPasswordVisible] = useState(false);

//   const handleSubmit = async () => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify({
//             email: email.current.value,
//             password: password.current.value,
//           }),
//         }
//       );
//       if (response.status === 200) {
//         const user = await response.json();
//         setUser(user);
//         setIsLoading(false);
//         if (user.role === "admin") {
//           navigate("/users");
//         } else {
//           navigate("/");
//         }
//       } else {
//         setIsLoading(false);
//         // Handle the case without showing toast error
//       }
//     } catch (error) {
//       console.error(error);
//       setIsLoading(false);
//       // Optionally handle error without showing toast error
//     }
//   };


//   return (
//     <div className="container-form">
//       <h1 className="top-header">CINÉREVIEW</h1>

//       <div className="form-connection">
//         <h2 className="form-header">Sign In</h2>
//         <form className="form-body" onSubmit={handleSubmit}>
//           <input
//             className="form-input"
//             type="text"
//             placeholder="Email or Phone"
//             ref={email}
//             required
//           />
//           <div className="input-icon">
//             <input
//               className="form-input"
//               ref={password}
//               type={passwordVisible ? "text" : "password"}
//               placeholder="Password"
//               required
//             />
//             <div
//               onClick={() => setPasswordVisible((prevState) => !prevState)}
//               className="text_visible"
//               onKeyDown={() => setPasswordVisible((prevState) => !prevState)}
//               tabIndex="0"
//               role="button"
//             >
//               {passwordVisible ? (
//                 <FaRegEye icon="gridicons:not-visible" width="20" />
//               ) : (
//                 <FaEyeSlash icon="gridicons:visible" width="20" />
//               )}
//             </div>
//           </div>

//           <button className="form-button" type="submit" onClick={handleSubmit}>
//             Connect
//           </button>
//         </form>
//       </div>
//       <div className="create-account-link">
//         <p className="connect-header">New here?</p>
//         <Link to="/inscription" className="button-to-connect">
//           <p className="connect-link">Create Account</p>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Connection;

import { Link } from "react-router-dom";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import useUser from "../../contexts/UserContext";
import "./connection.css";

function Connection() {
  const navigate = useNavigate();
  const { setUser, setIsLoading } = useUser();
  const email = useRef();
  const password = useRef();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email.current.value,
            password: password.current.value,
          }),
        }
      );
      if (response.status === 200) {
        const user = await response.json();
        setUser(user);
        setIsLoading(false);
        if (user.role === "admin") {
          navigate("/users");
        } else {
          navigate("/");
        }
      } else {
        setIsLoading(false);
        // Handle the case without showing toast error
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      // Optionally handle error without showing toast error
    }
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
            ref={email}
            required
          />
          <div className="input-icon">
            <input
              className="form-input"
              ref={password}
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
                <FaRegEye width="20" />
              ) : (
                <FaEyeSlash width="20" />
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

