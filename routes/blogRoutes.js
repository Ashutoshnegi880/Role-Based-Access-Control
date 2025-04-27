const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.post('/', authenticate, authorize(['admin']), blogController.createPost);
router.get('/', authenticate, blogController.getPosts);
router.delete('/:id', authenticate, authorize(['admin']), blogController.deletePost);

module.exports = router;
