
const actorModel = require("../models/actors.model");

const addActor = async (req, res, next) => {
  try {
    const actor = req.body;
    await actorModel.insert(actor);
    res.status(201).json(actor);
  } catch (error) {
    next(error);
  }
};

const getAllActors = async (req, res, next) => {
  try {
    const actors = await actorModel.findAllActors(); // no destructuring
    res.status(200).json(actors); // send the whole array
  } catch (error) {
    next(error);
  }
};

const getActorById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const actor = await actorModel.findActorById(id);
    if (actor) {
      res.status(200).json(actor);
    } else {
      res.status(404).json({ message: "Actor not found" });
    }
  } catch (error) {
    next(error);
  }
};

const editActor = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [result] = await actorModel.updateActorById(req.body, id);
    if (result.affectedRows > 0) {
      const updatedActor = await actorModel.findActorById(id);
      res.status(200).json(updatedActor);
    } else {
      res.status(404).json({ message: "Actor not found" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteActor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await actorModel.deleteActorById(id);
    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: "Actor not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addActor,
  getAllActors,
  editActor,
  deleteActor,
  getActorById
};