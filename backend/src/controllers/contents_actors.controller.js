const contentsActorsModel = require("../models/contents_actors.model");


// const addContentActor = async (req, res, next) => {
//   try {
//     const contentActor = req.body;
//     const result = await contentsActorsModel.insert(contentActor);
//     if (result.affectedRows > 0) {
//       res.sendStatus(201);
//     } else {
//       res.sendStatus(422);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

const addContentActor = async (req, res, next) => {
  try {
    const { content_id, actor_id } = req.body;
    const result = await contentsActorsModel.insert({ content_id, actor_id });
    if (result.affectedRows > 0) {
      res.sendStatus(201); 
    } else {
      res.sendStatus(422); 
    }
  } catch (error) {
    next(error); 
  }
};

const getAllContentActor = async (req, res, next) => {
  try {
    const [rows] = await contentsActorsModel.findAll();
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

const getContentActorById = async (req, res, next) => {
  const { contentId } = req.params;
  try {
    const actors = await contentsActorsModel.findById(contentId);
    if (actors.length > 0) {
      res.status(200).json(actors);
    } else {
      res.status(404).json({ message: "No actors found for the given content ID" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteContentActor = async (req, res, next) => {
  try {
    const { contentId, actorId } = req.params;

    await contentsActorsModel.deleteById(contentId, actorId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const deleteAllContentActor = async (_, res, next) => {
  try {
    await contentsActorsModel.deleteAll();
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addContentActor,
  getAllContentActor,
  getContentActorById,
  deleteContentActor,
  deleteAllContentActor,
};
