const db = require("../config/db");

module.exports = {
  createPost: async (title, content, author_id) => {
    try {
      const result = await db.query(
        "INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *",
        [title, content, author_id]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error creating post:", error.message);
      throw error;
    }
  },

  getPosts: async () => {
    try {
      const result = await db.query(
        "SELECT posts.*, users.name AS author FROM posts JOIN users ON posts.author_id = users.id"
      );
      return result.rows;
    } catch (error) {
      console.error("Error fetching posts:", error.message);
      throw error;
    }
  },

  deletePost: async (id) => {
    try {
      await db.query("DELETE FROM posts WHERE id = $1", [id]);
    } catch (error) {
      console.error("Error deleting post:", error.message);
      throw error;
    }
  }
};
