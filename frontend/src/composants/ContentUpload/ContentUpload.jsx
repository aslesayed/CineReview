import { useState } from "react";
import "./contentupload.css";

const ContentUpload = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    releaseDate: "",
    actors: "",
    rating: "",
    genres: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform any action you want with the form data
    console.log(formData);
    // Reset the form fields
    setFormData({
      title: "",
      description: "",
      type: "",
      releaseDate: "",
      actors: "",
      rating: "",
      genres: "",
      image: "",
    });
  };

  return (
    <div className="content-form-container">
      <h2>Upload Content</h2>
      <form onSubmit={handleSubmit} className="content-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={formData.type}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="actors"
          placeholder="Actors"
          value={formData.actors}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="genres"
          placeholder="Genres"
          value={formData.genres}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ContentUpload;
