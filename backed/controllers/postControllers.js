const Post = require('../models/Post');
const slugify = require('slugify');

exports.createPost = async (req, res) => {
    try {
        const { title, content, tags } = req.body;

        const post = new Post({
            title,
            content,
            slug: slugify(title, { lower: true }),
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            author: req.user._id
        });

        if (req.file) {
            post.coverImage = req.file.path;
        }

        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ error: '创建文章失败' });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'username')
            .sort('-createdAt');
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: '获取文章失败' });
    }
};

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug })
            .populate('author', 'username');

        if (!post) {
            return res.status(404).json({ error: '文章不存在' });
        }

        res.json(post);
    } catch (err) {
        res.status(500).json({ error: '获取文章失败' });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: '文章不存在' });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: '没有权限' });
        }

        const { title, content, tags } = req.body;

        post.title = title;
        post.content = content;
        post.slug = slugify(title, { lower: true });
        post.tags = tags ? tags.split(',').map(tag => tag.trim()) : [];

        if (req.file) {
            post.coverImage = req.file.path;
        }

        await post.save();
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: '更新文章失败' });
    }
};