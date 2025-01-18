const express = require('express');
const router = express.Router();
const {
    createComment,
    getComments,
    deleteComment
} = require('../controllers/commentController');
const { auth } = require('../middleware/auth');

router.get('/:postId', getComments);
router.post('/', auth, createComment);
router.delete('/:id', auth, deleteComment);

module.exports = router;