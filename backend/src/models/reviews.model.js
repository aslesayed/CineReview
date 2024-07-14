const db = require("../../database/client");

const findAll = async () => {
  const sql = `SELECT * FROM reviews`;
  return db.query(sql);
};

const findByContentId = async (contentId) => {
  const sql = `
    SELECT reviews.*, users.firstname, users.lastname, users.thumbnail 
    FROM reviews 
    JOIN users ON reviews.user_id = users.user_id 
    WHERE content_id = ?
    ORDER BY review_date DESC
  `;
  return db.query(sql, [contentId]);
};

const findById = async (id) => {
  try {
    const sql = `SELECT * FROM reviews WHERE review_id = ?`;
    const [results] = await db.query(sql, [id]);
    console.log("findById results:", results);
    return results;
  } catch (error) {
    console.error("Error in findById:", error);
    throw error;
  }
};

const findUserById = async (userId) => {
  try {
    const sql = `SELECT firstname, lastname, thumbnail FROM users WHERE user_id = ?`;
    const [results] = await db.query(sql, [userId]);
    console.log("findUserById results:", results);
    return results;
  } catch (error) {
    console.error("Error in findUserById:", error);
    throw error;
  }
};

const deleteById = async (id) => {
  const sql = `DELETE FROM reviews WHERE review_id = ?`;
  try {
    const result = await db.query(sql, [id]);
    console.log("Delete result:", result);
    return result;
  } catch (error) {
    console.error("Error in deleteById:", error);
    throw error;
  }
};

const insert = async ({ review, review_date, user_id, content_id }) => {
  const sql = `INSERT INTO reviews (review, review_date, user_id, content_id) VALUES (?, ?, ?, ?)`;
  try {
    const result = await db.query(sql, [review, review_date, user_id, content_id]);
    console.log("Insert result:", result);
    return result;
  } catch (error) {
    console.error("Error inserting review:", error);
    throw error;
  }
};

module.exports = {
  findAll,
  findByContentId,
  deleteById,
  insert,
  findById,
  findUserById,
};