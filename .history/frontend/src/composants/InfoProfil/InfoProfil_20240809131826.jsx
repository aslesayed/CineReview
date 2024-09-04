import { useState, useEffect } from "react";
import useUser from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import "./infoprofil.css";
import Modal from "../Modal/Modal";
import EditProfil from "../EditProfil/EditProfil"; 

function InfoProfil() {
  const { user, setUser } = useUser();
  const [firstname, setFirstname] = useState(user?.firstname || "");
  const [lastname, setLastname] = useState(user?.lastname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openEditModal = () => {
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setEmail(user.email);
    }
  }, [user]);

  const logout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        setUser(null); // Clear user context
        navigate("/connection"); // Redirect to login page
      } else {
        console.error("Error during logout.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      
      <div className="container-form-profil">
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
        </div>
        <div className="block-name-header">
          <h2 className="name-header">{firstname}</h2>
          <h2 className="name-header">{lastname}</h2>
        </div>
        <div className="block-name-header">
          <h2 className="name-header">{email}</h2>
          
        </div>
        <div className="buttons-container">
          <button
            type="button"
            className="round-button"
            onClick={openEditModal}
          >
            <MdOutlineEdit size={18} />
          </button>
          <button className="round-button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {isEditing ? (
          <EditProfil onClose={closeModal} />
        ) : (
          <InfoProfil onEdit={openEditModal} />
        )}
      </Modal>
    </div>
  );
}

export default InfoProfil;
