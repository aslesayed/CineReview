const express = require("express");
const reviewController = require("../controllers/reviews.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

router.post('/reviews', reviewController.insertReview);
router.get("/reviews", reviewController.getAll);
// router.get("/reviews/:id", reviewController.getById);

router.get('/reviews/content/:contentId', reviewController.getByContentId);
router.delete("/reviews/:id", auth.isAuth, reviewController.deleteReview);

module.exports = router;
