const db = require("../../database/client");

const insert = async (actor) => {
  const { firstname, lastname } = actor;
  const query = "INSERT INTO actors (firstname, lastname) VALUES (?, ?)";
  return db.query(query, [firstname, lastname]);
};

const findAllActors = async () => {
  const query = "SELECT * FROM actors";
  const [rows] = await db.execute(query);
  return rows;
};

const updateActorById = async (updatedActor, actorId) => {
  const { firstname, lastname } = updatedActor;
  const query =
    "UPDATE actors SET firstname = ?, lastname = ? WHERE actor_id = ?";
  return db.query(query, [firstname, lastname, actorId]);
};
const findActorById = async (actorId) => {
  const query = "SELECT * FROM actors WHERE actor_id = ?";
  const [rows] = await db.query(query, [actorId]);
  return rows[0];
};

const deleteActorById = async (actorId) => {
  const query = "DELETE FROM actors WHERE actor_id = ?";
  return db.query(query, [actorId]);
};

module.exports = {
  insert,
  findAllActors,
  updateActorById,
  findActorById,
  deleteActorById,
};
