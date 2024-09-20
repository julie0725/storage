const express = require('express');
const bcrypt = require('bcryptjs');
const Comment = require('../models/Comment');

const router = express.Router();

// 댓글 등록
router.post('/', async (req, res) => {
    const { nickname, content, password, postId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newComment = new Comment({ nickname, content, password: hashedPassword, postId });
    await newComment.save();
    res.status(201).json(newComment);
});

// 댓글 목록 조회
router.get('/:postId', async (req, res) => {
    const { postId } = req.params;
    const comments = await Comment.find({ postId });
    res.json(comments);
});

// 댓글 수정
router.put('/:commentId', async (req, res) => {
    const { commentId } = req.params;
    const { password, ...updateData } = req.body;

    const comment = await Comment.findById(commentId);
    const isMatch = await bcrypt.compare(password, comment.password);
    
    if (isMatch) {
        Object.assign(comment, updateData);
        await comment.save();
        res.json(comment);
    } else {
        res.status(403).json({ message: '비밀번호가 일치하지 않습니다.' });
    }
});

// 댓글 삭제
router.delete('/:commentId', async (req, res) => {
    const { commentId } = req.params;
    const { password } = req.body;

    const comment = await Comment.findById(commentId);
    const isMatch = await bcrypt.compare(password, comment.password);
    
    if (isMatch) {
        await comment.remove();
        res.status(204).send();
    } else {
        res.status(403).json({ message: '비밀번호가 일치하지 않습니다.' });
    }
});

module.exports = router;
