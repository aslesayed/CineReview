const router = require("express").Router();
const watchlistController = require("../controllers/watchlisted.controller");
// const { isAuth } = require("../middlewares/auth");

router.get("/watchlisted/:userId", watchlistController.getWatchlist);
router.post("/watchlisted", watchlistController.addWatchlist);
router.delete("/watchlisted", watchlistController.deleteWatchlist);

module.exports = router;