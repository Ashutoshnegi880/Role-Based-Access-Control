const blogModel = require("../services/blogService");

module.exports = {
  /**
   * Description: Controller function for creating Blogs
   */
  createBlog: async (req, res) => {
    try {
      // Extract the Blog and user details
      const { title, content } = req.body;
      const author_id = req.user.id;
      // Save the Blog content in the db
      const Blog = await blogModel.createBlog(title, content, author_id);
      res.json(Blog);
    } catch (error) {
      console.error("Error creating Blog:", error.message);
      res.status(500).json({ error: "Failed to create Blog" });
    }
  },

  /**
   * Description: Controller function for fetching all the Blogs
   */
  getBlogs: async (req, res) => {
    try {
      const Blogs = await blogModel.getBlogs();
      res.json(Blogs);
    } catch (error) {
      console.error("Error fetching Blogs:", error.message);
      res.status(500).json({ error: "Failed to fetch Blogs" });
    }
  },

  /**
   * Description: Controller function for deleting any Blog based on its id
   */
  deleteBlog: async (req, res) => {
    try {
      const { id } = req.params;
      // Delete the Blog based on Blog id
      await blogModel.deleteBlog(id);
      res.json({ message: "Blog deleted" });
    } catch (error) {
      console.error("Error deleting Blog:", error.message);
      res.status(500).json({ error: "Failed to delete Blog" });
    }
  }
};
