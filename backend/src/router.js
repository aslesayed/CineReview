const express = require("express");
const contentRoutes = require("./routes/contents.route");
const genreRoutes = require("./routes/genres.route");
const reviewRoutes = require("./routes/reviews.route");
const watchlistRoutes = require("./routes/watchlisted.route");
const userRoutes = require("./routes/users.route");

const router = express.Router();

// Include content routes
router.use(contentRoutes);
router.use(genreRoutes);
router.use(reviewRoutes);
router.use(watchlistRoutes);
router.use(userRoutes);

module.exports = router;
