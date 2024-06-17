const express = require("express");
const reviewController = require("../controllers/reviews.controller");

const router = express.Router();

// router.post('/review', reviewController.add);
router.get("/review", reviewController.getAll);
router.get("/review/:id", reviewController.getById);
router.delete("/review/:id", reviewController.deleteReview);

module.exports = router;
