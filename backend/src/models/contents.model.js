const db = require("../../database/client");

// update

const insert = async (content) => {
  const { type, name, description, rating, thumbnail, genre } = content;

  return db.query(
    "INSERT INTO contents (type, name, description, rating, release_date, thumbnail, genre) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [type, name, description, content.release_date, rating, thumbnail, genre]
  );
};



const findById = async (contentId) => {
  const query = `SELECT * FROM contents WHERE content_id =?`;
  const [rows] = await db.execute(query, [contentId]);
  return rows;
};
const addActorContent = async (contentId, actorId) => {
  const query = `INSERT INTO content_actor (content_id, actor_id) VALUES (?,?)`;
  await db.execute(query, [contentId, actorId]);
};

const addGenreContent = async (contentId, genreId) => {
  const query = `INSERT INTO content_genre (content_id, genre_id) VALUES (?,?)`;
  await db.execute(query, [contentId, genreId]);
};

// const filterByGenre = async (genreId) => {
//   const query = `
//     SELECT c.* 
//     FROM contents c
//     INNER JOIN content_genre cg ON c.content_id = cg.content_id
//     WHERE cg.genre_id =?
//   `;
//   const [rows] = await db.execute(query, [genreId]);
//   return rows;
// };
const findByActorId = async (actorId) => {
  const query = `SELECT * FROM actors WHERE actor_id =?`;
  const [rows] = await db.execute(query, [actorId]);
  return rows;
};



const findAll = async () => {
  const sql = `SELECT * FROM contents`;
  return db.query(sql);
};

const findByType = async (type) => {
  const sql = `SELECT * FROM contents WHERE type = ?`;
  return db.query(sql, [type]);
};

const deleteById = async (id) => {
  const sql = `DELETE FROM contents WHERE content_id = ?`;
  return db.query(sql, [id]);
};

const filter = async (type, genre) => {
  let query = `SELECT c.* FROM contents c`;
  let queryParams = [];

  if (genre) {
    query += `
      INNER JOIN content_genre cg ON c.content_id = cg.content_id
      INNER JOIN genres g ON cg.genre_id = g.genre_id
    `;
  }

  if (type) {
    query += queryParams.length ? " AND" : " WHERE";
    query += " c.type = ?";
    queryParams.push(type);
  }

  if (genre) {
    query += queryParams.length ? " AND" : " WHERE";
    query += " g.name = ?";
    queryParams.push(genre);
  }

  const [rows] = await db.execute(query, queryParams);
  return rows;
};

module.exports = {
  // findByGenreId,
  findByActorId,
  // filterByGenre,
  addGenreContent,
  addActorContent,
  findById,
  findAll,
  deleteById,
  findByType,
  filter,
  insert,
};
