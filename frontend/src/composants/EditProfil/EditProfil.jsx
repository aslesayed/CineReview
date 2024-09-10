import { useState, useEffect } from "react";
import useUser from "../../contexts/UserContext";
import "./editProfil.css";

function EditProfil({ onClose }) {
  const { user, setUser } = useUser();
  const [firstname, setFirstname] = useState(user?.firstname || "");
  const [lastname, setLastname] = useState(user?.lastname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState(user?.telephone || "");
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setEmail(user.email);
      setTelephone(user.telephone);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      if (password) {
        formData.append("password", password);
      }
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
        setUser(data); // Update user context
        onClose(); // Close the modal
      } else {
        console.error("Error during update.");
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
    <form onSubmit={handleSubmit} className="form-body-profil" style={{ padding: '0' }}>
      <div className="profil-picture-container">
        <img
          id="profil-picture"
          src={
            user?.thumbnail
              ? `${import.meta.env.VITE_BACKEND_URL}${user.thumbnail}`
              : `${import.meta.env.VITE_BACKEND_URL}/upload/defaultpicture.jpg`
          }
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
      <input
        type="text"
        className="form-input-profil"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        placeholder="First name"
        required
      />
      <input
        type="text"
        className="form-input-profil"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        placeholder="Last name"
        required
      />
      <input
        type="email"
        className="form-input-profil"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        className="form-input-profil"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="text"
        className="form-input-profil"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
        placeholder="Telephone"
      />
      <button type="submit" className="save-button">
        Save Changes
      </button>
    </form>
  );
}

export default EditProfil;
