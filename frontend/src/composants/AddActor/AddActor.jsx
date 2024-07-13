// src/composants/AddActor/AddActor.js
import React, { useRef, useState } from 'react';
import './addactor.css';

const AddActor = ({ onActorAdded }) => {
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const [confirmation, setConfirmation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const actor = {
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/actors`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(actor),
        }
      );

      if (response.status === 201) {
        setConfirmation("Acteur ajouté avec succès !");
        onActorAdded();
      } else {
        setConfirmation("Erreur d'ajout, veuillez vérifier votre saisie.");
      }
    } catch (error) {
      console.error(error);
      setConfirmation("Erreur de réseau, veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="container-add-actor">
      <h2 className="header-add-actor">Add an Actor</h2>
      <form onSubmit={handleSubmit} className="add-actor-form">
        <input
          className="add-actor-input"
          type="text"
          name="firstname"
          placeholder="Firstname"
          ref={firstnameRef}
          required
        />
        <input
          className="add-actor-input"
          type="text"
          name="lastname"
          placeholder="Lasstname"
          ref={lastnameRef}
          required
        />
        <button className="add-actor-button" type="submit">
          Add
        </button>
      </form>
      {confirmation && <p>{confirmation}</p>}
    </div>
  );
};

export default AddActor;
