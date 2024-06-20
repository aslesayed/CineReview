const db = require("../../database/client");

const insert = (user) => {
  const { firstname, lastname, email, telephone, password, thumbnail } = user;
  console.info(user);

  return db.query(
    "INSERT INTO users (firstname, lastname, email, telephone, password,thumbnail) VALUES (?, ?, ?, ?, ?, ?)",
    [firstname, lastname, email, telephone, password, thumbnail]
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
  return db.query("DELETE FROM users WHERE user_id = ? ", [id]);
};
// const Update = (id, data) => {
//   const { firstname, lastname, email, password, telephone, thumbnail } = data;
//   return db.query(
//     "UPDATE users SET firstname = ?, lastname = ?,  email = ?, password = ?, telephone = ?, thumbnail = ?  WHERE user_id = ?",
//     [
//       firstname,
//       lastname,
//       email,
//       password,
//       telephone,
//       thumbnail,
//       id,
//     ]
//   );
// };

const updateById = (
  id,
  { firstname, lastname, email, password, telephone, thumbnail }
) => {
  return db.query(
    "UPDATE  users SET firstname = ?, lastname = ?, email = ?, password =?, telephone=?,  thumbnail =? WHERE user_id = ?",
    [firstname, lastname, email, password, telephone, thumbnail, id]
  );
};

module.exports = {
  insert,
  findById,
  findAll,
  findByEmail,
  deleteById,
  // Update,
  updateById,
};
