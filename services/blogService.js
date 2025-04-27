const db = require("../config/db");

module.exports = {
  createPost: async (title, content, author_id) => {
    const result = await db.query(
      "INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *",
      [title, content, author_id]
    );
    return result.rows[0];
  },

  getPosts: async () => {
    const result = await db.query(
      "SELECT posts.*, users.name AS author FROM posts JOIN users ON posts.author_id = users.id"
    );
    return result.rows;
  },

  deletePost: async (id) => {
    await db.query("DELETE FROM posts WHERE id = $1", [id]);
  }
};
