const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({
            _id: decoded.userId,
            'tokens.token': token
        });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: '请先登录' });
    }
};

const adminAuth = async (req, res, next) => {
    try {
        await auth(req, res, () => {
            if (req.user.role !== 'admin') {
                return res.status(403).json({ error: '需要管理员权限' });
            }
            next();
        });
    } catch (err) {
        res.status(401).json({ error: '认证失败' });
    }
};

module.exports = { auth, adminAuth };