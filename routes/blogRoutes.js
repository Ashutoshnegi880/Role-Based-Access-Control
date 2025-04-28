const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.post('/', authenticate, authorize(['admin']), blogController.createBlog);
router.get('/', authenticate, blogController.getBlogs);
router.delete('/:id', authenticate, authorize(['admin']), blogController.deleteBlog);

module.exports = router;
