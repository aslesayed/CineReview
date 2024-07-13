// src/pages/ContentManager/contentmanager.js
import "./contentmanager.css";
import ContentTable from "../../composants/ContentTable/ContentTable";
import ContentUpload from "../../composants/ContentUpload/ContentUpload";
import AddActor from "../../composants/AddActor/AddActor"; // Importer le nouveau composant
import React, { useEffect, useState } from 'react';
import Footer from "../../composants/Footer/Footer";

const ContentManager = () => {
  const [contents, setContents] = useState([]);
  const [refreshActors, setRefreshActors] = useState(false);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contents`);
        const data = await response.json();
        console.log("Data from API:", data); // Log pour vérifier les données de l'API
        setContents(data);
      } catch (error) {
        console.error("Error fetching contents:", error);
      }
    };

    fetchContents();
  }, []);

  useEffect(() => {
    // Rafraîchir la liste des acteurs lors de l'ajout d'un nouvel acteur
    if (refreshActors) {
      const fetchActors = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/actors`);
          const data = await response.json();
          // Log pour vérifier les données des acteurs
          console.log("Actors from API:", data);
        } catch (error) {
          console.error("Error fetching actors:", error);
        }
      };
      fetchActors();
      setRefreshActors(false);
    }
  }, [refreshActors]);

  return (
    <div>
      <ContentUpload />
      <AddActor onActorAdded={() => setRefreshActors(true)} />
      <ContentTable contents={contents} />
    </div>
  );
};

export default ContentManager;
