const contentModel = require("../models/contents.model");


const add = async (req, res, next) => {
  try {
    const content = req.body;
    const [result] = await contentModel.insert(content);
    if (result.insertId) {
      const [[newcontent]] = await contentModel.findById(result.insertId);
      res.status(201).json(newcontent);
    } else res.sendStatus(422);
  } catch (error) {
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

const getByType = async (req, res, next) => {
  try {
    const { type } = req.params;
    const [content] = await contentModel.findByType(type);
    res.status(200).json(content);
  } catch (error) {
    next(error);
  }
};

const getByGenre = async (req, res, next) => {
  try {
    const { genreId } = req.params;
    const [content] = await contentModel.findByGenre(genreId);
    res.status(200).json(content);
  } catch (error) {
    next(error);
  }
};
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [[content]] = await contentModel.findById(id);
    if (content) {
      res.status(200).json(content);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};


module.exports = {
 add,
 getAll,
 editContent,
 deleteContent,
 getByType,
 getByGenre,
 getById,
 
};