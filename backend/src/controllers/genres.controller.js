const genreModel = require("../models/genre.model");

const getAll = async (req, res, next) => {
  try {
    const [genres] = await genreModel.findAll();
    res.status(200).json(genres);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
};
