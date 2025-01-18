require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// 导入路由
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

const app = express();

// 连接数据库
connectDB();

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// 错误处理
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: '服务器错误' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
});