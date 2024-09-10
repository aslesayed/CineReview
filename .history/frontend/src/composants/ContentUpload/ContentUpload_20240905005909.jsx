// import { useRef, useState, useEffect } from "react";
// import Select from "react-select";
// import "./contentupload.css";

// const ContentUpload = () => {
//   const nameRef = useRef();
//   const descriptionRef = useRef();
//   const typeRef = useRef();
//   const release_dateRef = useRef();
//   const ratingRef = useRef();
//   const genreRef = useRef();
//   const thumbnailRef = useRef();
//   const [confirmation, setConfirmation] = useState("");
//   const [actors, setActors] = useState([]);
//   const [selectedActors, setSelectedActors] = useState([]);

//   useEffect(() => {
//     // Fetch actors from backend
//     const fetchActors = async () => {
//       try {
//         const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/actors`);
//         const data = await response.json();
//         // Map actors to the format required by react-select
//         const formattedActors = data.map(actor => ({
//           value: actor.actor_id,
//           label: `${actor.firstname} ${actor.lastname}`
//         }));
//         setActors(formattedActors);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des acteurs:", error);
//       }
//     };

//     fetchActors();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSubmit = new FormData();
//     formDataToSubmit.append("name", nameRef.current.value);
//     formDataToSubmit.append("description", descriptionRef.current.value);
//     formDataToSubmit.append("type", typeRef.current.value);
//     formDataToSubmit.append("release_date", release_dateRef.current.value);
//     formDataToSubmit.append("actors", JSON.stringify(selectedActors.map(actor => actor.value)));
//     formDataToSubmit.append("rating", ratingRef.current.value);
//     formDataToSubmit.append("genre", JSON.stringify(Array.from(genreRef.current.selectedOptions).map(option => option.value)));
//     formDataToSubmit.append("thumbnail", thumbnailRef.current.files[0]);

//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/api/contents`,
//         {
//           method: "POST",
//           credentials: "include",
//           body: formDataToSubmit,
//         }
//       );
//       console.info(response.status);
//       if (response.status === 201) {
//         setConfirmation("Œuvre ajoutée avec succès !");
//       } else {
//         console.error("Veuillez vérifier votre saisie.");
//         setConfirmation("Erreur d'ajout, veuillez vérifier votre saisie.");
//       }
//     } catch (error) {
//       console.error(error);
//       setConfirmation("Erreur de réseau, veuillez réessayer plus tard.");
//     }

//     // Reset the form fields
//     // e.target.reset();
//     // setSelectedActors([]);
//   };

//   return (
//     <div className="container-upload">
//       <h2 className="header-upload-content">Upload Content</h2>
//       <form onSubmit={handleSubmit} className="content-upload-form">
//         <input
//           className="content-form-inputs"
//           type="text"
//           name="name"
//           placeholder="Name"
//           ref={nameRef}
//           required
//         />
//         <textarea
//           className="content-form-inputs"
//           name="description"
//           placeholder="Description"
//           ref={descriptionRef}
//           required
//         ></textarea>
//         <select
//           className="content-form-inputs"
//           name="type"
//           ref={typeRef}
//           required
//         >
//           <option value="Movie">Movie</option>
//           <option value="Serie">Serie</option>
//         </select>
//         <input
//           className="content-form-inputs"
//           type="date"
//           name="release_date"
//           ref={release_dateRef}
//           required
//         />
//         <Select
//           className="content-form-inputs"
//           name="actors"
//           options={actors}
//           isMulti
//           onChange={setSelectedActors}
//           value={selectedActors}
//           placeholder="Select actors"
//           required
//         />
//         <input
//           className="content-form-inputs"
//           type="number"
//           name="rating"
//           placeholder="Rating"
//           ref={ratingRef}
//           required
//         />
//         <select
//           className="content-form-inputs"
//           name="genre"
//           multiple
//           ref={genreRef}
//           required
//         >
//           <option value="Comedy">Comedy</option>
//           <option value="Drama">Drama</option>
//           <option value="Thriller">Thriller</option>
//           <option value="Action">Action</option>
//           <option value="Horror">Horror</option>
//         </select>
//         <input
//           className="content-form-inputs"
//           type="file"
//           name="thumbnail"
//           accept="image/*"
//           ref={thumbnailRef}
//           required
//         />
//         <button className="upload-content-button" type="submit">
//           Upload
//         </button>
//       </form>
//       {confirmation && <p>{confirmation}</p>}
//     </div>
//   );
// };

// export default ContentUpload;


import { useRef, useState, useEffect } from "react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./contentupload.css";

const ContentUpload = () => {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const typeRef = useRef();
  const release_dateRef = useRef();
  const ratingRef = useRef();
  const genreRef = useRef();
  const thumbnailRef = useRef();
  const [confirmation, setConfirmation] = useState("");
  const [actors, setActors] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);

  useEffect(() => {
    // Fetch actors from backend
    const fetchActors = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/actors`
        );
        const data = await response.json();
        // Map actors to the format required by react-select
        const formattedActors = data.map((actor) => ({
          value: actor.actor_id,
          label: `${actor.firstname} ${actor.lastname}`,
        }));
        setActors(formattedActors);
      } catch (error) {
        console.error("Erreur lors de la récupération des acteurs:", error);
      }
    };

    fetchActors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", nameRef.current.value);
    formDataToSubmit.append("description", descriptionRef.current.value);
    formDataToSubmit.append("type", typeRef.current.value);
    formDataToSubmit.append("release_date", release_dateRef.current.value);
    formDataToSubmit.append(
      "actors",
      JSON.stringify(selectedActors.map((actor) => actor.value))
    );
    formDataToSubmit.append("rating", ratingRef.current.value);
    formDataToSubmit.append(
      "genre",
      JSON.stringify(
        Array.from(genreRef.current.selectedOptions).map(
          (option) => option.value
        )
      )
    );
    formDataToSubmit.append("thumbnail", thumbnailRef.current.files[0]);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/contents`,
        {
          method: "POST",
          credentials: "include",
          body: formDataToSubmit,
        }
      );
      console.info(response.status);
      if (response.status === 201) {
        setConfirmation("Content added successfully!");
        toast.success("Content added successfully!");
      } else {
        console.error("Veuillez vérifier votre saisie.");
        setConfirmation("Error adding content, please check your input..");
        toast.error("Error adding content, please check your input.");
      }
    } catch (error) {
      console.error(error);
      setConfirmation("Erreur de réseau, veuillez réessayer plus tard.");
      toast.error("Network error, please try again later.");
    }

    // Reset the form fields if needed
    // e.target.reset();
    // setSelectedActors([]);
  };

  return (
    <div className="container-upload">
      <h2 className="header-upload-content">Upload Content</h2>
      <form onSubmit={handleSubmit} className="content-upload-form">
        <input
          className="content-form-inputs"
          type="text"
          name="name"
          placeholder="Name"
          ref={nameRef}
          required
        />
        <textarea
          className="content-form-inputs"
          name="description"
          placeholder="Description"
          ref={descriptionRef}
          required
        ></textarea>
        <select
          className="content-form-inputs"
          name="type"
          ref={typeRef}
          required
        >
          <option value="Movie">Movie</option>
          <option value="Serie">Serie</option>
        </select>
        <input
          className="content-form-inputs"
          type="date"
          name="release_date"
          ref={release_dateRef}
          required
        />
        <Select
          className="content-form-inputs"
          name="actors"
          options={actors}
          isMulti
          onChange={setSelectedActors}
          value={selectedActors}
          placeholder="Select actors"
          required
        />
        <input
          className="content-form-inputs"
          type="number"
          name="rating"
          placeholder="Rating"
          ref={ratingRef}
          required
        />
        <select
          className="content-form-inputs"
          name="genre"
          multiple
          ref={genreRef}
          required
        >
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Thriller">Thriller</option>
          <option value="Action">Action</option>
          <option value="Horror">Horror</option>
        </select>
        <input
          className="content-form-inputs"
          type="file"
          name="thumbnail"
          accept="image/*"
          ref={thumbnailRef}
          required
        />
        <button className="upload-content-button" type="submit">
          Upload
        </button>
      </form>
      {confirmation && <p>{confirmation}</p>}
      <ToastContainer />
    </div>
  );
};

export default ContentUpload;

