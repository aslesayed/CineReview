const db = require("../../database/client");

// update

const insert = async (content) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [result] = await connection.execute(
      `INSERT INTO contents (type, name, description, release_date, rating, thumbnail) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        content.type,
        content.name,
        content.description,
        content.releaseDate,
        content.rating,
        content.thumbnail,
      ]
    );
    const contentId = result.insertId;

    // Insert actors and link them
    for (const actor of content.actors) {
      const [actorResult] = await connection.execute(
        `INSERT INTO actors (firstname, lastname) VALUES (?, ?) 
        ON DUPLICATE KEY UPDATE actor_id = LAST_INSERT_ID(actor_id)`,
        [actor.firstname, actor.lastname]
      );
      const actorId = actorResult.insertId;

      await connection.execute(
        `INSERT INTO content_actor (content_id, actor_id) VALUES (?, ?)`,
        [contentId, actorId]
      );
    }

    // Insert genres and link them
    for (const genre of content.genres) {
      const [genreResult] = await connection.execute(
        `INSERT INTO genres (name) VALUES (?) 
        ON DUPLICATE KEY UPDATE genre_id = LAST_INSERT_ID(genre_id)`,
        [genre]
      );
      const genreId = genreResult.insertId;

      await connection.execute(
        `INSERT INTO content_genre (content_id, genre_id) VALUES (?, ?)`,
        [contentId, genreId]
      );
    }

    await connection.commit();
    return contentId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

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
  // insert,
  findById,
  findAll,
  // update,
  deleteById,
  findByType,
  findByGenre,
  insert,
};
