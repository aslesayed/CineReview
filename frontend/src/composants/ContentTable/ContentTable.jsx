import { useState, useEffect } from "react";
import "./contenttable.css";

const ContentTable = ({ contents }) => {
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editContent, setEditContent] = useState({
    name: "",
    description: "",
    type: "",
    release_date: "",
    thumbnail: "",
    rating: "",
    genre: "",
  });

  useEffect(() => {
    if (contents) {
      console.log("Contents received:", contents); // Log pour vérifier les contenus
      setData(contents);
    }
  }, [contents]);

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditContent({ ...data[index] });
  };

  const handleDeleteClick = async (id, index) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contents/${id}`, {
        method: "DELETE",
      });
      if (response.status === 204) {
        const newData = data.filter((_, i) => i !== index);
        setData(newData);
      } else {
        console.error("Failed to delete content");
      }
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditContent({ ...editContent, [name]: value });
  };

  const handleSaveClick = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contents/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editContent),
      });
      if (response.status === 204) {
        const newData = [...data];
        newData[editIndex] = editContent;
        setData(newData);
        setEditIndex(null);
        setEditContent({
          name: "",
          description: "",
          type: "",
          release_date: "",
          thumbnail: "",
          rating: "",
          genre: "",
        });
      } else {
        console.error("Failed to update content");
      }
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  const handleCancelClick = () => {
    setEditIndex(null);
    setEditContent({
      name: "",
      description: "",
      type: "",
      release_date: "",
      thumbnail: "",
      rating: "",
      genre: "",
    });
  };

  return (
    <div className="admin-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>Release Date</th>
            <th>Thumbnail</th>
            <th>Rating</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((content, index) => (
            <tr key={content.content_id}>
              {editIndex === index ? (
                <>
                  <td>
                    <input
                      name="name"
                      value={editContent.name}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="description"
                      value={editContent.description}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="type"
                      value={editContent.type}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="release_date"
                      value={editContent.release_date}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="thumbnail"
                      value={editContent.thumbnail}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="rating"
                      value={editContent.rating}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="genre"
                      value={editContent.genre}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleSaveClick(content.content_id)}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{content.name}</td>
                  <td>{content.description}</td>
                  <td>{content.type}</td>
                  <td>{content.release_date}</td>
                  <td>{content.thumbnail}</td>
                  <td>{content.rating}</td>
                  <td>{content.genre}</td>
                  <td>
                    <button onClick={() => handleEditClick(index)}>Edit</button>
                    <button onClick={() => handleDeleteClick(content.content_id, index)}>
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentTable;
