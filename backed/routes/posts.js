const express = require('express');
const router = express.Router();
const {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost
} = require('../controllers/postController');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getPosts);
router.get('/:slug', getPost);
router.post('/', auth, upload.single('coverImage'), createPost);
router.put('/:id', auth, upload.single('coverImage'), updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;