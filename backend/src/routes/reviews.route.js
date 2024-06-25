const express = require("express");
const reviewController = require("../controllers/reviews.controller");
const router = express.Router();

router.post('/reviews', reviewController.insertReview);
router.get("/reviews", reviewController.getAll);
router.get("/reviews/:id", reviewController.getById);
router.delete("/reviews/:id", reviewController.deleteReview);

module.exports = router;
