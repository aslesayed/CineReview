import { useState } from "react";
import "./contenttable.css";

const ContentTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      title: "Content Title 1",
      description: "Description of Content 1",
      type: "Movie",
      releaseDate: "2023-05-01",
      actors: "Actor 1, Actor 2",
      rating: 8.5,
      genres: "Action, Thriller",
      image: "https://via.placeholder.com/100", // Replace with actual image URL
    },
    {
      id: 2,
      title: "Content Title 2",
      description: "Description of Content 2",
      type: "Series",
      releaseDate: "2023-06-15",
      actors: "Actor 3, Actor 4",
      rating: 9.0,
      genres: "Drama, Mystery",
      image: "https://via.placeholder.com/100", // Replace with actual image URL
    },
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editContent, setEditContent] = useState(null);

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditContent({ ...data[index] });
  };

  const handleDeleteClick = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditContent({ ...editContent, [name]: value });
  };

  const handleSaveClick = () => {
    const newData = [...data];
    newData[editIndex] = editContent;
    setData(newData);
    setEditIndex(null);
    setEditContent(null);
  };

  const handleCancelClick = () => {
    setEditIndex(null);
    setEditContent(null);
  };

  return (
    <div className="admin-table">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Type</th>
            <th>Release Date</th>
            <th>Poster URL</th>
            <th>Actors</th>
            <th>Rating</th>
            <th>Genres</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((content, index) => (
            <tr key={content.id}>
              {editIndex === index ? (
                <>
                  <td>
                    <input
                      name="title"
                      value={editContent.title}
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
                      name="releaseDate"
                      value={editContent.releaseDate}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="image"
                      value={editContent.image}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="actors"
                      value={editContent.actors}
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
                      name="genres"
                      value={editContent.genres}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{content.title}</td>
                  <td>{content.description}</td>
                  <td>{content.type}</td>
                  <td>{content.releaseDate}</td>
                  <td>{content.image}</td>
                  <td>{content.actors}</td>
                  <td>{content.rating}</td>
                  <td>{content.genres}</td>
                  <td>
                    <button onClick={() => handleEditClick(index)}>Edit</button>
                    <button onClick={() => handleDeleteClick(index)}>
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
