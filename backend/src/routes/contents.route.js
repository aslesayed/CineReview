const express = require("express");
const contentController = require("../controllers/contents.controller");

const router = express.Router();

// Route to add new content
router.post("/content", contentController.addContent);

// Route to get all content
router.get("/content", contentController.getAll);

// Route to get content by genre ID
router.get("/content/genre/:genreId", contentController.getByGenre);

// Route to update content
router.put("/content/:id", contentController.updateContent);

// Route to delete content
router.delete("/content/:id", contentController.deleteContent);

// Route to get all movies
router.get("/content/type/movie", contentController.getAllMovies);

// Route to get all series
router.get("/content/type/series", contentController.getAllSeries);

// Route to filter content by type and genre
router.get("/content/filter", contentController.filterContent);

module.exports = router;
