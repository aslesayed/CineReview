const db = require("../../database/client");

const findAll = async () => {
  const sql = `SELECT * FROM genres`;
  return db.query(sql);
};

module.exports = {
  findAll,
};
