const contentModel = require("../models/contents.model");
const { insert } = require('../models/contents.model');

const getAllMovies = async (req, res, next) => {
  try {
    const [movies] = await contentModel.findByType("movie");
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

const getAllSeries = async (req, res, next) => {
  try {
    const [series] = await contentModel.findByType("series");
    res.status(200).json(series);
  } catch (error) {
    next(error);
  }
};

// const getByGenre = async (req, res, next) => {
//   try {
//     const { genreId } = req.params;
//     const contentList = await contentModel.filterByGenre(genreId);
//     res.status(200).json(contentList);
//   } catch (error) {
//     next(error);
//   }
// };

const getAll = async (req, res, next) => {
  try {
    const [content] = await contentModel.findAll();
    res.status(200).json(content);
  } catch (error) {
    next(error);
  }
};

const editContent = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [result] = await contentModel.update(req.body, id);
    if (result.affectedRows > 0) res.sendStatus(204);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const deleteContent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await contentModel.deleteById(id);
    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};
const filterContent = async (req, res, next) => {
  try {
    const { type, genre } = req.query;
    const filteredContents = await contentModel.filter(type, genre);
    res.status(200).json(filteredContents);
  } catch (error) {
    next(error);
  }
};


// const addContent = async (req, res, next) => {
//   try {
//     const content = req.body;
//     if (req.file) {
//       content.thumbnail = `${req.protocol}://${req.get("host")}/upload/${
//         req.file.filename
//       }`;
//     } else {
//       throw new Error("File upload failed");
//     }
//     await contentModel.insert(content);
//     res.status(201).json(content);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//     next(error);
//   }
// };


const addContent = async (req, res, next) => {
  try {
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const content = req.body;
    if (req.file) {
      content.thumbnail = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;
    } else {
      throw new Error('File upload failed');
    }
    await insert(content);
    res.status(201).json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
    next(error);
  }
};




module.exports = {
  // add,
  addContent,
  getAll,
  editContent,
  deleteContent,
  // getById,
  getAllMovies,
  getAllSeries,
  // getByGenre,
  filterContent,
};
