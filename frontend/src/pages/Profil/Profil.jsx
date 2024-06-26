import { useState } from "react";
import useUser from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "./profil.css";

function Profil() {
  const { user, setUser } = useUser();
  const [firstname, setFirstname] = useState(user?.firstname);
  const [lastname, setLastname] = useState(user?.lastname);
  const [email, setEmail] = useState(user?.email);
  const [telephone, setTelephone] = useState(user?.telephone);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.status === 200) {
        setUser(null);
        navigate("/connection");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            telephone,
          }),
        }
      );
      if (response.status === 204) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error("dfbgsrspr.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container-form-profil">
      <div className="form-profil">
        {/* <div className="profil-picture-container">
            <img
              src={user.image}
              alt="profil-picture"
              className="profil-image"
            />
          </div> */}
        <div className="name-profilzz">{user?.firstname}</div>
        <form className="form-body-profil">
          <label className="form-profil-label">Firstname</label>
          <input
            className="form-input-profil"
            type="text"
            required
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          />
          <label className="form-profil-label">Lastname</label>
          <input
            className="form-input-profil"
            type="text"
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />
          <label className="form-profil-label">Email</label>
          <input
            className="form-input-profil"
            type="text"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label className="form-profil-label">Telephone</label>
          <input
            className="form-input-profil"
            type="text"
            required
            value={telephone}
            onChange={(e) => {
              setTelephone(e.target.value);
            }}
          />
        </form>
        <button type="button" className="modify-profil" onClick={handleSubmit}>
          Modify informations{" "}
        </button>
      </div>
      <button className="logout-button" onClick={logout}>
        Log out
      </button>
    </div>
  );
}

export default Profil;
