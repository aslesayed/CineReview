const db = require("../../database/client");

// const findAll = () => {
//   return db.query("SELECT * FROM watchlisted ");
// };

const insert = (watchlist) => {
  return db.query(
    "INSERT INTO watchlisted ( user_id, content_id ) VALUES (?, ?)",
    [watchlist.user_id, watchlist.content_id]
  );
};

const findByUsers = (userId) => {
   return db.query(
     "SELECT c.* FROM contents c JOIN watchlisted w ON c.content_id = w.content_id WHERE w.user_id = ?",
     [userId]
   );
};






const deleteById = (watchlist) => {
  return db.query(
    "DELETE FROM watchlisted WHERE content_id = ? AND user_id = ?",
    [watchlist.content_id, watchlist.user_id]
  );
};

module.exports = {
  // findAll,
  insert,
  findByUsers,
  deleteById,
};
