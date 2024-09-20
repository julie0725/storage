const express = require('express');
const bcrypt = require('bcryptjs');
const Group = require('../models/Group');
const Post = require('../models/Post');

const router = express.Router();
const mongoose = require('mongoose'); // mongoose 가져오기

// 그룹 등록
router.post('/', async (req, res) => {
    const { name, imageUrl, introduction, isPublic, password } = req.body; // 필드명 수정

    // 요청 본문 검증
    if (!name || !password) {
        return res.status(400).json({ message: '잘못된 요청입니다' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // 비밀번호 해시화

        const newGroup = new Group({
            name,
            imageUrl, // 필드명 수정
            introduction, // 필드명 수정
            isPublic,
            password: hashedPassword
        });

        const savedGroup = await newGroup.save(); // 그룹 저장

        // 성공 응답 반환
        res.status(201).json({
            id: savedGroup._id,
            name: savedGroup.name,
            imageUrl: savedGroup.imageUrl,
            isPublic: savedGroup.isPublic,
            likeCount: savedGroup.likeCount,
            badges: savedGroup.badges,
            postCount: savedGroup.postCount,
            createdAt: savedGroup.createdAt,
            introduction: savedGroup.introduction
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 그룹 목록 조회
router.get('/', async (req, res) => {
    const groups = await Group.find();
    res.json(groups);
});


// 그룹 수정
router.put('/:groupId', async (req, res) => {
    const { groupId } = req.params;
    const { name, password, imageUrl, isPublic, introduction } = req.body;

    // 요청 본문 검증
    if (!name || !password) {
        return res.status(400).json({ message: '잘못된 요청입니다' });
    }

    try {
        // groupId를 ObjectId로 변환
        const groupObjectId = new mongoose.Types.ObjectId(groupId);

        // 그룹 찾기
        const group = await Group.findById(groupObjectId);
        if (!group) {
            return res.status(404).json({ message: '존재하지 않습니다' });
        }

        // 비밀번호 확인
        const isMatch = await bcrypt.compare(password, group.password);
        if (!isMatch) {
            return res.status(403).json({ message: '비밀번호가 틀렸습니다' });
        }

        // 그룹 정보 수정
        group.name = name;
        group.imageUrl = imageUrl;
        group.isPublic = isPublic;
        group.introduction = introduction;

        // 수정된 그룹 저장
        const updatedGroup = await group.save();

        // 성공 응답 반환
        res.status(200).json({
            id: updatedGroup._id,
            name: updatedGroup.name,
            imageUrl: updatedGroup.imageUrl,
            isPublic: updatedGroup.isPublic,
            likeCount: updatedGroup.likeCount,
            badges: updatedGroup.badges,
            postCount: updatedGroup.postCount,
            createdAt: updatedGroup.createdAt,
            introduction: updatedGroup.introduction
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 그룹 삭제
router.delete('/:groupId', async (req, res) => {
    const { groupId } = req.params;
    const { password } = req.body;

    // 요청 본문 검증
    if (!password) {
        return res.status(400).json({ message: '잘못된 요청입니다' });
    }

    try {
        // groupId를 ObjectId로 변환
        const groupObjectId = new mongoose.Types.ObjectId(groupId);

        // 그룹 찾기
        const group = await Group.findById(groupObjectId);
        if (!group) {
            return res.status(404).json({ message: '존재하지 않습니다' });
        }

        // 비밀번호 확인
        const isMatch = await bcrypt.compare(password, group.password);
        if (!isMatch) {
            return res.status(403).json({ message: '비밀번호가 틀렸습니다' });
        }

        // 그룹 삭제
        await Group.findByIdAndDelete(groupObjectId);

        // 성공 응답 반환
        res.status(200).json({ message: '그룹 삭제 성공' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 그룹 정보 조회
router.get('/:groupId', async (req, res) => {
    const { groupId } = req.params;

    // 그룹 ID가 숫자인지 확인
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
        return res.status(400).json({ message: '잘못된 요청입니다' });
    }

    try {
        // groupId를 ObjectId로 변환
        const groupObjectId = new mongoose.Types.ObjectId(groupId);

        // 그룹 찾기
        const group = await Group.findById(groupObjectId);
        if (!group) {
            return res.status(404).json({ message: '존재하지 않습니다' });
        }

        // 성공 응답 반환
        res.status(200).json({
            id: group._id,
            name: group.name,
            imageUrl: group.imageUrl,
            isPublic: group.isPublic,
            likeCount: group.likeCount,
            badges: group.badges,
            postCount: group.postCount,
            createdAt: group.createdAt,
            introduction: group.introduction
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 특정 그룹에 게시물 추가
router.post('/:groupId/posts', async (req, res) => {
    const { groupId } = req.params;
    const { nickname, title, content, postPassword, groupPassword, imageUrl, tags, location, moment, isPublic } = req.body;

    // 요청 본문 검증
    if (!nickname || !title || !content || !postPassword || !groupPassword) {
        return res.status(400).json({ message: '잘못된 요청입니다' });
    }

    // groupId 유효성 검사
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
        return res.status(400).json({ message: '잘못된 요청입니다' });
    }

    try {
        // 그룹 존재 여부 확인
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: '존재하지 않는 그룹입니다' });
        }

        // 그룹 비밀번호 확인
        const isGroupPasswordValid = await bcrypt.compare(groupPassword, group.password);
        if (!isGroupPasswordValid) {
            return res.status(403).json({ message: '그룹 비밀번호가 틀렸습니다' });
        }

        // 게시물 생성
        const newPost = new Post({
            groupId: groupId,
            nickname,
            title,
            content,
            postPassword, // 해시하지 않으려면 이 라인을 유지
            groupPassword, // 그룹 비밀번호는 필요 없으니 제거 가능
            imageUrl,
            tags,
            location,
            moment,
            isPublic,
            likeCount: 0, // 초기값 설정
            commentCount: 0 // 초기값 설정
        });

        const savedPost = await newPost.save();

        // 성공 응답 반환
        res.status(200).json({
            id: savedPost._id,
            groupId: savedPost.groupId,
            nickname: savedPost.nickname,
            title: savedPost.title,
            content: savedPost.content,
            imageUrl: savedPost.imageUrl,
            tags: savedPost.tags,
            location: savedPost.location,
            moment: savedPost.moment,
            isPublic: savedPost.isPublic,
            likeCount: savedPost.likeCount,
            commentCount: savedPost.commentCount,
            createdAt: savedPost.createdAt
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 특정 그룹의 게시물 조회
router.get('/:groupId/posts', async (req, res) => {
    const { groupId } = req.params;
    const { page = 1, pageSize = 10, sortBy = 'latest', keyword, isPublic } = req.query;

    // groupId 유효성 검사
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
        return res.status(400).json({ message: '잘못된 요청입니다' });
    }

    // 페이지 번호와 페이지 크기 검증
    const pageNumber = parseInt(page);
    const pageSizeNumber = parseInt(pageSize);

    if (isNaN(pageNumber) || isNaN(pageSizeNumber) || pageNumber < 1 || pageSizeNumber < 1) {
        return res.status(400).json({ message: '잘못된 요청입니다' });
    }

    try {
        // 그룹 존재 여부 확인
        const groupExists = await Group.findById(groupId);
        if (!groupExists) {
            return res.status(404).json({ message: '존재하지 않는 그룹입니다' });
        }

        // 게시물 필터링 조건
        const filter = { groupId: groupId };
        
        if (typeof isPublic !== 'undefined') {
            filter.isPublic = isPublic === 'true'; // Boolean으로 변환
        }
        
        if (keyword) {
            filter.title = { $regex: keyword, $options: 'i' }; // 대소문자 구분 없이 검색
        }

        // 정렬 기준 설정
        let sortOption;
        switch (sortBy) {
            case 'mostCommented':
                sortOption = { commentCount: -1 }; // 댓글 수로 정렬
                break;
            case 'mostLiked':
                sortOption = { likeCount: -1 }; // 좋아요 수로 정렬
                break;
            case 'latest':
            default:
                sortOption = { createdAt: -1 }; // 최신 순으로 정렬
                break;
        }

        // 게시물 조회
        const totalItemCount = await Post.countDocuments(filter);
        const totalPages = Math.ceil(totalItemCount / pageSizeNumber);
        
        const posts = await Post.find(filter)
            .sort(sortOption)
            .skip((pageNumber - 1) * pageSizeNumber)
            .limit(pageSizeNumber);

        // 성공 응답 반환
        res.status(200).json({
            currentPage: pageNumber,
            totalPages: totalPages,
            totalItemCount: totalItemCount,
            data: posts.map(post => ({
                id: post._id,
                nickname: post.nickname,
                title: post.title,
                imageUrl: post.imageUrl,
                tags: post.tags,
                location: post.location,
                moment: post.moment,
                isPublic: post.isPublic,
                likeCount: post.likeCount,
                commentCount: post.commentCount,
                createdAt: post.createdAt
            })),
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

module.exports = router;
