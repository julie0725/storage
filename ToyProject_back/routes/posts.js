const express = require('express');
const bcrypt = require('bcryptjs');
const Post = require('../models/Post');

const router = express.Router();

// 게시글 등록
router.post('/', async (req, res) => {
    const { nickname, title, image, content, tags, location, moment, isPublic, password, groupId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newPost = new Post({ nickname, title, image, content, tags, location, moment, isPublic, password: hashedPassword, groupId });
    await newPost.save();
    res.status(201).json(newPost);
});

// 게시글 목록 조회
router.get('/', async (req, res) => {
    const { groupId } = req.query;
    const posts = await Post.find({ groupId });
    res.json(posts);
});

// 게시글 수정
router.put('/:postId', async (req, res) => {
    const { postId } = req.params;
    const { password, ...updateData } = req.body;

    const post = await Post.findById(postId);
    const isMatch = await bcrypt.compare(password, post.password);
    
    if (isMatch) {
        Object.assign(post, updateData);
        await post.save();
        res.json(post);
    } else {
        res.status(403).json({ message: '비밀번호가 일치하지 않습니다.' });
    }
});

// 게시글 삭제
router.delete('/:postId', async (req, res) => {
    const { postId } = req.params;
    const { password } = req.body;

    const post = await Post.findById(postId);
    const isMatch = await bcrypt.compare(password, post.password);
    
    if (isMatch) {
        await post.remove();
        res.status(204).send();
    } else {
        res.status(403).json({ message: '비밀번호가 일치하지 않습니다.' });
    }
});

// 게시글 상세 조회
router.get('/:postId', async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    res.json(post);
});

module.exports = router;
