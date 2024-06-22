const db = require("../../database/client");

// const insert = async (contentId, actorId) => {
//   const query = `INSERT INTO contents_actors (content_id, actor_id) VALUES (?, ?)`;
//   await db.execute(query, [contentId, actorId]);
// };

// const insert = async (contentActor) => {
//   const query = `INSERT INTO contents_actors (content_id, actor_id) VALUES (?, ?)`;
//   const [result] = await db.execute(query, [contentId, actorId]);
//   return result;
// };

const insert = async ({ content_id, actor_id }) => {
  const query = "INSERT INTO contents_actors (content_id, actor_id) VALUES (?, ?)";
  const [result] = await db.execute(query, [content_id, actor_id]);
  return result;
};

const findAll = () => {
  return db.query("SELECT * FROM contents_actors");
};

const findById = async (contentId) => {
  const query = `
    SELECT a.*
    FROM actors a
    JOIN contents_actors ca ON a.actor_id = ca.actor_id
    WHERE ca.content_id = ?
  `;
  const [rows] = await db.execute(query, [contentId]);
  return rows;
};

const deleteAll = () => {
  return db.query("DELETE FROM contents_actors");
};

const deleteById = (contentId, actorId) => {
  return db.query(
    "DELETE FROM contents_actors WHERE content_id = ? AND actor_id = ?",
    [contentId, actorId]
  );
};


module.exports = {
  insert,
  findAll,
  findById,
  deleteAll,
  deleteById,
};
