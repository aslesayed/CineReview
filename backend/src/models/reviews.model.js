const db = require("../../database/client");

const findAll = async () => {
  const sql = `SELECT * FROM reviews`;
  return db.query(sql);
};

const findById = async (id) => {
  const sql = `SELECT * FROM reviews WHERE review_id = ?`;
  return db.query(sql, [id]);
};

const deleteById = async (id) => {
  const sql = `DELETE FROM reviews WHERE review_id = ?`;
  return db.query(sql, [id]);
};

const insert = (artwork) => {
  const { review, review_date } = artwork;

  return db.query(
    "INSERT INTO reviews (review, review_date, user_id, content_id) VALUES (?, ?, ?, ?)",
    [review, review_date, user.user_id, user.content_id]
  );
};

module.exports = {
  findAll,
  findById,
  deleteById,
  insert,
};
