const db = require("../../database/client");

const insert = async (content) => {
  const { type, name, description, rating, thumbnail, genre, release_date } = content;

  return db.query(
    "INSERT INTO contents (type, name, description, rating, release_date, thumbnail, genre) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [type, name, description, rating, release_date, thumbnail, genre]
  );
};


const findAll = async () => {
  const sql = `SELECT * FROM contents`;
  return db.query(sql);
};

const findByType = async (type) => {
  const sql = `SELECT * FROM contents WHERE type = ?`;
  return db.query(sql, [type]);
};

const findByGenre = async (genre) => {
  const query = `SELECT * FROM contents WHERE genre = ?`;
  const [rows] = await db.execute(query, [genre]);
  return rows;
};

const filterByGenreType = async (type, genre) => {
  const query = `SELECT * FROM contents WHERE 1=1`;
  const params = [];

  if (type) {
    query += ` AND type =?`;
    params.push(type);
  }

  if (genre) {
    query += ` AND genre =?`;
    params.push(genre);
  }

  const [results] = await db.query(query, params);
  return results;
};

const findById = async (contentId) => {
  const query = `SELECT * FROM contents WHERE content_id =?`;
  const [rows] = await db.execute(query, [contentId]);
  return rows;
};



// const updateContent = (content, id) => {
//   const {  type, name, description, rating, release_date, genre } = content;
//   return db.query(
//     "UPDATE contents SET type = ?, name = ?, description = ?, rating = ?, release_date = ?, genre = ? WHERE content_id = ?",
//     [
//       type,
//       name,
//       description,
//       rating,
//       release_date,
//       genre,
//       id,
//     ]
//   );
// };

const updateContent = (id, data) => {
  return db.query("UPDATE contents SET ? WHERE content_id = ?", [data, id]);
};

const deleteById = async (id) => {
  const sql = `DELETE FROM contents WHERE content_id = ?`;
  return db.query(sql, [id]);
};

// const findByGenreAndType = async (genre, type) => {
//   const query = `SELECT * FROM contents WHERE genre = ? AND type = ?`;
//   const [rows] = await db.execute(query, [genre, type]);
//   return rows;
// };

module.exports = {
  insert,
  findAll,
  findByType,
  findByGenre,
  filterByGenreType,
  findById,
  updateContent,
  deleteById,
};
