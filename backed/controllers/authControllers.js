const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 检查用户是否已存在
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: '用户已存在' });
        }

        // 创建新用户
        user = new User({
            username,
            email,
            password
        });

        await user.save();

        // 生成JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ error: '注册失败' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 检查用户
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: '用户不存在' });
        }

        // 验证密码
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: '密码错误' });
        }

        // 生成JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: '登录失败' });
    }
};