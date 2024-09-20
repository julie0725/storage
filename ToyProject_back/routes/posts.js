const express = require('express');
const bcrypt = require('bcryptjs');
const Post = require('../models/Post');

const router = express.Router();
const mongoose = require('mongoose'); // mongoose 가져오기

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

// // 게시글 수정
// router.put('/:postId', async (req, res) => {
//     const { postId } = req.params;
//     const { password, ...updateData } = req.body;

//     const post = await Post.findById(postId);
//     const isMatch = await bcrypt.compare(password, post.password);
    
//     if (isMatch) {
//         Object.assign(post, updateData);
//         await post.save();
//         res.json(post);
//     } else {
//         res.status(403).json({ message: '비밀번호가 일치하지 않습니다.' });
//     }
// });

// 특정 게시글 수정
router.put('/:postId', async (req, res) => {
    const { postId } = req.params;
    const { nickname, title, content, postPassword, imageUrl, tags, location, moment, isPublic } = req.body;

    // 요청 본문 검증
    if (!nickname || !title || !content || !postPassword) {
        return res.status(400).json({ message: '잘못된 요청입니다' });
    }

    // postId 유효성 검사
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: '잘못된 요청입니다' });
    }

    try {
        // postId를 ObjectId로 변환
        const postObjectId = new mongoose.Types.ObjectId(postId);
        // 게시글 찾기
        const post = await Post.findById(postObjectId);
        if (!post) {
            return res.status(404).json({ message: '존재하지 않습니다' });
        }

        // 비밀번호 확인
        const isPasswordValid = await bcrypt.compare(postPassword, post.postPassword);
        if (!isPasswordValid) {
            return res.status(403).json({ message: '비밀번호가 틀렸습니다' });
        }

        // 게시글 정보 수정
        post.nickname = nickname;
        post.title = title;
        post.content = content;
        post.imageUrl = imageUrl;
        post.tags = tags;
        post.location = location;
        post.moment = moment;
        post.isPublic = isPublic;

        // 수정된 게시글 저장
        const updatedPost = await post.save();

        // 성공 응답 반환
        res.status(200).json({
            id: updatedPost._id,
            groupId: updatedPost.groupId, // 그룹 ID가 있는 경우
            nickname: updatedPost.nickname,
            title: updatedPost.title,
            content: updatedPost.content,
            imageUrl: updatedPost.imageUrl,
            tags: updatedPost.tags,
            location: updatedPost.location,
            moment: updatedPost.moment,
            isPublic: updatedPost.isPublic,
            likeCount: updatedPost.likeCount,
            commentCount: updatedPost.commentCount,
            createdAt: updatedPost.createdAt
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
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
