const db = require('../../database/client'); 


const findById = async (id) => {
  const sql = `SELECT * FROM contents WHERE content_id = ?`;
  return db.query(sql, [id]);
};

const findAll = async () => {
  const sql = `SELECT * FROM contents`;
  return db.query(sql);
};



const findByType = async (type) => {
  const sql = `SELECT * FROM contents WHERE type = ?`;
  return db.query(sql, [type]);
};

const findByGenre = async (genreId) => {
  const sql = `
    SELECT c.* 
    FROM contents c
    JOIN content_genre cg ON c.content_id = cg.content_id
    WHERE cg.genre_id = ?
  `;
  return db.query(sql, [genreId]);
};
const deleteById = async (id) => {
  const sql = `DELETE FROM contents WHERE content_id = ?`;
  return db.query(sql, [id]);
};





module.exports = {
  insert,
  findById,
  findAll,
  // update,
  deleteById,
  findByType,
  findByGenre
};
