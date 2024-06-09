const express = require("express");

const router = express.Router();
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import routes here
const usersRouter = require("./routes/users.route");
const contentsRouter = require("./routes/contents.route");
const actorsRouter = require("./routes/actors.route");
const genresRouter = require("./routes/genres.route");
const watchlistRouter = require("./routes/watchlist.route");
const reviewsRouter = require("./routes/reviews.route");

// Apply routes
router.use(usersRouter);
router.use(contentsRouter);

router.use(actorsRouter);
router.use(genresRouter);
router.use(watchlistRouter);
router.use(reviewsRouter);

/* ************************************************************************* */

module.exports = router;
