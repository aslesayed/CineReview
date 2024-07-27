// import { useState, useEffect } from "react";
// import useUser from "../../contexts/UserContext";
// import { useNavigate } from "react-router-dom";
// import { MdOutlineEdit } from "react-icons/md";
// import Modal from "../Modal/Modal";  // Import the Modal component
// import "./infoprofil.css";

// function InfoProfil() {
//   const { user, setUser } = useUser();
//   const [firstname, setFirstname] = useState(user?.firstname || '');
//   const [lastname, setLastname] = useState(user?.lastname || '');
//   const [email, setEmail] = useState(user?.email || '');
//   const [telephone, setTelephone] = useState(user?.telephone || '');
//   const [thumbnail, setThumbnail] = useState(null);
//   const [isModified, setIsModified] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       setFirstname(user.firstname);
//       setLastname(user.lastname);
//       setEmail(user.email);
//       setTelephone(user.telephone);
//     }
//   }, [user]);

//   useEffect(() => {
//     const isFormModified = (
//       firstname !== user?.firstname ||
//       lastname !== user?.lastname ||
//       email !== user?.email ||
//       telephone !== user?.telephone ||
//       thumbnail !== null
//     );
//     setIsModified(isFormModified);
//   }, [firstname, lastname, email, telephone, thumbnail, user]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("firstname", firstname);
//       formData.append("lastname", lastname);
//       formData.append("email", email);
//       formData.append("telephone", telephone);
//       if (thumbnail) {
//         formData.append("thumbnail", thumbnail);
//       }

//       const response = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.user_id}`,
//         {
//           method: "PUT",
//           credentials: "include",
//           body: formData,
//         }
//       );

//       if (response.status === 200) {
//         const data = await response.json();
//         setUser(data);  // Update user context
//         setIsEditing(false); // Exit edit mode
//         setIsModified(false); // Reset modified state
//         setIsModalOpen(false); // Close modal
//       } else {
//         console.error("Error during update.");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleFileChange = (e) => {
//     setThumbnail(e.target.files[0]);

//     // Update the profile picture preview immediately
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const img = document.getElementById("profil-picture");
//       img.src = event.target.result;
//     };
//     reader.readAsDataURL(e.target.files[0]);
//   };

//   const logout = async () => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/api/users/logout`,
//         {
//           method: "POST",
//           credentials: "include",
//         }
//       );

//       if (response.ok) {
//         setUser(null); // Clear user context
//         navigate("/connection"); // Redirect to login page
//       } else {
//         console.error("Error during logout.");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="container-form-profil">

//       {/* <div className="form-profil"> */}
//         <div className="profil-picture-container">
//           <img
//             id="profil-picture"
//             src={user?.thumbnail ? `${import.meta.env.VITE_BACKEND_URL}${user.thumbnail}` : `${import.meta.env.VITE_BACKEND_URL}/upload/defaultpicture.jpg`}
//             alt="profil-picture"
//             className="profil-image"
//             onClick={() => document.getElementById("fileInput").click()}
//           />
//           <input
//             id="fileInput"
//             type="file"
//             accept="image/*"
//             style={{ display: "none" }}
//             onChange={handleFileChange}
//             disabled={!isEditing}
//           />
//           <div className="block-name-header">
//           <h2 className="name-header">{firstname} </h2>
//           <h2 className="name-header"> {lastname}</h2>
//           <button className="more-button" onClick={() => setIsModalOpen(true)}><MdOutlineEdit size={28}/></button>
//           </div>

//         </div>

//         {user && user.admin === 1 && (
//           <button
//             className="modify-profil"
//             onClick={() => navigate("/contentmanager")}
//           >
//             Manage Content
//           </button>
//         )}
//       {/* </div> */}
//       <button className="logout-button" onClick={logout}>Log out</button>

//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <form className="form-body-profil" onSubmit={handleSubmit}>
//           <input
//             className="form-input-profil"
//             type="text"
//             required
//             value={firstname}
//             onChange={(e) => setFirstname(e.target.value)}
//             disabled={!isEditing}
//           />
//           <input
//             className="form-input-profil"
//             type="text"
//             value={lastname}
//             onChange={(e) => setLastname(e.target.value)}
//             disabled={!isEditing}
//           />
//           <input
//             className="form-input-profil"
//             type="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             disabled={!isEditing}
//           />
//           <input
//             className="form-input-profil"
//             type="tel"
//             required
//             value={telephone}
//             onChange={(e) => setTelephone(e.target.value)}
//             disabled={!isEditing}
//           />
//           {isEditing ? (
//             <button type="submit" className="modify-profil" disabled={!isModified}>Save Changes</button>
//           ) : (
//             <button type="button" className="modify-profil" onClick={() => setIsEditing(true)}>Edit Information</button>
//           )}
//         </form>
//       </Modal>
//     </div>
//   );
// }

// export default InfoProfil;

import { useState, useEffect } from "react";
import useUser from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import "./infoprofil.css";

function InfoProfil() {
  const { user, setUser } = useUser();
  const [firstname, setFirstname] = useState(user?.firstname || "");
  const [lastname, setLastname] = useState(user?.lastname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [telephone, setTelephone] = useState(user?.telephone || "");
  const [thumbnail, setThumbnail] = useState(null);
  const [isModified, setIsModified] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setEmail(user.email);
      setTelephone(user.telephone);
    }
  }, [user]);

  useEffect(() => {
    const isFormModified =
      firstname !== user?.firstname ||
      lastname !== user?.lastname ||
      email !== user?.email ||
      telephone !== user?.telephone ||
      thumbnail !== null;
    setIsModified(isFormModified);
  }, [firstname, lastname, email, telephone, thumbnail, user]);

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
        setUser(data); // Update user context
        setIsEditing(false); // Exit edit mode
        setIsModified(false); // Reset modified state
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
    <h1 className="info-header">Your Info</h1>
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
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
          disabled={!isEditing}
        />
      </div>
      {user && user.admin === 1 && (
        <button
          className="modify-profil"
          onClick={() => navigate("/contentmanager")}
        >
          Manage Content
        </button>
      )}
     
      <form className="form-body-profil" onSubmit={handleSubmit}>
        <input
          className="name-input-profil"
          type="text"
          required
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          disabled={!isEditing}
        />
        <input
          className="name-input-profil"
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          disabled={!isEditing}
        />
        <div className="block-modal-info" >
        <input
          className="form-input-profil"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!isEditing}
        />
        <input
          className="form-input-profil"
          type="tel"
          required
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          disabled={!isEditing}
        />
        {isEditing ? (
          <button
            type="submit"
            className="modify-profil"
            disabled={!isModified}
          >
            Save Changes
          </button>
        ) : (
          <button
            type="button"
            className="modify-profil"
            onClick={() => setIsEditing(true)}
          >
            {/* <MdOutlineEdit size={28} /> */}
            Edit Information 
            <div> <MdOutlineEdit size={18} /></div>
          </button>
        )}
        </div>
      </form>
    </div>
    </div>
  );
}

export default InfoProfil;
