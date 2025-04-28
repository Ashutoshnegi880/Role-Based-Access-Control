const db = require("../config/db");

module.exports = {
  /**
   * @description : Function to create Blogs and push them to the db
   * @param {String} title : Title of the Blog
   * @param {String} content : Content
   * @param {number} author_id : id of the user
   */
  createBlog: async (title, content, author_id) => {
    try {
      const result = await db.query(
        "INSERT INTO Blogs (title, content, author_id) VALUES ($1, $2, $3) RETURNING *",
        [title, content, author_id]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error creating Blog:", error.message);
      throw error;
    }
  },

  /**
   * @description : Function to fetch all the Blogs from the db
   */
  getBlogs: async () => {
    try {
      const result = await db.query(
        "SELECT blogs.*, users.name AS author FROM blogs JOIN users ON blogs.author_id = users.id"
      );
      return result.rows;
    } catch (error) {
      console.error("Error fetching Blogs:", error.message);
      throw error;
    }
  },

  /**
   * @description : Function to delete any Blog from the db
   * @param {number} id : Id of the Blog
   */
  deleteBlog: async (id) => {
    try {
      await db.query("DELETE FROM Blogs WHERE id = $1", [id]);
    } catch (error) {
      console.error("Error deleting Blog:", error.message);
      throw error;
    }
  }
};
