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

// const getWatchlist = async (req, res, next) => {
//   try {
//     const { userID } = req.body;
//     const [watchlist] = await watchlistedModel.findByUsers(userID);
//     if (watchlist.affectedRows > 0) {
//       res.status(200).json (watchlist);
//     } else res.sendStatus(422);
//   } catch (error) {
//     next(error);
//   }
// };

const getWatchlist = async (req, res, next) => {
  try {
    const { userID } = req.body;

    // Ensure userID is present and valid
    if (!userID) {
      return res.status(400).json({ error: "userID is required" });
    }

    // Fetch watchlist for the user
    const watchlist = await watchlistedModel.findByUsers(userID);

    // Check if watchlist has data
    if (watchlist.length > 0) {
      res.status(200).json(watchlist);
    } else {
      res.status(404).json({ message: "Watchlist not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
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
