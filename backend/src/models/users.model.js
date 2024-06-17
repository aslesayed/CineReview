const db = require("../../database/client");

const insert = (user) => {
  const { firstname, lastname, email, phone, password } = user;
  return db.query(
    "INSERT INTO users (firstname, lastname, email, phone, password) VALUES (?, ?, ?, ?, ?)",
    [firstname, lastname, email, phone, password]
  );
};

const findAll = () => {
  return db.query("SELECT * FROM users");
};

const findById = (id) => {
  return db.query("SELECT * FROM users WHERE user_id = ?", [id]);
};

const findByEmail = (email) => {
  return db.query("SELECT * FROM users WHERE email = ?", [email]);
};

const deleteById = (id) => {
  return db.query("DELETE FROM users WHERE user_id = ?", [id]);
};

const update = (id, data) => {
  return db.query("UPDATE users SET ? WHERE user_id = ?", [data, id]);
};

module.exports = {
  insert,
  findById,
  findAll,
  findByEmail,
  deleteById,
  update,
};
