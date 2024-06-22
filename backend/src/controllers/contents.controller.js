const contentModel = require("../models/contents.model");
const { insert } = require('../models/contents.model');

const addContent = async (req, res, next) => {
  try {
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

const getAll = async (req, res, next) => {
  try {
    const [content] = await contentModel.findAll();
    res.status(200).json(content);
  } catch (error) {
    next(error);
  }
};

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

const getByGenre = async (req, res, next) => {
  try {
    const { genre } = req.params;
    const contents = await contentModel.findByGenre(genre);
    res.status(200).json(contents);
  } catch (error) {
    console.error(error);
    res.status(500).json();
    next(error);
  }
};

const getByGenreType = async (req, res, next) => {
  try {
    const { type, genre } = req.query;
    const filteredContents = await contentModel.filterByGenreType(type, genre);
    res.status(200).json(filteredContents);
  } catch (error) {
    next(error);
  }
};

const getContentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const content = await contentModel.findById(id);
    if (content.length > 0) {
      res.status(200).json(content);
    } else {
      res.status(404).json({ message: "Content not found" });
    }
  } catch (error) {
    next(error);
  }
};

// const editContent = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const [result] = await contentModel.updateContent(req.body, id);
//     if (result.affectedRows > 0) res.sendStatus(204);
//     else res.sendStatus(404);
//   } catch (error) {
//     next(error);
//   }
// };

const editContent = async (req, res, next) => {
  const { id } = req.params;
  const updatedContent = req.body;

  try {
    // Check if the content with the given id exists
    const existingContent = await contentModel.findById(id);
    if (existingContent.length === 0) {
      return res.status(404).json({ message: "Content not found" });
    }

    // Perform the update operation
    await contentModel.updateContent(updatedContent, id);

    // Return the updated content as response
    res.status(200).json(updatedContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
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




module.exports = {
  addContent,
  getAll,
  getAllMovies,
  getAllSeries,
  getByGenre,
  getByGenreType,
  getContentById,
  editContent,
  deleteContent,
};
