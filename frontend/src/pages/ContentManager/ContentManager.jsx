import "./contentmanager.css";
import ContentTable from "../../composants/ContentTable/ContentTable";
import ContentUpload from "../../composants/ContentUpload/ContentUpload";
import React, { useEffect, useState } from 'react';
import Footer from "../../composants/Footer/Footer";

const ContentManager = () => {
  const [contents, setContents] = useState([]);

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

  return (
    <div>
      <ContentUpload/>
      <ContentTable contents={contents} />
    </div>
  );
};

export default ContentManager;