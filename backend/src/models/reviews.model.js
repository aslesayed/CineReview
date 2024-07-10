const db = require("../../database/client");

const findAll = async () => {
  const sql = `SELECT * FROM reviews`;
  return db.query(sql);
};

const findByContentId = async (contentId) => {
  const sql = `SELECT * FROM reviews WHERE content_id = ?`;
  return db.query(sql, [contentId]);
};







const deleteById = async (id) => {
  const sql = `DELETE FROM reviews WHERE review_id = ?`;
  return db.query(sql, [id]);
};

const insert = (data) => {
  const { review, user_id, content_id } = data;

  return db.query(
    "INSERT INTO reviews (review, user_id, content_id) VALUES (?, ?, ?)",
    [review, user_id, content_id]
  );
};



module.exports = {
  findAll,
  findByContentId,
  deleteById,
  insert,
};


