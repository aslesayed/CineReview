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
    image: null, // Update to handle file
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }
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
      image: null,
    });
  };

  return (
    <div className="container-upload">
      <h2 className="header-upload-content">Upload Content</h2>
      <form onSubmit={handleSubmit} className="content-upload-form">
        <input
          className="content-form-inputs"
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          className="content-form-inputs"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          className="content-form-inputs"
          type="text"
          name="type"
          placeholder="Type"
          value={formData.type}
          onChange={handleChange}
          required
        />
        <input
          className="content-form-inputs"
          type="date"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleChange}
          required
        />
        <input
          className="content-form-inputs"
          type="text"
          name="actors"
          placeholder="Actors"
          value={formData.actors}
          onChange={handleChange}
          required
        />
        <input
          className="content-form-inputs"
          type="number"
          name="rating"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
          required
        />
        <input
          className="content-form-inputs"
          type="text"
          name="genres"
          placeholder="Genres"
          value={formData.genres}
          onChange={handleChange}
          required
        />
        <input
          className="content-form-inputs"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <button className="upload-content-button" type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};

export default ContentUpload;
