const express = require("express");
const genreController = require("../controllers/genres.controller");

const router = express.Router();

router.get("/genres", genreController.getAll);

module.exports = router;
