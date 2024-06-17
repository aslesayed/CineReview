const express = require("express");
const contentController = require("../controllers/contents.controller");
const upload = require("../middlewares/upload");
const { addContent } = require('../controllers/contents.controller');


const router = express.Router();

// // Route to add new content
// router.post("/contents", fileUpload.any(), contentController.addContent);


router.post("/contents", upload.single('thumbnail'), addContent);

// Route to get all content
router.get("/contents", contentController.getAll);

// Route to get content by genre ID
// router.get("/contents/genre/:genreId", contentController.getByGenre);

// Route to update content

// Route to delete content
router.delete("/contents/:id", contentController.deleteContent);

// Route to get all movies
router.get("/contents/type/movies", contentController.getAllMovies);

// Route to get all series
router.get("/contents/type/series", contentController.getAllSeries);

// Route to filter content by type and genre
router.get("/contents/filter", contentController.filterContent);

module.exports = router;
