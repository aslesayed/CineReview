import { useState, useEffect } from "react";
import useUser from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "./profil.css";

function Profil() {
  const { user, setUser } = useUser();
  const [firstname, setFirstname] = useState(user?.firstname || '');
  const [lastname, setLastname] = useState(user?.lastname || '');
  const [email, setEmail] = useState(user?.email || '');
  const [telephone, setTelephone] = useState(user?.telephone || '');
  const [thumbnail, setThumbnail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setEmail(user.email);
      setTelephone(user.telephone);
    }
  }, [user]);

  const logout = async () => {
    try {
      console.log("Attempting to logout...");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      console.log("Logout response status:", response.status);
      if (response.status === 200) {
        setUser(null);
        navigate("/connection");
      } else {
        console.error("Failed to logout. Status:", response.status);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("telephone", telephone);
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.user_id}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setUser(data);  // Update user context
      } else {
        console.error("Erreur lors de la mise à jour.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);

    // Update the profile picture preview immediately
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.getElementById("profil-picture");
      img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="container-form-profil">
      <div className="form-profil">
        <div className="profil-picture-container">
          <img
            id="profil-picture"
            src={user?.thumbnail ? `${import.meta.env.VITE_BACKEND_URL}${user.thumbnail}` : `${import.meta.env.VITE_BACKEND_URL}/upload/defaultpicture.jpg`}
            alt="profil-picture"
            className="profil-image"
            onClick={() => document.getElementById("fileInput").click()}
          />
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <div className="name-profil">{user?.firstname}</div>
        <form className="form-body-profil" onSubmit={handleSubmit}>
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
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label className="form-profil-label">Telephone</label>
          <input
            className="form-input-profil"
            type="tel"
            required
            value={telephone}
            onChange={(e) => {
              setTelephone(e.target.value);
            }}
          />
          <button type="submit" className="modify-profil">Modify informations</button>
        </form>
        {user && user.admin === 1 && (
          <button
            className="modify-profil"
            onClick={() => navigate("/contentmanager")}
          >
            Manage Content
          </button>
        )}
      </div>
      <button className="logout-button" onClick={logout}>Log out</button>
    </div>
  );
}

export default Profil;
