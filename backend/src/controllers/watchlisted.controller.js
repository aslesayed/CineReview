const watchlistedModel = require("../models/watchlisted.model");

const addWatchlist = async (req, res, next) => {
  try {
    const watchlist = req.body;
    const [result] = await watchlistedModel.insert(watchlist);
    if (result.affectedRows > 0) {
      const [[newWatchlist]] = await watchlistedModel.findByUsers(
        watchlist.userID
      );
      res.status(201).json(newWatchlist);
    } else res.sendStatus(422);
  } catch (error) {
    next(error);
  }
};

const getWatchlist = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const [watchlist] = await watchlistedModel.findByUsers(userId);
    res.status(200).json(watchlist);
  } catch (error) {
    next(error);
  }
};

const deleteWatchlist = async (req, res, next) => {
  try {
    const [result] = await watchlistedModel.deleteById(req.body);
    if (result.affectedRows > 0) {
      res.sendStatus(200);
    } else res.sendStatus(422);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addWatchlist,
  getWatchlist,
  deleteWatchlist,
};
