const express = require("express");

const actorRoutes = require("./routes/actors.route");
const contentActorRoutes = require("./routes/contents_actors.route");
const contentRoutes = require("./routes/contents.route");
const reviewRoutes = require("./routes/reviews.route");
const userRoutes = require("./routes/users.route");
const watchlistRoutes = require("./routes/watchlisted.route");

const router = express.Router();
router.use(actorRoutes);
router.use(contentActorRoutes);
router.use(contentRoutes);
router.use(reviewRoutes);
router.use(userRoutes);
router.use(watchlistRoutes);

module.exports = router;
