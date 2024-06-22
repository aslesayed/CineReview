const express = require("express");
const contentController = require("../controllers/contents.controller");
const upload = require("../middlewares/upload");
const { addContent } = require('../controllers/contents.controller');


const router = express.Router();



router.post("/contents", upload.single('thumbnail'), addContent);
router.get("/contents", contentController.getAll);
router.get("/contents/type/movies", contentController.getAllMovies);
router.get("/contents/type/series", contentController.getAllSeries);
router.get("/contents/genre/:genre", contentController.getByGenre);
router.get("/contents/genre", contentController.getByGenreType);
router.get("/contents/:id", contentController.getContentById);
router.put("/contents/:id", contentController.editContent);
router.delete("/contents/:id", contentController.deleteContent);

module.exports = router;
