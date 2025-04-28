const blogModel = require("../services/blogService");

module.exports = {
  createPost: async (req, res) => {
    try {
      const { title, content } = req.body;
      const author_id = req.user.id;
      const post = await blogModel.createPost(title, content, author_id);
      res.json(post);
    } catch (error) {
      console.error("Error creating post:", error.message);
      res.status(500).json({ error: "Failed to create post" });
    }
  },

  getPosts: async (req, res) => {
    try {
      const posts = await blogModel.getPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  },

  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      await blogModel.deletePost(id);
      res.json({ message: "Post deleted" });
    } catch (error) {
      console.error("Error deleting post:", error.message);
      res.status(500).json({ error: "Failed to delete post" });
    }
  }
};
