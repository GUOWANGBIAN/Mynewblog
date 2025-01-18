const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.createComment = async (req, res) => {
    try {
        const { content, postId } = req.body;

        // 检查文章是否存在
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: '文章不存在' });
        }

        const comment = new Comment({
            content,
            post: postId,
            author: req.user._id
        });

        await comment.save();

        // 填充作者信息
        await comment.populate('author', 'username');

        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ error: '创建评论失败' });
    }
};

exports.getComments = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ post: postId })
            .populate('author', 'username')
            .sort('-createdAt');

        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: '获取评论失败' });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ error: '评论不存在' });
        }

        // 检查权限
        if (comment.author.toString() !== req.user._id.toString() &&
            req.user.role !== 'admin') {
            return res.status(403).json({ error: '没有权限' });
        }

        await comment.remove();
        res.json({ message: '评论已删除' });
    } catch (err) {
        res.status(500).json({ error: '删除评论失败' });
    }
};