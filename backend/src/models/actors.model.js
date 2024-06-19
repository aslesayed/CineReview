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

const updateActorById = async (actorId, updatedActor) => {
  const { firstname, lastname } = updatedActor;
  const query =
    "UPDATE actors SET firstname = ?, lastname = ? WHERE actor_id = ?";
  return db.query(query, [firstname, lastname, actorId]);
};

const deleteActorById = async (actorId) => {
  const query = "DELETE FROM actors WHERE actor_id = ?";
  return db.query(query, [actorId]);
};

module.exports = {
  insert,
  findAllActors,
  updateActorById,
  deleteActorById,
};
