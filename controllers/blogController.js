const blogModel = require('../models/blogModel');

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  const author_id = req.user.id;
  const post = await blogModel.createPost(title, content, author_id);
  res.json(post);
};

exports.getPosts = async (req, res) => {
  const posts = await blogModel.getPosts();
  res.json(posts);
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  await blogModel.deletePost(id);
  res.json({ message: 'Post deleted' });
};
