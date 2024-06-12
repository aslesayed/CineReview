const express = require("express");
const contentController = require("../controllers/contents.controller");

const router = express.Router();

router.post("/content", contentController.add);
router.get("/content", contentController.getAll);
router.get("/content/:id", contentController.getById);
router.get("/content/genre/:genreId", contentController.getByGenre);
router.put("/content/:id", contentController.editContent);
router.delete("/content/:id", contentController.deleteContent);
router.get("/content/type/:type", contentController.getAllSeries);
router.get("/content/type/:type", contentController.getAllMovies);

module.exports = router;
